---
layout: post
title: Practical ML Engineering
date: 2025-11-08
description: Lessons from building ML systems at scale - the gap between research and production.
tags: ml-engineering, production, best-practices
categories: industry-insights
giscus_comments: false
---

> 📌 **This post is for data scientists and ML engineers stepping into production roles**, or for those wondering why "that model that worked perfectly in the notebook" fails mysteriously after deployment.


## The Notebook-to-Production Gap

There's a chasm between a well-executed machine learning research project and a production ML system. Academic coursework and Kaggle competitions don't prepare you for it.

| **In School** | **In Production** |
|---|---|
| Start with clean data | Deal with data that changes constantly |
| Run experiments on a fixed, held-out test set | Must handle edge cases no one predicted |
| Iterate until you hit your target metric | Face tradeoffs between accuracy, latency, and cost |
| Submit and move on | Get woken up at 2 AM when something breaks |

> 💡 **The difference isn't technical sophistication—it's constraints.** In academia, you optimize for accuracy. In production, you optimize for accuracy *given* latency, cost, and reliability budgets.


## The Real Work: Data Pipelines

The sexiest part of machine learning is the model. The most important part is the data pipeline.

In production systems, data pipeline failures often go unnoticed longer than model failures. A small percentage of dropped rows, schema inconsistencies, or staleness can silently degrade model performance.

> ⚠️ **"Garbage in, garbage out."** Your model is only as good as the data it's trained on. If the data pipeline is broken, no amount of modeling sophistication will save you.

### Key Lessons

#### 1️⃣ Data quality is non-negotiable

Set up monitoring on:
- **Row counts** — alert if they drop unexpectedly
- **Schema changes** — a new NULL in a field that was never null
- **Distribution shifts** — a metric that was always in range [0, 100] suddenly hits 500
- **Freshness** — how stale is the data feeding your model?

**Real failures I've seen:**
- A dependency stopped updating (nobody noticed for 3 weeks)
- A join condition broke silently (missing outer joins)
- Timezone handling changed (timestamps stored inconsistently)

#### 2️⃣ Reproducibility is harder than you think

Subtle issues like unlogged random seeds, version-dependent behavior, or undocumented data transformations can cause models that work in training to fail unexpectedly in production.

**Best practices:**
- Version your training data (or at least the query/snapshot timestamp)
- Log *all* hyperparameters and random seeds
- Bake versioning into your pipeline config, not as comments
- Make your training script idempotent—running it twice should give identical results

#### 3️⃣ Operational concerns matter more than you expect

Early-career engineers optimize for accuracy. Experienced engineers optimize for debuggability.

When something goes wrong at 3 AM:
- Can you trace which data version was used?
- Can you reproduce the model locally?
- Do you have logs that show when the problem started?
- Can you roll back to the previous version in <5 minutes?

> 🔧 This isn't sexy, but it's survival.


## Model Deployment Isn't One Step

Deploying a model is trivial. Deploying a model *safely* requires a process:

```
1. Offline evaluation
   ↓
2. Shadow mode (new model runs but isn't used)
   ↓
3. Canary deployment (5% → 10% → 25% → 100%)
   ↓
4. Full rollout
   ↓
5. Monitor (keep watching for weeks)
```

**Stage breakdown:**

| Stage | What Happens | Why It Matters |
|-------|-------|-------|
| **Offline** | Does it work on held-out data? | Sanity check |
| **Shadow** | Run new model in production, but don't use the predictions; just log them | See real-world performance under actual load; catch infrastructure bugs before users see them |
| **Canary** | Route 5% of traffic to the new model; monitor metrics closely; if wrong, roll back immediately | Gradual validation with easy exit |
| **Rollout** | Send 100% of traffic to the new model | Full deployment |
| **Monitor** | Keep watching for weeks; metrics sometimes degrade slowly | Seasonal patterns might not show up immediately; new edge cases emerge |

> ⚡ I've seen teams skip stages 2 and 3 to move fast. They always regret it. A rollback during shadow mode costs nothing. A rollback after full deployment costs your reputation.


## Monitoring and Alerting

> 📊 You cannot manage what you cannot measure. You cannot debug what you cannot see.

### Metrics to Track

**📈 Business Metrics:**
- Recommendation CTR, conversion rate, revenue
- Customer LTV, churn

**🤖 Model Metrics:**
- Prediction distribution (is the model's output suddenly different?)
- Back Testing (if it says 80% confidence, does it happen ~80% of the time?)
- Performance by segment (does the model work equally well for all user groups?)

**⚙️ System Metrics:**
- Latency (p50, p95, p99—not just average)
- Error rate
- Resource utilization

> ⚠️ **Key insight:** Models can perform well on average metrics while failing for specific segments or subpopulations. Monitoring segment-level performance from the start catches these issues before they become public problems.


## The Cost-Accuracy Tradeoff

In school, you minimize loss. In production, you minimize cost subject to accuracy constraints.

### The Hidden Costs

**💰 Latency costs money:**
- A model that takes 500ms instead of 100ms might need 5x more infrastructure
- If your queries are interactive (like search), slower is worse for users

**🔀 Complexity costs maintainability:**
- An ensemble of 10 models beats a single model by 2% accuracy
- But now you have 10x the deployment surface, 10x the monitoring burden
- When one model drifts, can you diagnose which one?

**📦 Data costs money:**
- Getting more training data is expensive
- Labeling is expensive
- Storage is expensive

### Production Constraints

**Common real-world limitations:**
- Latency requirements force you to simplify models or reduce feature computation
- Labeling budgets limit the amount of training data you can obtain
- Deployment targets (mobile, edge devices) impose strict size and compute limits

> 🎯 The best engineers I know make these tradeoffs explicitly, with full stakeholder buy-in. They don't optimize blindly.

> 💡 **A "worse" model that ships and stays healthy is better than a perfect model that's too expensive or fragile to maintain.**


## When Models Fail (and They Will)

### Data Drift
Your training distribution doesn't match production. User behavior changes, seasonality shifts, a competitor launches something new.

**Solution:** Monitor the distribution of features and predictions. If they shift significantly, retrain.

### Concept Drift
The relationship between features and labels changes. A user's purchase intent signal that worked last year no longer predicts purchases.

**Solution:** This is harder to detect than data drift. Monitor prediction accuracy continuously. Set up automated retraining pipelines that retrain on recent data.

### Model Collapse
Over time, your model learns artifacts and shortcuts that don't generalize.

**Solution:** Regularly train from scratch on fresh data. Don't just fine-tune forever.

### Failure Mode to Avoid: Silent Degradation
Training on stale data due to pipeline outages or delays silently degrades model performance.

**Safeguard:** If data freshness drops below a threshold, pause retraining and alert the team. Never retrain on data older than a known cutoff without explicit review.


## Building for Observability

> 🔍 **If you can't explain why your model made a decision, you can't ship it.**

For high-stakes models (finance, healthcare, moderation), stakeholders need to understand predictions. For lower-stakes models (recommendations), it's nice-to-have but helps with debugging.

### Key Techniques

#### 1. Feature Attribution (SHAP, LIME, attention weights)
- Which features drove this prediction?
- Are those features reasonable?
- Is the model relying on something you didn't expect?

#### 2. Prediction Explanations
- Can you summarize the model's reasoning in plain language?
- Example: Instagram recommendation reasons → "Because you follow @person" or "Similar to X you liked"

#### 3. Holdout Cohorts
- Keep a small % of traffic on the old model/logic
- Compare performance between old and new
- Catches issues the metrics might miss

### Common Bugs Caught Through Deep Dives

Most issues aren't caught by alert thresholds—they show up as statistical anomalies during investigation:

- **Data leakage** — features that shouldn't exist at serving time
- **Pipeline issues** — missing data, schema changes
- **Performance bottlenecks** — unexpected latency spikes

> 💭 Regular deep dives into metrics catch these before they become systemic problems.


## The Unspoken Part: Technical Debt

Production ML systems accumulate debt fast:
- One-off hacks to handle edge cases
- Features nobody remembers why they're there
- Models nobody trained recently
- Pipelines with unclear ownership
- Documentation that's out of sync with reality

> 🔥 **This is where mediocre engineers get stuck and great engineers thrive.**

**The difference:**
- **Mediocre engineers** ship quick, then spend months firefighting
- **Great engineers** move slightly slower upfront, build clean abstractions, and maintain velocity

### Specific Practices for Longevity

✅ Code review, but actually (not rubber-stamping)
✅ Delete code that's not used (dead code rots and confuses)
✅ Document the "why," not just the "what"
✅ Refactor before it becomes critical
✅ If you find a hack, create a ticket to fix it later—and actually fix it

> 💪 In high-velocity teams, the ones that sustain productivity have the cleanest codebases. It's not a coincidence—technical debt compounds.


## Practical Advice

If you're transitioning from academia or competitions to production ML, here's what I'd focus on:

### First 6 Months: Foundation
- Learn your company's data infrastructure deeply
- Understand how models are deployed and monitored
- Shadow someone shipping to production
- Read old postmortems of things that broke

### First Year: Ownership
- Ship a model end-to-end (from data pipeline to monitoring)
- Have your model break and experience the firefighting
- Build something you're on-call for
- Learn what "operational excellence" means in practice

### Long-term: Systems Thinking
- Get comfortable with ambiguity (production requirements are messier than research problems)
- Develop strong software engineering fundamentals
- Learn to optimize for the right metric (not always accuracy)
- Build systems others can maintain and extend

> 🎓 **The best ML engineers I know are, first and foremost, good software engineers who know ML.** They think in systems, not models.