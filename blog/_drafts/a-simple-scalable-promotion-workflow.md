---
title: A simple, scalable, code promotion workflow
---

# {{ page.title }}

One of the most basic elements of software development to get right for any company is how you get new code to end users quickly and efficiently without incident. Here, I'd like to propose what I would consider a fairly simple, yet scalable process that more or less any company could fit into their existing software development lifecycle if they're currently unable to do promotions.

I'm assuming 3 environments (Test, Stage, and Prod), all inside of the same AWS account with unique VPCs.

<!-- ![Starting off point](https://placehold.co/600x400) -->
<!-- {: .inline-image} -->

## The workflow
At a high level, we

1. Unit testing on commit
2. Build the image
3. Deployment to test on PR creation
4. Deployment to stage on PR approval
5. Deployment to production on merge to main

Each stage is automatically triggered, avoiding manual pipeline runs that can cause issues when developers inevitably typo a branch name or target the wrong environment by accident. There's also increasing levels of testing at each stage, ensuring we keep tight feedback loops while also preventing regressions and issues. We also use basic modern deployment techniques like canarying in production instead of relying on the default kubernetes deployment type to limit the number of users being affected by the change.

<!-- ![Git Workflow](https://placehold.co/600x400) -->
<!-- {: .inline-image} -->

## Stage 1: Basic Testing
Actually verifying the code we're deploying works and that we haven't introduced any new issues is a critical part of the software development lifecycle, but determining what to test and how much detail you want to cover is in itself a pretty complex topic. It will depend highly on the industry and application being developed - after all I want my banks software to be tested a little bit more rigorously than my TVs. Without going too in depth into the topic, I think the best reference I could give is to Martin Fowler's [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html).

![Test Pyramid](https://martinfowler.com/bliki/images/testPyramid/test-pyramid.png)
{: .inline-image}

The important thing here, is to ensure that we maintain fast feedback loops and are able to avoid repeating actions, particularly when those actions can be costly on engineers time. So, when the developer opens their PR into main, we first run the full suite of unit tests against their code. Unit tests aren't perfect but they're ideal for what we want here - confirmation of basic functionality before taking any kind of actions that could have flow on affects. Once the tests have passed, we automatically proceed onto the next stage, building the image.

## Stage 2: Building the image
This is one of the most critical components of the CI/CD process, but it's also one of the ones that I see most people trip over, because they're trying to optimise each individual build rather than considering the overall picture of what we're trying to achieve. It's critical that **build rarely** - ideally just the once, and deploy that image to as many different environments as you can.

So how do we do this? We need to make our images *environment agnostic* - basically we need to make our application images contain only application code, and anything that is environment specific (such as database endpoints, credentials, urls, etc) loaded dynamically. Here, we'll use a mixture of Kubernetes secrets and configmaps to store our environment variables in the cluster. This way, we can build the image once (when the developer commits their code), and refer to this image at each stage of the deployment rather than rebuilding it each time.

Next, we need to figure out how to load our environment variables into kubernetes. If we store the environment variables remotely in something like AWS Secrets Manager we can dynamically load this information into the manifest file at deployment using a templating engine like the ones in Puppet or Ansible. This way, our manifest file in source is consistent across all environments, and at deploy time it's generated before the kubectl apply is run.

<!-- ![Build logic](https://placehold.co/600x400) -->
<!-- {: .inline-image} -->

We also need to determine when we're going to trigger the build. Here, we trigger the image build only on PR creation and every subsequent commit to that PR. Even though we might rebuild the application more times than is strictly necessary (e.g. if the changes are just to the kubernetes template or some other metadata that isn't used in the application build process), but this is a worthwhile tradeoff in my opinion. It will also make our lives easier down the line when deploying this image, because we can always refer to the latest commit when deploying to environments, rather than maintaining some complex logic to choose which commit to deploy.

We then tag the image with the commit hash as well as the 'test' environment marker, indicating it's the most recent build of the repository and should be deployed in the test environment. It's important to note that you should make sure wherever you're storing your docker images, using multiple tags for the same image is allowed, otherwise this will overwrite the commit hash tag on the image.

```bash
#! /bin/bash
###
# EXAMPLE CODE
###

CURRENT_COMMIT=$(git rev-parse HEAD)

# Build the image and tag it with the current commit
docker build -t "${SERVICE_NAME}:${CURRENT_COMMIT}" .
docker tag "${SERVICE_NAME}:test" "${DOCKER_REPO_URL}/${SERVICE_NAME}:${CURRENT_COMMIT}"
docker push "${DOCKER_REPO_URL}/${SERVICE_NAME}:${CURRENT_COMMIT}"

# Also tag it with 'test' to indicate the service can be deployed to test.
docker tag "${SERVICE_NAME}:test" "${DOCKER_REPO_URL}/${SERVICE_NAME}:test"
docker push "${DOCKER_REPO_URL}/${SERVICE_NAME}:test"
```

## Stage 3: Deployment to Test Environment
Once the image has been built, the next step is to deploy the image into a lower tier environment. We can have the trigger to deploy to test based on part of the CI/CD workflow - for most teams this will be with the PR approval, or for teams running

Starting off with the test environment, we deploy the new code and begin running more complex integration tests against the code. This would be a great place to use environment reset scripts or test containers to ensure your test environment is always running with a specified set of variables, but depending on your team size and how complex your environment is, continually resetting the test environment might not work. In that instance, [test containers](https://testcontainers.com/) or a manual/custom implementation thereof is  great starting off point for creating things like just in time infrastructure or environments.

The basic structure should look something like this:

```bash
#! /bin/bash
###
# EXAMPLE CODE
###

cat <<EOF > manifest.tmpl
# Service Manifest
# ...

apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ service_name }}-config
namespace: {{ environment }}
data:
  database_url: {{ lookup('amazon.aws.aws_secret', env ~ '.database_url') }}

# ...
# Continue for other pieces of data or other kubernetes components like 'secret'
EOF

jinja2 manifest.tmpl > manifest.yaml
kubectl apply -f manifest.yaml
wait_until_service_deployed
test_results=$(run_tests)

if [[ ${test_results} -eq 0 ]]; then
    update_pr "success"
    cleanup old_deployment
else
    update_pr "failure"
    cleanup new_deployment
fi
```

## Stage 4: Deployment to Stage Environment
Once our deployment has successfully finished in our test environment, we can proceed to the next step, the Stage environment. While you can trigger this deployment on merge to main, with logic to deploy to production as soon as the stage deployment has finished, I think that's a slightly more mature approach. It's certainly what we should all be striving to do, but there's a lot of requirements that you have to meet to be able to do that, so I'm deliberately not doing so in this example. Instead we trigger the deployment to stage on PR approval, which allows us to have one last final lock on accidentally pushing to production if there are any issues.

The deployment to stage follows the exact same process as the test deployment, although here we should be deferring to a common environment rather than using the deploy time resources like test containers. This way we get an accurate representation of what the production release will look like.

Additionally, it's at this stage that we should be introducing more complex tests - here we'll want to introduce full end-to-end testing, simulating user activity and interactivity between the service and any dependencies.

<!-- ![Stage Testing](https://placehold.co/600x400) -->
<!-- {: .inline-image} -->

## Stage 5. Deployment to Production
Now that our stage deployment is done, when the code is merged to main we can proceed with our deployment to production. The primary difference between the stage and production deployment is that we're going to be [canarying](https://martinfowler.com/bliki/CanaryRelease.html) our deployment. All this entails is ensuring that we avoid sending all of the traffic to our new service at first, instead opting to only send a small percentage of users to this new version.

Given our application is Kubernetes based, there's a few different ways that we can do a canary release. While we could rely on the inbuilt `deployment` type to do this for us, instead we can write this code ourselves, which will allow us to use external monitoring tools (such as NewRelic or DataDog) to monitor application health, not just internal metrics exposed to kubernetes.

So, we'll ensure our kubernetes deployment creates a new load balancer so that we have a target for our DNS, and we can slowly transition the number of pods between each version via the deployment pipeline. This also allows us to immediately rollback when issues start to arise - rather than waiting for an event listener to determine the issue and trigger a rollback.

<!-- ![Production Deployment](https://placehold.co/600x400) -->
<!-- {: .inline-image} -->
