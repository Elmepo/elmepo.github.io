---
title: When you need Kubernetes
---
# {{ page.title }}
(And when you don’t)
{: style="text-align: center;"}

Kubernetes is a truly impressive piece of technology. Born in the fires
of Google, it solves the kind of problem that really only companies like
Google encounter. For smaller companies, however, Kubernetes effectively
becomes a trap - a complex beast with many different landmines eager to
create chaos when triggered, chaos that may be difficult to wind back.
So then why do so many people fall into the trap? Often, it feels like a
mixture of people making certain assumptions about their own migration,
and failing to understand the underlying differences between their own
environment and culture and those that excel with Kubernetes.

Kubernetes is a completely different environment than your traditional
VM based environment or even cloud container environments like ECS or
Lambda. Failing to understand the assumptions that many other people
make when deciding to migrate to kubernetes could very easily lead you
into traps that are difficult to escape from or that could cause serious
harm. Consider, for example, how a team might fare if they currently
assume that they can log in to a server to manually make changes if a
release goes wrong. Acceptable in a VM based environment, but much more
difficult in kubernetes where containers are far more ephemeral and
changes you make can quickly be gone and replaced with their original
(buggy) versions without you ever noticing.

Seeing kubernetes succeed or fail in other environments doesn’t tell you
how it will impact your own environment. These assumptions are usually
where teams get this wrong.

## Assumption 1: Kubernetes makes deployments easier

A common refrain I hear from people who are discussing moving to
kubernetes, is the belief that it will somehow magically make their
deployments “easier”. Often, it’s the opposite. Deployments without
kubernetes tend to be simple: Update the code for a cloud function in
AWS Lambda, or deploying the image to your physical servers/container
service. Your engineers are able to easily understand the immediate
aftereffects, and reverse them.

Kubernetes makes this entire process more complex with the addition of
multitudes of variables that, yes, can make deployments easier. Those
same variables can also make deployments much more dangerous. Take, for
example, `imagePullPolicy`. This variable is used to control whether or
not to pull the container image before starting it. Generally speaking,
most guides and LLM outputs will default to `imagePullPolicy:
IfNotPresent`. It’s a good option for most production workloads. It will
also wreak chaos on your deployments if you’re deploying with the latest
tag rather than a versioned one. Because it only checks to see if there
is a container with the current tag. A likely scenario exists in which
your deployment reports successful, but only half of your production
containers are using the correct version of your app.

The complexity is, in fact, the positive of Kubernetes. Larger
environments require more complex deployments that allow for the nuances
that reflect the competing priorities and realities each team has. If
all of your teams have (more or less) the same environment, the same
requirements, the same deployment logic? Kubernetes adds overhead that
has to be managed that’s probably not giving you a reasonable return.

## Assumption 2: Kubernetes is needed as you scale

Almost on the entirely opposite side of the equation, many companies
shift to kubernetes as they scale. They start hitting massive volumes of
traffic and experiencing scaling issues. Maybe traffic isn’t entirely
predictable, with large jumps or drops without much rhyme or reason in
the moment. Kubernetes seems like an easy answer - individual components
can scale to meet customer needs almost instantaneously assuming your
containers have been written reasonably well.

But does this *really* match what you’re experiencing? If you’re running
on virtual machines like EC2, perhaps you’re better off simply
purchasing for peak traffic. It’s more expensive, but unlikely to
bankrupt you while reducing the overall complexity of your environment.
If you’re running on top of a containerised service like ECS or Lambda,
scaling is already taken care of. Maybe you’re coming close to hitting
things like Lambda’s reserved concurrency limit, in which case, fair!
Maybe you do need to start making the tradeoffs kubernetes offers.

But more often than not, people believe kubernetes is required for
*technical scale*, which likely doesn’t apply to their use case as
closely as they believe. Kubernetes can help with scaling issues, both
technically and business wise as teams grow and splinter from common
frameworks/languages/approaches. But it isn’t the only way to achieve
that goal.

## Assumption 3: Kubernetes is required for Microservices

Possibly the most common refrain on this topic I hear is “We’re moving
to kubernetes because we’re moving to microservices”. I understand why -
the two are often treated as one and the same, or at the very least one
a requirement for the other. But just because an application runs on
kubernetes, or has been bundled into a container, does not make it a
microservice.

I’ve seen truly impressive workloads running in kubernetes, both
positively and negatively. I once saw a setup that involved loading an
entire AI model into a container’s memory on startup. The process took
so long that startup took at least half an hour before the pod was ready
and required node affinity that meant we were effectively running single
pod nodes across the entire cluster. We were told that it still counted
as a “microservice”. Anyone who’s worked in the industry for long enough
has seen a similar story.

This is important to understand because microservices are often
misunderstood because so many people have incorrectly implemented them,
and make assumptions on that experience. If microservices are the
approach that’s right for your business, understand that kubernetes
isn’t a requirement, at the very least not in the early stages. You can
easily run microservices inside of a managed container environment like
ECS, which leaves the door open to an eventual migration to kubernetes
if that is the best approach. Maybe you don’t even need a containerised
environment - even to this day netflix runs many of it’s microservices
on top of ec2. Microservices are incredibly complex and difficult to get
right. I personally believe that if you’re going to make the transition
from a monolithic architecture to a microservices based architecture,
any transition to kubernetes should be the last step.

Instead, you should focus on factoring your applications correctly to
better split up the codebase, and writing production ready containers
that can be run in a cloud container service first, after which you can
determine if kubernetes meets your needs.

Look, I get it. Kubernetes is perpetually a popular topic in tech talks
and at conferences. It’s got a great community and lots of support for
people whether you’re looking to write your first deployment or you’re
an experienced developer looking to write custom controllers. It’s what
people are led to believe powers “big tech” and that’s an easy sell to
management if you believe that it might help resolve your problems.
Maybe it will. But it’s important to understand the implicit beliefs
that aren’t being said in those talks, and to understand the tradeoffs
that you’re making when you transition to kubernetes.
