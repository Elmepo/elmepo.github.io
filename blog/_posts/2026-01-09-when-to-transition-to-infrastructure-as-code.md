---
title: What's important to think about before transitioning to Infrastructure as Code
---
# {{ page.title }}
Infrastructure as Code (or IAC) is the backbone of modern
infrastructure - the ability to have fully versioned and tracked
definitions of your infrastructure is a quiet driver of a lot of
efficient teams. But it’s not for everyone, and it’s important to
understand when IAC will speed up your team's workflow, and when it will
completely put a stop to any progress your team is making.

It’s important to note here, that “Infrastructure as Code” is not just a
single approach. Tools like Terraform are useful, yes, but they are not
the entire conversation. So, a working definition is useful. For the
purposes of this post, we’ll consider Infrastructure as Code to be any
Systematic, Programmatic, approach to controlling your infrastructure
where the explicit goal is to avoid and minimise any manual/personal
interaction with your infrastructure. Thus, teams with a random
assortment of “deployment scripts” aren’t considered as using
Infrastructure as Code, but teams with complex internal tooling and
business logic for their infrastructure but no yaml files can be
considered as using Infrastructure as Code.

Then, what should you be thinking about when weighing the pros and cons
of transitioning from that loose “deployment script” approach to
something more formalised? To be honest, in a word it could be well
summed up as “Risk”.

Consider the most obvious point - the cost to maintain your current
infrastructure. For some teams, Infrastructure may be only a small part
of their work. Perhaps your entire product is a binary file that clients
download and install themselves. In that case your entire infrastructure
footprint is likely incredibly small, and any contextual information
easily stored in a shared document somewhere. Maybe one day a critical
engineer will leave suddenly and you’ll be unable to publish important
patches, and you’ll wish you had a way to do so at the push of a button.
But is it worth the cost to set up and maintain a codebase, even a small
one, for that one day? Possibly - I’m sure those situations exist. But
it’s something worth considering. Sometimes we need to accept the risk,
freeing up resources today, and deal with the pain another day.

Consider as well what your next 3 to 6 months look like. For a company
or team that is growing and already planning to hire a “devops”, Site
Reliability, or Platform Engineer, it may be best for them to have as
clean a slate as possible to start with. If you start the transition to
IAC now, the new engineer/team may feel they need to continue in the
same direction. Maybe they’re even right - the perfect is the enemy of
the good after all, and why rewrite several Terraform modules as Pulumi
libraries if they’re already working? It doesn’t matter if Pulumi would
have better suited your needs, and Terraform was only chosen because one
of the devs “had some experience with it”, it would be a difficult pitch
for most people to suggest, let alone somebody just joining a company or
team.

Perhaps you’re instead facing the opposite situation, with a team of
Systems Administrators who have no formal or informal knowledge of
programming. Perhaps your team has written some shell scripts but rarely
anything more complicated than a sequential list of install steps. How
will they fare when their primary or sole interface with the
infrastructure, the thing they previously spent all of their time
touching, is suddenly abstractions? To a team used to logging in to a
server to see its current configuration, how will they react instead to
describing how they want the server to be and then having the server
conform itself to their definition? When changes need to be more
standardised because whereas before it didn’t matter if John preferred
to perform an update with sed and Sally preferred to use awk - they now
need to come to a common ground.

Often, something that a lot of teams can overlook as well is the
complexity involved in actually translating their existing
infrastructure into Infrastructure as Code. While it may be easy for
some teams, for most it’s closer to the level of complexity involved in
rewriting an application in an entirely different language. Some
techniques are virtually impossible with IAC and instead require a
different approach. It might not be immediately clear exactly how a
server connects to the broader environment or what specific programs
need to be installed, and so when attempting to implement them via IAC
you may find yourself running into unexpected issues in production if
you’re not incredibly careful with your testing. After all, how many
teams can actually say they have 100 percent test coverage (and how many
are correct in that estimate)? I once saw a bug almost make it to
production because the library used to generate a PDF file was slightly
different between an old and new server.

There are ways to mitigate this problem - you can target specific,
isolated pieces of infrastructure and begin migrating them, ones that
you can reliably test and compare between old and new implementations.
You can segregate your infrastructure, requiring that all new
infrastructure is done via IAC and accepting a level of risk in older
infrastructure. You can target horizontal or logical levels of your
infrastructure, applying IAC to only the Firewalls, or to the physical
purchasing of new machines in a “preproduction” buffer for scaling
opportunities. However none of these methods are perfect - leading to
complexity risk that needs to be managed. After all, how are you going
to make sure that all of your firewall rules are correctly applied on
servers that aren’t managed via code? How do you ensure that you don’t
wind up in a situation where a single server with no IAC is both highly
unreliable and a critical piece of your infrastructure?

Finally, time must be taken to consider the difference that
transitioning to Infrastructure as Code will make to your development
workflow and speed. During the transition, you’ll likely experience a
significant slowdown in any infrastructure changes, and you’ll likely
see an increase in overall error rates in making changes as engineers
both introduce new bugs and issues before resolving them, as well as
deal with the natural split brain that comes from having to maintain
both approaches in infrastructure, potentially directly impacting each
other.

The move to IAC will also change how you make infrastructure changes and
what that process looks like. While you may be able to currently iterate
at lightning speed with manual changes, IAC will result in a slower
development speed but with changes that are less error prone, more long
lasting, and likely more generally better infrastructure. Instead of
copying and pasting a shell command to 20 different servers, you will
instead need to update and test a new version of your infrastructure
definition and deploy that across to your entire environment. Depending
on how specifically you approach versioning and releases, particularly
when it comes to your infrastructure, this may be a long and onerous
task involving multiple steps and approvals.

I don’t seek to discourage you from transitioning to Infrastructure as
Code. Truly, I believe that perhaps with the exception of the concept of
CI/CD, the adoption and proliferation of Infrastructure as Code is the
single most impactful change that has happened in our industry in the
past decade. This change is not a small one however, and it’s one that
is often overlooked in my experience particularly because offerings like
Terraform provide an entry point that can make it appear relatively easy
and straight forward, and some of these issues may only appear while
teams are half way through a migration. Issues that could be avoided, or
at least mitigated, had they been considered earlier in the transition.
