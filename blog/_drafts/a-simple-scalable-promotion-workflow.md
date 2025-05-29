---
title: A simple, scalable, code promotion workflow
---

# {{ page.title }}

One of the most basic elements of software development to get right for any company is how you get new code to end users quickly and efficiently without incident. Here, I'd like to propose what I would consider a fairly simple, yet scalable process that more or less any company could fit into their existing software development lifecycle if they're currently unable to do promotions. I'll also include some notes at the end about where you could look to improve on this to fit your specific use cases.

For the purposes of this post, I'll be using AWS but using vendor agnostic terms or services where ever possible. The application itself will be a fairly simple one that should cover all of the important bases, consisting of a Kubernetes application, a Database including a primary and a read replica, a frontend CDN, with a CICD runner inside the AWS account to simplify some networking/security concerns.

We'll also assume that we have 3 environments (Test, Stage, and Prod), all inside of the same AWS account with unique VPCs.

![Starting off point](https://placehold.co/600x400)
{: .inline-image}

## When to build the application image
This is one of the most critical components of the CI/CD process, but it's also one of the ones that I see most people trip over, because they're trying to optimise each individual build rather than considering the overall picture of what we're trying to achieve. It's critical that **build rarely** - ideally just the once, and deploy that image to as many different environments as you can.

So how do we do this? The first thing we need to tackle is making our images *environment agnostic* - basically we need to make our application images contain only application code, and anything that is environment specific (such as database endpoints, credentials, urls, etc) loaded dynamically. Here, we'll use a mixture of Kubernetes secrets and configmaps to store our environment variables in the cluster. This way, we can build the image once (when the developer commits their code), and refer to this image at each stage of the deployment rather than rebuilding it each time.

This image is then tagged with the originating commit (to allow tracing back from the image to the code and any relevant changes). Later on, we'll use this commit information in our deployment logic to find the image.

Next, we need to figure out how to load our environment variables into kubernetes. If we store the environment variables remotely in something like AWS Secrets Manager we can dynamically load this information into the manifest file at deployment using a templating engine like the ones in Puppet or Ansible. This way, our manifest file in source is consistent across all environments, and at deploy time it's generated before the kubectl apply is run.

![Build logic](https://placehold.co/600x400)
{: .inline-image}

## Testing
Actually verifying the code we're deploying works and that we haven't introduced any new issues is a critical part of the software development lifecycle, but determining what to test and how much detail you want to cover is in itself a pretty complex topic. It will depend highly on the industry and application being developed - after all I want my banks software to be tested a little bit more rigorously than my TVs. Without going too in depth into the topic, I think the best reference I could give is to Martin Fowler's [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html).

The important thing here, is to ensure that the application is tested both at build time, and after each deployment.

First, at build time, we run a basic suite of unit tests and integration tests that we can confidently run with mocked applications using something like test containers.

## Deploying

## Promoting
