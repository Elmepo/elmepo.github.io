---
title: Developer Experience as a Primary Concern
---
# {{ page.title }}
{: #blog-header }

Something that has been top of my mind lately, is that it feels like
many companies are completely ignoring probably the single biggest
contributor to the performance of engineering teams and departments -
Developer Experience. To me, as a seasoned engineer, the actual
experience of working on a project or codebase is more often than not
indicative of how successful the venture will be.

This isn’t to advocate for migrating from specific languages or
frameworks (big surprise, developers hate PHP and Raw JavaScript).
Rather it’s to advocate for taking a less controlling, dictatorial, and
imposing approach and instead a more empathetic, freeform, and ground up
approach to the work that your engineering teams are doing.

Broadly speaking, developers tend to be quite simple people when it
comes to personal preference and how they’d like to work. While the
specifics might change, virtually every developer agrees on a few
things:

1.  The freedom to choose their own tools
2.  A straightforward deployment process that involves little risk or fear
3.  An easy way to quickly build and test the changes that they’ve made

# The freedom to choose their tools

Often, I see developers discussing how their work is forcing IDEs upon
them under the name of “efficiency”. Today it’s because those IDEs have
integrated AI features, but I’ve seen any number of other reasons why
the most basic tool that a developer will ever use should be chosen by
someone else (apropos of security concerns). Sometimes it’s the belief
that by sharing the same environment and shortcuts your developers will
have a faster onboarding process, sometimes it stems from a misguided
belief that because many developers enjoy the IDE then it’s just easier
to upset some developers who don’t care at best and actively dislike it
at worst.

As a developer, my IDE is the way that I see, experience, and understand
the codebase. Documentation dies fast enough at virtually every company,
and I only touch Github to view PRs. So mine and other developer’s
experience is inextricably tied to the IDE that we’re using, and that
experience **isn’t** linked to the experiences of every other developer.
And yet, it seems as though there is a prevailing thought that actually
this IDE will be different and actually universally popular. It just
makes no sense to me.

# A straightforward deployment process

After enough time in the industry, every developer has had a deployment
go south. Maybe it was a rushed fix that wound up making the issue
worse. A change that was supposed to be simple, or a new feature that
everyone knew beforehand was going to crash and burn almost immediately.
As certain as the rising tide, it’s only a matter of time. The goal
isn’t to never see these incidents ever again but merely to delay them -
to keep them few and far between.

A smoother deployment means a happier developer, and this is only
achieved by focusing almost solely on thinking about how to avoid any
interactions by the developer with the deployment process. After all,
the more times somebody touches something or is required to interact
with the code or deployment in any way, the more chances for something
to go wrong. It’s tempting to think that by requiring more input (like
separate pipelines that must be triggered by two different people or
teams) or “control” in the process (like peer approvals), is something
that paradoxically increases risk, at the cost of making the individual
developers experience somewhat to significantly worse.

Developers find themselves in the position of having to find someone,
potentially outside of their business hours, to assist in the release.
At best this is merely boring but at worst they find themselves needing
to quickly roll back a change or deploy a bug fix while also trying to
figure out who they need to talk to that will allow them to do so.

This is a mutually beneficial decision as well, the business is able to
more accurately forecast new features and fixes from these smoother
releases. However often it can feel like there’s a fear from all levels
that problems that arise from a release are of bigger importance than
the overall rate of new features being released. Now, I’m not going to
claim that we should completely ignore any errors, or push forward with
releases that we aren’t confident in without some kind of reasoning
behind why releases should still be pushed forwards. What I am saying,
is that the weight placed on fear is so much higher than it should be.
In a modern software environment, we can safely and easily roll back
most changes incredibly quickly - if you don’t have feature flags, you
can quickly redeploy your older build, and if you somehow don’t have
stored build versions or feature flags, then you can simply revert the
commit and rerun your deployment pipeline to at least provide some
semblance of normality to your environment.

# An easy way to quickly build and test the changes that they’ve made

This is something that’s often quite overlooked, even by developers
themselves in my experience. Ensuring a fast, easy build process is
available to developers is one of the most impactful things that you can
do. Simply put, by making it easier to make smaller changes and have
those changes quickly verified, developers will, unsurprisingly, make
smaller changes and test those changes.

This directly results in changes that can be deployed to production
faster, with smaller impact (and therefore smaller incidents). It means
that developers can more easily reason with the changes that they’re
making, and make better decisions, including making better design
choices.

Faster local builds mean developers don’t feel the need to run to the
coffee machine or fridge with every change. It also means that they
don’t feel the need to write larger changes (“because it’s going to take
30 minutes to build anyway”). Longer build durations will directly
incentivise developers to actively split their focus, because they feel
bad waiting for a build to finish and reason that they can focus instead
on a bugfix in a separate repo for the 15 minutes. But by the time the
build is finished, even if they immediately return to the codebase to
test, they’ve completely wiped the context they had originally built up,
replacing it with the necessary context for the bugfix. This may
directly lead to them missing issues with their change.

This also applies to the testing cycle, remotely but particularly
locally. I’m always sceptical of companies that put an oversized weight
on manual testing. It’s a process that’s particularly fraught with the
potential for mistakes. Scripts aren’t always perfect, but at least when
they fail you can reliably expect them to fail in replicable ways that
can be isolated and fixed. And yet so many teams expect their developers
to test changes themselves manually instead of by providing well thought
out and engineered tests, whether that’s unit tests, regression tests,
or end to end synthetic tests.

These manual processes will, inevitably, fail. The developer will be
unaware of certain variables that could cause unexpected behaviour and
fail to account for this. Or perhaps they’ll simply be lazy and only do
some of the tests. Or perhaps the tests will be unable to be performed
locally entirely, and they’ll accidentally run a command on production.
It’s just bound to happen.

So then how do you protect against this? By making life easier for the
developers! By giving them a testing framework that is both easy to run
and easy to update with their new changes. Just like with builds, this
means that developers are incentivised to frequently test their changes,
and to frequently ensure that their changes are covered by tests.

Instead, I often see or hear of testing and development being treated as
something separate. It seems like some companies feel like developers
cannot be trusted to verify their own changes. That someone else should
be responsible for making sure that the developer has done their job
correctly. I just don’t see it. The way I see things, the increased
distance between the code the checking will result in more errors than
less. And you will find longer cycle times too as developers wait for
their changes to be tested, or for bug reports to be inaccurate or
missing details. Maybe the report is correct but the developer and the
tester just use different terminology - it’s a simple miscommunication
but one that would be avoided with the developer being the sole person
in the loop.

Ultimately, it seems like the companies that bias the most towards
developer happiness, names that everyone knows of and respects like
Google, Facebook, and Netflix, are also the companies that have the best
code and the most impressive technology. While some of this is likely
self-fulfilling (the best developers will naturally want to work at
places they are happiest), I think that not enough weight is placed on
the idea that focusing on developer happiness makes better developers.
It elevates developers to their true potential.
