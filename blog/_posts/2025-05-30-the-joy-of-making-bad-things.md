---
title: On the joy of making bad things
---

# {{ page.title }}
Over the years, one of the simple joys in life I've found is to make bad things. To make things that are undeniably terrible and that no one particularly wants to use. For me, it's all about the act of making something - I've always found more love in the act of making something than in the end result. Really this is why I like making bad things rather than good things. For one thing, it's so much easier to make a bad thing. Making good things requires a lot of effort and time - finding solutions to unique problems or making difficult decisions. Making bad things on the other hand, merely requires one thing - the desire to make something.

Maybe it'll turn out good - after all many good things started off originally as a bad thing, in fact basically everything has to start off first as a bad thing. But there's no requirement to continue with bad things. Get to where you want to get to, to where you've gotten what you want out of it, and then move on.

Often with me this winds up in writing implementations of programs that already exist. Like everybody else I've written a todo list application and a calculator. But I've also written a really inefficient rendering engine, a really bad LSP that wouldn't work for even the most simplistic of languages, a program to backtest stock trading algorithms that somehow managed to be the slowest thing in this entire list, and I'm currently in the process of writing a vim like text editor, which spun out of absent mindedly wondering "How exactly *do* vim and other programs wipe the terminal but keep everything the same?"[^1]

Every time that I've made something bad however, I've learned something new or sharpened my skills. You might not think they're connected, but the way that a graphics engine renders things is actually quite relevant to writing your own text editor. Sure you might not need to perform any 3d matrix multiplication to display a few lines of text, but approaches like dirty area rendering occlusion culling were incredibly important and I'd have probably never even considered them if I hadn't previously implemented them when needing to improve the efficiency of my renderer to avoid melting my laptop CPU for anything more complicated than a couple of cubes.

The entire performance focused approach that you find in graphics rendering has been an incredible lesson when rewriting basic programs. I've come to appreciate just how many basic functions are abstracted out even when writing your own implementations. You might not think writing text to the screen is a performance heavy operation, but when you're writing the TTY commands to actually do so, you very quickly gain an appreciation for just how often you're jumping around and how easy it is for performance to degrade very quickly. There's also an element of solutions that seem simple at first but become complex when you start to try to solve them.

Take for example, cursor movement across lines. Take for example the following example

```
Line 1
Line 2
Another longer line
                 ^
A short line
A final line at the end
```

The cursor position is represented by the `^`. If the user presses the up arrow key, where do we move the cursor? If we're storing the cursor as x,y coordinates, then x,y-1 doesn't exist. If we're storing the cursor as the index in the line (here 32), there's no way of knowing how many digits back inside the string we should move without knowing a lot of additional information that wouldn't be smart to store/update with every cursor change, like the length of each line above it. And what about line 5? It's just a `\r\n`, but there's no "visual" character, so when the user presses the down arrow key, is this line being correctly represented in memory, or will we accidentally move the cursor too far, to line 6 (or worse still, the *end* of line 6)?

An interesting lesson for me was that there simply *was* no "good" solution. Or at least maybe there is, but I'm just not smart enough to solve it. After spending way too long thinking about it and coming up with a million different solutions, it turns out that realistically the two most common solutions are the more straight forward - either maintain two maps which convert from an index to x,y coords and vice versa, or maintain information about each line including the start and ending indexes within the string.

It's the things like this that keep me sane - a reminder that despite it all sometimes the best solutions are also the worst solutions. That even the people who I greatly look up to because they've written useful, important, or even foundational programs still sometimes write functions that are messy or complex or straightforward with large O notation scales. Particularly as software engineers, it can be easy to assume that the best solutions are the ones that run in O(n) or O(logn), and that these solutions *must* exist and we just need to think hard enough about them. P vs NP aside, for the majority of us - and especially when working on problems that you *know* other people have solved before - it's easy to assume that there truly is an easier solution.

This is often the hardest part of programming, and a large part of why I like making bad things rather than good things. A graphics renderer that can barely load any object with more than 100 vertices without crashing is hardly a useful program. It certainly won't be used by anyone except myself when I randomly remember it about once a year. It lacks basic functionality even for the small files it can handle, only rotating on a specified set of axis and offering little to no colour options, let alone lighting. It's still a graphics engine.

If I wanted to make it a good graphics engine, then I'd have to start making these hard decisions - when to sacrifice code readability and maintainability for performance, when to write an amazing implementation and when to just get something out. What options to offer to end users and what to keep hidden, and most importantly how to avoid edge cases on machines that I don't control frying an end users machine because they were curious about something they saw pop up on github one day.

Which is another reason why I like bad things - nobody will ever care if the bad thing breaks. There's a kind of grace and acceptance given to bad things that we would never accept giving to things that try to be good. If the program generating backtesting results for a trading strategy takes 15 minutes to finish, and only spits out a single image with obvious errors has some possible redrawing[^2], it's not exactly unexpected now is it? Nobody sane is putting any real money on the basis of it's output and there's no expectation of anything better. It's slow and it's janky, but if you're curious if "buying the first stock to hit a 52 week high this week, every week" is objectively bad or good, well then it does what you need. If features start being added, performance improvements start being made, and bugs started getting fixed... Well then maybe some people might just start to assume some things that they shouldn't about the validity of the results.

I've tried to always take this mindset into everything I do. I feel like it's more about getting something out there, getting something that somebody, even if it's only ever you, can interact with. Because sometimes the most value you gain is in just doing the thing, even if what you get at the end is a bad product. It's generally pretty rare to be unable to go back and fix your mistakes or improve upon what you've already got, it's basically the only reason any startup is ever able to get anywhere.

In short:
## Save the good for later - make the bad thing now.

[^1]: For those curious, it's done via an [ANSI escape command](https://www.gnu.org/software/screen/manual/html_node/Control-Sequences.html#:~:text=%3F1047%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Alternate%20Screen%20(new%20xterm%20code)%0A%20%20%20%20%20%20%20%20%20%20%20%3F1049%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Alternate%20Screen%20(new%20xterm%20code))
[^2]: Redrawing is when the historical results change based on new information. It means that an indicator's historical information cannot be trusted.
