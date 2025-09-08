---
title: Please dear god don't have a separate support team
---

# {{ page.title }}
{: #blog-header }

Recently, I was reading [this thread](https://www.reddit.com/r/ExperiencedDevs/comments/1n6j8pm/new_dev_secured_opt_out_to_one_of_the_more/), and I couldn't help but notice how it seemed like a clear belief that developers shouldn't be part of an oncall rotation, and that instead the company should be setting up a dedicated support team of developers responsible for fixing bugs and investigating end user issues.

I cannot stress enough how strongly I disagree with this.

## Developers should be part of a regular oncall rotation

To me, this is non-negotiable. It's really just that simple, but now having read through this discussion and reflecting back on other discussions I've had with people (technical and non-technical) about this idea, I feel the need to write down and justify this belief.

I'll break my arguments down into X broad categories:

1. Making support a key part of a developers role encourages ownership
2. Having a rotation makes the process both fair and efficient

Additionally, I'll respond to the X most common arguments *for* a separate support team that I hear, specifically:

1. "A separate support team of junior engineers frees up developers to work on higher impact work"
2. "We don't need a rotational policy because we handle issues as part of day to day work"
3. "A separate support team is a good transitory team for engineers from beginner to mid level"
3. << OTHERS >>

## "A separate support team of junior engineers frees up developers to work on higher impact work"
This is one of the more common arguments I see in favour of a separate developer support team. It's easy to see the thinking here. Most problems identified will arrive already scoped quite extensively and be relatively easy to resolve, the exact kind of work that you want junior engineers to be working on. Any other issues that are either too broad or too complicated can be routed through the feature team on an ad-hoc basis, minimising interrupts.

This is ultimately a flawed understanding, because it ignores some disastrous consequences. This approach directly limits the upwards trajectory of the engineers in the support team. Ultimately with no ability to directly impact the source of issues (the feature developers), support engineers are stuck solving the same set of problems, never learning anything knew. Should they want to become a mid level or higher engineer, they'll likely find themselves needing to leave the company to achieve that due to the inherent issues with finding any kind of promotion case from their work.

Additionally, these engineers are ultimately primarily introduced to low quality code. After all, their interaction with the codebase is limited to just the problematic areas. This stunts the growth of the engineers, preventing them from realistically seeing examples of good coding practices except incidentally. Even then, how likely is it that the engineers will learn the right lessons from those coding practices? Will they learn that splitting up larger functions into smaller ones can be useful because it makes it easier to break dependencies, isolate logic, and reduce code reuse? Or will they instead learn that smaller functions are better, and so therefore no function should ever be longer than 30 lines, inevitably leading to a complex mess of small functions making the codebase impossible to properly understand?


