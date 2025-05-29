---
title: An empirical analysis of modern software development
---
# {{ page.title }}

Some time ago, I had a kind of come to jesus meeting with the other leads at work. I saw a massive difference between how we were working and what the data suggested for other companies. This blog post is based on the data and that discussion.

## A brief note on why this is important

Before we get into things, I think it's important to note *why* this is important. From my experience, one of the hardest things for non-technical people to understand is just how important it is to the average developer to have a good development experience. It's a hard thing to quantify - after all developers will gripe until the cows come home about how terrible the old code is or how this language is better than that language. I can see I someone without professional development experience could start to think that developers just like to complain, and dismiss them when they start to complain about how the development experience isn't "modern", particularly given "modern" is such a vague term.

But taking the right approach to software development is incredibly important in today's modern business environment. If you're not moving as fast as your competitors you're almost guaranteed to lose, and even if you manage to stay ahead of the curve with incredibly smart product decisions, you'll still inevitably fall behind as your good developers opt to leave for better environments, which creates a dangerous brain drain feedback loop.

In terms of numbers, 51% of developers quoted technical debt as why they're leaving, with 20% stating it as the primary reason. 67% of developers have either quit or know someone who quit from pressure to avoid failed deployments or rollbacks. These numbers should scare anyone who currently have a large cohort of developers raising these issues, because if they're not rectified it only causes one bad issue for developers to start listening to the recruiters in their inbox.

## Release frequency is tied to release risk

- Empirical evidence shows that faster deployment cycles have lower risk
- Smaller changes allow for more iterative building
- Feature flags are the standard for high performance teams, allow instantaneous rollback
- Dark releases/Canary releases allow for significant risk reduction
- 56% of developers would feel more confident using smaller, more frequent deployments

## Testing is a key part of success

- Tests run as part of CI/CD pipelines, not as part of a separate process/run by a separate team
- 75% of organisations are able to run their full test suite within 60 minutes
- Controllability of tests is the main problem most teams appear to be facing
- 75% of developers stated that being unable to identify the root cause of an issue as negatively impacting their workflow
- "The ideal feedback loop has (the following properties): It's fast, It's reliable, (and) it isolates failures"

## Developer Oncall is now the norm
- Skin in the game
- "Ops runs it" cannot achieve weekly or daily deployments
- "Giving developers operations responsibilities has greatly enhanced the quality of services"
- "You build it, you run it"
- Both from Amazon CTO in 2006

## Deployment Speed is critical
- Slow deployment speed was listed as the 5th highest factor contributing to burnout
- 85% of developers release new code several times per month, with 55% releasing several times per week or more.
- From the DIB "Detecting Agile BS doc": "Agile programming teams followed by linear, bureaucratic deployment is a failure"

## Focus on the developer
- 91% of developers reported positive job satisfaction when leadership placed an emphasis on improving developer outcomes
- 44% of developers say they spend too much time in informal meetings
- 40% of developers said their ideal workweek included deployments
- 46% of developers spent more than 5 hours per week in meetings
- 5 hours appears to be the happy mean for meetings
