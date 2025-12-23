---
title: Why Oncall Rotations Break
---
# {{ page.title }}
{: #blog-header}

Oncall is on the few guarantees in life as a modern software engineer working on anything that’s expected to be constantly available. Whether you’re working on critical financial infrastructure, or a simple habit tracking app, most software engineers at high performing companies are expected to find some way to make sure that someone is always available in case things truly go south.

In all my years working on cloud infrastructure, I’ve seen a few different approaches to oncall. Some good, many bad, and most falling somewhere in between. Recently I was even responsible for running a schedule myself, and while it wasn’t perfect, it was good enough. So I wanted to take some time to write a little bit about specifically what went right and what went wrong with that oncall schedule.

We were a team of 4 engineers, so the best rotation was a standard 24/7 approach. Once a month, one engineer would become the oncall engineer, responsible for responding to any incidents and alerts, as well as performing any required maintenance work. Additionally, we also decided that the oncall engineer would be responsible for fielding any external requests. In this way, the other team members would be free to focus on their longer term projects while the oncall engineer took care of any pressing issues, questions, and concerns. We believed that this would present a clear point of contact for the rest of the company, an easy way to know who to talk to when issues appeared.

This was important because informal availability scales until it doesn’t. When an entire team is away on a public holiday, you find yourself having to very quickly determine relative risk levels of allowing issues to grow for another day or longer, while trying to find the one engineer that’s willing to leave their families for potentially hours while resolving the issue before it spirals out of control.

## So, what went right, and what went wrong?

Thankfully, a lot went right - the overall workload was often manageable, and on the rare occasion when it became too much, the team was aware of how to escalate issues and how to get the help they needed (whether that was developers to help debug a memory leak or merely an extra pair of hands to handle the alerts). The rotation was fair, and consecutive weeks oncall was incredibly rare, only happening when engineers were shifting around schedules to fit in holidays or important life events.

### Things break when incentives disagree

One of the earliest things that went wrong was the process for external teams getting attention from the oncall engineer. This was something that was persistently a thorn in our side, and one that we could have done better to set ourselves up for success. Initially devops engineers worked as part of vertical scrum teams, which led to competing incentives between oncall and vertical work. Worse still, this could sometimes lead to conflict between entirely different teams as they began to believe that each other were unfairly using what they saw as “their” resource. We resolved this  by removing the devops engineers from the verticals entirely, becoming its own separate platform team, serving all aspects of the business equally. This also had the added benefit of meaning that we were able to spend more time on requests that didn’t come in through verticals (such as from non-development teams).

### Process will lose to convenience if you’re not careful

The official way to request assistance from the oncall devops engineer was to create a ticket, but  developers would often reach out directly  to team members they had personal relationships with first to get work done, and those engineers would often try to fit the request into their own schedule. Inevitably, this became the fastest way to resolve some issues, because these people were, after all, friends. And once a developer knew they could use this backdoor, they would continue to do so. After all, they had their own objectives and were merely trying to close them out as quickly as they could. Why should they care if it caused friction in another team?

Resolving this requires understanding what specifically was leading to people to use the shortcut over the official process. In the end, we determined that it was a mixture of not always knowing who specifically was oncall, having trouble seeing the progress of the queue, and often being unaware of the process because they so rarely used it. By targeting the root cause of each issue, we were able to put a stop to the behaviour.

### Scope and expectations need to be as crystal clear

Another stepping stone was clarity of scope and expectations. What specifically should you respond to and what don’t you? It seems easy enough but you very quickly learn the nuances to what people consider important issues. We all know a database going offline is bad. But what about rising CPU usage or a full disk? What about when the preproduction environment becomes fully unusable on a public holiday that only affects your team, but not the developers in a different country, who are now blocked from most forms of their work?

Personally, I found that these issues were resolved best on a case by case basis, while also building up a strong historical precedent that the team can rely upon to determine what is and isn’t something to worry about. It’s important that these are documented and communicated, however, so that teams everywhere can also understand what they can expect in terms of coverage and reliability.

### Oncall burnout is caused by more than just volume

Oncall can very quickly increase stress and burnout, but it’s important to remember that the sources of burnout aren’t just the sheer volume of alerts. It also comes from things like not knowing if an alert is important or not. This is critical to manage because as engineers receive more and more alerts, a mental map is formed of what needs to be investigated and what can be ignored. This becomes very dangerous if something that was previously not an important alarm (such as CPU usage in a datacentre that’s still being deployed) becomes an actually important alarm (like when that datacentre starts receiving production traffic).

It’s crucial that alerts are more often than not “important messages” rather than a stream of notifications. Finding this line is complex and worthy of an entire book in itself, but in my experience it’s relatively easy to identify the alerts you know aren’t important enough in unto themselves to justify waking up someone for. That gets you enough of the way towards avoiding painful issues with burnout and stress. You’ll probably never reach a peak ideal of alert quality and frequency, but merely trending in the right direction is usually good enough.

No oncall rotation is perfect and there will always be issues to resolve with the process. Each oncall system is unique to the team and environment that it exists in. Maybe you only need coverage from 9-5 because there’s no after hours traffic, or maybe you need somebody actively watching a dashboard due to high SLA expectations. But from my experience there does exist a common set of problems that are guaranteed to cause issues if not prepared for, that aren’t immediately obvious when first setting out, but that can be discovered with careful forethought and planning. Understanding your constraints and needs, and what works well in those limitations, is key to having a positive oncall experience rather than a negative one.
