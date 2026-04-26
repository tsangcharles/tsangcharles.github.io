---
layout: post
title: Choosing the Right Tool
date: 2026-04-26
description: Tool selection matters more than solution-first thinking
tags: problem-solving, engineering
categories: engineering
giscus_comments: false
---


<hr>

**The problem with solution-first thinking is that we often reach for the most powerful tool instead of the most appropriate one.**

In our rush to solve problems, we naturally gravitate toward what's familiar, trendy, or impressive. In the AI age, this tendency has accelerated: ask a room of engineers how to automate something, and someone will suggest machine learning before anyone has fully described the problem.

<hr>


## A case study: automating the Chrome dinosaur game

<img src="/assets/img/chrome-dino/dino.png" alt="Chrome Dinosaur Game" width="400">

When I started looking at how others solved the Chrome dinosaur game, nearly every solution I found used machine learning. The approach was standard: feed the agent pixel data, let it learn through reinforcement learning, wait for convergence. Elegant, scalable, and utterly overkill.

Instead, I built a [physics-based Chrome extension](https://github.com/tsangcharles/chrome-dino-ai) that automatically plays the game. No neural networks. No training loops. Just kinematics and decision logic:

- Detect obstacles on screen
- Calculate jump timing based on game speed and distance
- Execute the jump at the right moment
- Repeat

It works perfectly.

<hr>


## The hidden costs of solution-first thinking

**Machine learning has real advantages.** With ML, you skip the need to understand the physics or intricacies of the problem. Set up an environment, define a reward signal, and let the agent learn. No implementation details to sweat. Extremely useful when the underlying rules are opaque or too complex to model by hand.

But there's a cost:

- **Maintenance burden:** ML models degrade with data drift, require retraining, and are harder to debug when things go wrong. Your simple game automation now needs monitoring and infrastructure.
- **Overkill complexity:** A physics simulation takes a handful of formulas. An ML approach requires experimentation, hyperparameter tuning, and potential overfitting.
- **Understanding:** With ML, you outsource cognition to the model. With physics, you *understand* exactly why the solution works.

The reverse is also true. A simple physics approach is brittle if the problem is genuinely complex—if the game rules were hidden or constantly changing, ML would shine.

<hr>


## Thinking tool-first

The better approach is to **ask the problem first, then choose the tool.**

- Is the problem well-defined? Can you model it with rules or math? → Simple solution: physics, heuristics, logic
- Is the problem opaque or too complex to enumerate? → ML might be the right call
- Do you need to adapt to changing conditions? → Systems that learn might be better
- Is maintainability the constraint? → Choose the simplest approach that solves it

<blockquote>
<b>The best tool is the one that solves the problem with the least complexity.</b><br>
This usually isn't the most powerful tool in your arsenal.
</blockquote>

In the dinosaur game, the problem was crystal clear: predict collisions and jump in time. Physics kinematics solved it in under 100 lines of code. ML would have solved it too—just with more infrastructure, more moving parts, and more things to go wrong.

<hr>


## A closing thought

The dinosaur game serves as a reminder: in an era where we're trained to see every nail as something that ML can bang, we need to push back. Reach for the simplest, most maintainable solution that gets the job done.

Sometimes that's machine learning. Often, it's not.
