---
layout: post
title: The Feedback Problem in Machine Learning
date: 2026-04-27
description: When your model shapes the very data it learns from
tags: machine-learning, data-science
categories: engineering
giscus_comments: false
---


<hr>

**Most ML problems assume the world is independent of the model. Many real-world deployments are not.**

The standard narrative around model failure goes like this: your model was trained on historical data, the world changed, and now the model is wrong. Retrain, redeploy, repeat. But there's a quieter, more insidious failure mode that rarely gets discussed: the model itself changes the world it's trying to predict.

<hr>


## The problem with predictions that influence outcomes

Consider a model that predicts how people will vote. If the model's predictions are used to target campaign messaging, and people respond to that messaging, did the model predict voter behavior—or did it *create* it? The ground truth you eventually collect is contaminated by the model's own recommendations.

This is sometimes called a **feedback loop**, and it's pervasive in deployed ML systems. A recommendation engine shapes what users watch, then trains on engagement data from those very recommendations. A credit scoring model shapes who receives loans, then trains on repayment data from those approved applicants. In each case, the model's output influences the distribution of future training data.

The consequence: your model isn't learning about the world. It's learning about itself.

<hr>


## A real example: fraud detection in insurance

I worked at an insurtech company where we built a supervised learning model for fraud detection. Insurance companies would submit claims, our system would surface "findings"—specific signals that looked suspicious—and the model's job was to predict which findings were worth flagging to the client as genuinely fraudulent.

The setup made sense. Investigators have limited bandwidth. You can't review every finding manually, so a model that ranks and filters them is genuinely useful.

But over time, model performance degraded. There were two causes, and the second one is the one that keeps me up at night.

**Cause one: the model wasn't retrained.** Five years without a retrain in a domain where fraud patterns evolve constantly. Fraudsters adapt. Claim compositions shift. This is the obvious failure mode.

**Cause two: survivorship bias from the model's own decisions.**

When the model predicted that a finding was *not* worth flagging, the insurance company never saw it. No investigator reviewed it. No label was ever collected for it. From the perspective of future training data, that finding simply didn't exist.

But here's the problem: some of those suppressed findings were false negatives—real fraud that the model quietly buried. And because they were buried, no one ever knew. The model degraded not just because the world changed, but because it was actively shaping which data it would ever be trained on next.

This is feedback loop failure at its worst. The model's errors are self-concealing.

<hr>


## Why this is hard to catch

With ordinary model drift, you eventually notice: predictions diverge from outcomes, metrics drop, someone files a bug. The signal is visible.

With feedback loop degradation, the signal is *missing*. You don't see the false negatives because the model suppressed them before any human could review them. Your labeled dataset looks clean. Your precision metrics may even look fine, because you're only evaluating on the cases the model chose to surface.

You're measuring the model against the world it allowed you to see.

<hr>


## Ways to mitigate it

**1. Random holdout sampling**

Reserve a small percentage of decisions for human review regardless of model score. If the model says a finding is not worth flagging, surface it anyway 5% of the time. This gives you ground truth labels on cases the model would have suppressed—and lets you detect false negatives before they accumulate.

The cost is real (investigators spend time on low-signal cases), but the alternative is flying blind.

**2. Counterfactual logging**

Log everything the model suppressed, with its score and reasoning. Even if you can't label all of it, having the data lets you audit later. When patterns shift or a client flags something unusual, you can look back at what the model was hiding.

**3. Regular retraining with fresh labels**

This sounds obvious, but the key constraint is making sure your retraining data includes samples from the suppressed distribution, not just the cases the model surfaced. Retraining on only confirmed positives will reinforce the model's existing blind spots.

**4. Separate the filtering from the learning**

Where possible, decouple the model that makes decisions from the model that learns from outcomes. A/B test different filtering thresholds deliberately. Treat the feedback loop as a system design problem, not just a modeling problem.

**5. Monitor the inputs, not just the outputs**

If the distribution of findings being surfaced to investigators shifts over time, that's a signal—even if no one is explicitly labeling outcomes as wrong. Drift in what the model sees upstream is an early warning before you see drift in what the model predicts.

<hr>


## A closing thought

The feedback problem doesn't mean you shouldn't build models that influence decisions. It means you have to design for it deliberately.

The dangerous assumption is that your model is a passive observer of a world that unfolds independently. In most real deployments, the model is an actor. It decides what gets reviewed, what gets funded, what gets shown. And that act of deciding shapes the distribution of future data.

If you're not accounting for that loop, you're not just measuring model performance. You're measuring the model's own echo.

