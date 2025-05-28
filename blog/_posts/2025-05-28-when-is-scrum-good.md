---
title: So when is scrum good?
---
# {{ page.title }}

Never let it be said that I'm ideological. [Look, I don't like Scrum]({{ '/blog/you-dont-need-scrum' | relative_url }}) - I think it's largely an artefact of a time from before I was even born. But I also think it was a required step in the journey from where software started off, with rigidly defined steps and roles, to a brighter future. It's certainly not the worst possible way to organise software delivery teams and has it's benefits. We have to understand these benefits, because otherwise we risk recreating scrum in the aggregate, with none of the benefits and all of it's flaws because we collectively fail to grasp why scrum works and why it fails.

## 1. Scrum lifts up bad developers.
If you work in the software industry long enough, you'll eventually meet some truly bad developers. Sometimes they're simply junior developers. People still learning the ropes and with either no prior context or who've never been taught how to do things and why. Other times, they're people who make you wonder how they snuck past the interview process and how they're allowed to stay.

Developers who spend months working on a feature without even checking to see if it fixes the problem they're trying to solve. Developers who continually run into the same issues, or who refuse to take any ownership of their code once it's been committed. Hell I once worked with someone who wrote tests for their code, but then updated the deployment logic to just ignore any test failures.

Scrums approach, focusing on short to medium length feedback loops consisting of: Deciding what you want to achieve over the next x days, Trying to do that, Thinking about what went wrong and what went right - **will** take any particularly bad developer and forcefully pull them up to a relatively low baseline standard.

## 2. Scrum protects development teams from stakeholders
Along the same lines, scrum protects development teams from undue outside influence. It makes it more difficult for product or sales people to try and force a team to drop what they're doing and focus on their request. It makes those same people an active participant in the development process, asking them to review the work that's going on and avoid painful mistakes where a team spends months on a feature only to discover at the last minute it's the complete opposite of what was requested.

In the best case scenarios, teams are able to use the sprint based nature of scrum to spend time proactively paying technical debt and incorporate more robust technical requirements into their development cycle to avoid increasing their technical debt, something that is difficult (particularly in more toxic companies) when not using sprints. Scrum's rigid processes act as a kind of bulwhark against these kinds of issues, even if it still doesn't completely stop them. In low performing teams and toxic companies, being able to provide any kind of support for good development practices is too good of an opportunity to pass up.

## 3. Scrum (usually) forces developers to avoid silos
Whilst not *strictly* scrum, I think it's fair to say that 99 percent of scrum teams consist of multiple developers across different functions. This is without a doubt a massive benefit. By forcing developers from different functions to consistently interact with people from other functions, you avoid a whole host of problems. Your backend developer is aware of how the frontend will consume their api. QA is aware of how exactly the backend is processing data, so they can ensure all bases are covered by their tests.

In a perfect world, this will also result in a cross pollination effect, where each developer can start to pick up skills and approaches from other functions. You might not end up with a team of fullstack engineers proficient in every language and framework under the sun, but at least they'll start to have an appreciation for the limitations and strengths of the tools used by everyone in the team.
