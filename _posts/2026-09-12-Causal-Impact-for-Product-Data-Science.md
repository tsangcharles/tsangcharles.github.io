---
layout: post
title: Causal Impact for Product Data Science
date: 2026-09-12
description: Notes on causal inference for product data science — difference-in-differences, Bayesian structural time series, and what it's actually like using Google's CausalImpact package without attribution data
tags: causal-inference, data-science, experimentation, statistics
categories: industry-insights
giscus_comments: false
---

<style>
.causal-viz {
  --ink: #0b0b0b;
  --ink-secondary: #52514e;
  --ink-muted: #898781;
  --grid: #e1e0d9;
  --baseline: #c3c2b7;
  --series-1: #2a78d6;
  --series-2: #eb6834;
  margin: 1.75rem 0 2.25rem;
}
html[data-theme="dark"] .causal-viz {
  --ink: #ffffff;
  --ink-secondary: #c3c2b7;
  --ink-muted: #898781;
  --grid: #2c2c2a;
  --baseline: #383835;
  --series-1: #3987e5;
  --series-2: #d95926;
}
.causal-viz { max-width: 100%; }
.causal-viz svg { width: 100%; height: auto; display: block; overflow: visible; }
.causal-viz .panel-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--ink-secondary);
  margin: 0 0 2px;
}
.causal-viz .panel-title.spaced { margin-top: 14px; }
.causal-viz .axis-text { font: 11px system-ui, -apple-system, "Segoe UI", sans-serif; fill: var(--ink-muted); }
.causal-viz .direct-label { font: 11px system-ui, -apple-system, "Segoe UI", sans-serif; fill: var(--ink-secondary); }
.causal-viz .grid-baseline { stroke: var(--baseline); stroke-width: 1; stroke-dasharray: 4 3; fill: none; }
.causal-viz .axis-line { stroke: var(--baseline); stroke-width: 1; }
.causal-viz .launch-line { stroke: var(--ink-muted); stroke-width: 1.3; stroke-dasharray: 5 4; }
.causal-viz .zero-line { stroke: var(--baseline); stroke-width: 1; stroke-dasharray: 3 3; }
.causal-viz .s1 { stroke: var(--series-1); stroke-width: 2.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.causal-viz .s2 { stroke: var(--series-2); stroke-width: 2.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.causal-viz .s-cf { stroke: var(--ink-secondary); stroke-width: 2; fill: none; stroke-dasharray: 6 4; stroke-linecap: round; }
.causal-viz .ci-fill { fill: var(--series-1); opacity: 0.16; stroke: none; }
.causal-viz .dot-1 { fill: var(--series-1); }
.causal-viz .dot-2 { fill: var(--series-2); }
.causal-viz .dot-cf { fill: var(--ink-secondary); }
.causal-viz .bracket { stroke: var(--ink-muted); stroke-width: 1.2; fill: none; }
.causal-viz figcaption {
  font-size: 0.85rem;
  color: var(--ink-secondary);
  line-height: 1.45;
  margin-top: 0.6rem;
}
.causal-viz .viz-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;
  font-size: 0.83rem;
  color: var(--ink-secondary);
  margin-top: 0.5rem;
}
.causal-viz .viz-legend .swatch {
  display: inline-block;
  width: 14px;
  height: 2.5px;
  border-radius: 2px;
  margin-right: 5px;
  vertical-align: middle;
  position: relative;
  top: -2px;
}
.causal-viz .viz-legend .sw-1 { background: var(--series-1); }
.causal-viz .viz-legend .sw-2 { background: var(--series-2); }
.causal-viz .viz-legend .sw-cf {
  background: none;
  border-top: 2px dashed var(--ink-secondary);
  height: 0;
}
</style>

<hr>

**This year, teaching my 2026-2027 data science cohort, I asked students to pick a topic and present it to the class. One topic sat untouched: causal impact.**

I don't really blame them. Next to it on the sign-up sheet were RAG and other LLM-related topics — flashier, more resume-friendly, easier to demo. "Why marketing spend didn't cause the DAU bump you think it caused" is a much harder sell to a room full of people who came here to build cool things.

Nobody ended up picking it. But causal impact is quietly one of the most important skills in product data science, so I decided to write it up myself instead. Here's roughly what I'd have wanted them to hear.

<hr>

## Correlation Isn't Causation (Everyone Knows It, Until It's Their Dashboard)

It's a cliché precisely because it's so easy to forget when the chart is your own. Two lines climb together, and the story writes itself.

<figure class="causal-viz">
  <p class="panel-title">Marketing spend and DAU, indexed to week 1</p>
  <svg viewBox="0 0 640 330" role="img" aria-label="Line chart showing marketing spend and DAU both trending upward together over 26 weeks">
    <line class="grid-baseline" x1="50" y1="271.0" x2="540" y2="271.0"/>
    <text class="axis-text" x="54" y="266">index = 100</text>
    <line class="axis-line" x1="50" y1="300" x2="540" y2="300"/>
    <text class="axis-text" x="50" y="317">Week 1</text>
    <text class="axis-text" x="540" y="317" text-anchor="end">Week 26</text>
    <polyline class="s2" points="50.0,272.8 69.6,262.4 89.2,246.4 108.8,246.6 128.4,242.2 148.0,239.8 167.6,233.1 187.2,227.6 206.8,217.9 226.4,201.6 246.0,179.0 265.6,167.6 285.2,163.4 304.8,156.8 324.4,143.7 344.0,139.4 363.6,138.2 383.2,118.9 402.8,108.2 422.4,108.1 442.0,105.2 461.6,99.5 481.2,75.7 500.8,74.4 520.4,60.0 540.0,41.1"/>
    <polyline class="s1" points="50.0,278.9 69.6,264.8 89.2,262.7 108.8,252.9 128.4,240.5 148.0,228.0 167.6,223.2 187.2,216.5 206.8,217.5 226.4,208.1 246.0,200.4 265.6,184.6 285.2,177.3 304.8,166.3 324.4,162.1 344.0,160.9 363.6,145.7 383.2,134.1 402.8,131.6 422.4,131.8 442.0,121.8 461.6,113.0 481.2,100.1 500.8,92.2 520.4,86.0 540.0,78.0"/>
    <circle class="dot-2" cx="540.0" cy="41.1" r="3.3"/>
    <circle class="dot-1" cx="540.0" cy="78.0" r="3.3"/>
    <text class="direct-label" x="546" y="44">Spend</text>
    <text class="direct-label" x="546" y="81">DAU</text>
  </svg>
  <div class="viz-legend">
    <span><span class="swatch sw-1"></span>DAU (indexed)</span>
    <span><span class="swatch sw-2"></span>Marketing spend (indexed)</span>
  </div>
  <figcaption>Both lines climb over the same 26 weeks. It <em>looks</em> like the spend drove the DAU. It might have. It might also be seasonality, organic growth, or three other things that happened to move at the same time.</figcaption>
</figure>

The chart alone can't tell the two apart. That's the entire problem this post is about.

<hr>

## The First Time It Bit Me: A Campaign With No Attribution

I first ran into this for real at Zynga. Marketing ran a campaign — broad, not targeted at a specific randomized slice of users — and there was no attribution tracking set up ahead of time. No control group, no holdout, no click-through tagging. Just a campaign that went out, and a DAU line that went up shortly after.

Naturally, marketing wanted credit for the lift. And naturally, my job was to figure out how much of it, if any, was actually theirs.

## When A/B Testing Isn't On the Menu

The gold standard for causal impact in industry is the randomized controlled experiment — the A/B test. Randomize who's exposed, compare the groups, done. It's clean because randomization handles all the confounders for you, known and unknown.

The problem is that a lot of real interventions can't be randomized at the user level: a national marketing campaign, a press cycle, a pricing change announced publicly, a platform-wide feature launch. There's no "control group" sitting inside the same market at the same time, untouched.

When that's the situation, people reach for a small set of quasi-experimental methods instead.

## Difference-in-Differences, Briefly

The most common of these is **difference-in-differences (DiD)**. The idea: find a market or segment that wasn't exposed to the treatment but otherwise moves similarly to the one that was. Compare the *change* in the treated group before vs. after, and net out the *change* in the control group over the same window. What's left is attributed to the treatment.

<div style="text-align:center; font-family: system-ui, sans-serif; font-size: 0.9rem; margin: 1rem 0; color: var(--global-text-color-light, #666);">
DiD estimate = (Treatment<sub>after</sub> − Treatment<sub>before</sub>) − (Control<sub>after</sub> − Control<sub>before</sub>)
</div>

The whole method leans on one assumption: **parallel trends** — that absent the campaign, the treated group would have kept moving in step with the control group.

<figure class="causal-viz">
  <p class="panel-title">Difference-in-differences: main market vs. Australia</p>
  <svg viewBox="0 0 700 340" role="img" aria-label="Diagram showing treatment market diverging from control market and its counterfactual trend after a campaign launch">
    <line class="axis-line" x1="50" y1="300" x2="580" y2="300"/>
    <line class="grid-baseline" x1="50" y1="253.9" x2="580" y2="253.9"/>
    <text class="axis-text" x="54" y="249">index = 100</text>
    <line class="launch-line" x1="304.4" y1="20" x2="304.4" y2="300"/>
    <text class="axis-text" x="309" y="32">Campaign</text>
    <text class="axis-text" x="309" y="44">starts</text>
    <text class="axis-text" x="50" y="317">Week 1</text>
    <text class="axis-text" x="580" y="317" text-anchor="end">Week 26</text>
    <polyline class="s2" points="50.0,243.9 71.2,246.4 92.4,241.5 113.6,229.9 134.8,237.7 156.0,233.3 177.2,227.3 198.4,212.7 219.6,225.9 240.8,231.3 262.0,226.5 283.2,208.9 304.4,196.3 325.6,205.4 346.8,189.0 368.0,187.7 389.2,174.0 410.4,165.0 431.6,179.6 452.8,164.1 474.0,166.0 495.2,173.8 516.4,168.9 537.6,174.4 558.8,158.7 580.0,153.0"/>
    <polyline class="s-cf" points="304.4,218.3 325.6,227.4 346.8,211.0 368.0,209.7 389.2,195.9 410.4,186.9 431.6,201.6 452.8,186.1 474.0,187.9 495.2,195.7 516.4,190.8 537.6,196.4 558.8,180.7 580.0,175.0"/>
    <polyline class="s1" points="50.0,259.8 71.2,253.7 92.4,258.9 113.6,253.8 134.8,256.0 156.0,257.3 177.2,249.4 198.4,247.4 219.6,239.5 240.8,222.1 262.0,228.3 283.2,215.2 304.4,218.3 325.6,178.8 346.8,152.3 368.0,146.4 389.2,123.5 410.4,110.6 431.6,117.0 452.8,110.2 474.0,96.6 495.2,80.9 516.4,89.0 537.6,90.0 558.8,75.5 580.0,60.2"/>
    <circle class="dot-1" cx="580.0" cy="60.2" r="3.3"/>
    <circle class="dot-2" cx="580.0" cy="153.0" r="3.3"/>
    <text class="direct-label" x="330" y="250">predicted, no campaign</text>
    <path class="bracket" d="M 592,60.2 H 601 M 592,175.0 H 601 M 596.5,60.2 V 175.0"/>
    <text class="direct-label" x="606" y="112" font-weight="600">Estimated</text>
    <text class="direct-label" x="606" y="126" font-weight="600">campaign lift</text>
  </svg>
  <div class="viz-legend">
    <span><span class="swatch sw-1"></span>Main market (treated)</span>
    <span><span class="swatch sw-2"></span>Australia (input to the synthetic control — no campaign)</span>
    <span><span class="swatch sw-cf"></span>Predicted, had the campaign not run</span>
  </div>
  <figcaption>Both markets track each other before launch. After launch, the main market breaks away from its own pre-trend. The gap between where it actually went and where its pre-trend (adjusted for what Australia did) says it would have gone is the DiD estimate.</figcaption>
</figure>

DiD is simple, explainable to a stakeholder in one slide, and a very reasonable first move. But it needs a genuinely comparable control group, and one control group is a small sample size of exactly one.

<hr>

## Enter Bayesian Structural Time Series

This is the part I most wanted covered, because it's what I reached for at Zynga and what shows up again and again in product DS: **Bayesian structural time series (BSTS)**.

The general idea it implements has a name: the **synthetic control**. Instead of finding one perfectly matched comparison group and taking a single before/after difference like DiD does, you construct a *synthetic version* of the treated market — built from one or more untreated comparison series — that approximates what the treated market would have looked like without the intervention. BSTS is one way to build that synthetic control: it combines a local trend and seasonal component with a regression on other time series that are correlated with your target but weren't touched by the treatment. Feed it enough good comparison series, and it produces a **synthetic counterfactual** — a full predicted curve, with uncertainty, for "what DAU would have been."

The effect estimate is then just observed minus predicted, at every point in time, with a credible interval instead of a p-value.

## Google's CausalImpact Package

The industry-standard tool for this is Google's [**CausalImpact**](https://google.github.io/CausalImpact/) R package, built on top of `bsts`. It's become the default way product and marketing teams estimate the effect of something they couldn't A/B test — a launch, a PR moment, a campaign.

This is the package I used to try to untangle the Zynga campaign. The main market had run the campaign, so I needed a comparison series to build a **synthetic control** from — a market that hadn't been touched by the campaign, but that moved with the main market for reasons unrelated to marketing. **Australia** was the pick, based on business acumen more than a formal test: we knew from experience it behaved similarly to the US market. But the one non-negotiable requirement was simpler than any of that: the campaign did not run there. So I fed its DAU into CausalImpact as a covariate and let the model build the synthetic control — the predicted counterfactual — for what the main market's DAU would have done on its own.

<figure class="causal-viz">
  <p class="panel-title">Observed DAU vs. Bayesian counterfactual (95% credible interval)</p>
  <svg viewBox="0 0 640 190" role="img" aria-label="CausalImpact style chart showing observed DAU slightly above a predicted counterfactual with a wide credible interval">
    <line class="launch-line" x1="304.4" y1="20" x2="304.4" y2="170"/>
    <line class="axis-line" x1="50" y1="170" x2="540" y2="170"/>
    <text class="axis-text" x="50" y="187">Week 1</text>
    <text class="axis-text" x="540" y="187" text-anchor="end">Week 26</text>
    <path class="ci-fill" d="M 50.0,141.1 L 69.6,142.4 L 89.2,136.9 L 108.8,136.4 L 128.4,129.4 L 148.0,131.1 L 167.6,126.0 L 187.2,127.5 L 206.8,120.1 L 226.4,115.6 L 246.0,119.0 L 265.6,115.2 L 285.2,115.9 L 304.8,108.6 L 324.4,98.5 L 344.0,96.3 L 363.6,91.8 L 383.2,87.8 L 402.8,83.0 L 422.4,73.5 L 442.0,68.3 L 461.6,62.9 L 481.2,51.9 L 500.8,46.4 L 520.4,40.1 L 540.0,33.8 L 540.0,155.3 L 520.4,153.3 L 500.8,151.3 L 481.2,148.5 L 461.6,151.3 L 442.0,148.4 L 422.4,145.3 L 402.8,146.5 L 383.2,143.0 L 363.6,138.7 L 344.0,134.9 L 324.4,128.9 L 304.8,130.7 L 285.2,129.7 L 265.6,129.0 L 246.0,132.8 L 226.4,129.4 L 206.8,133.9 L 187.2,141.3 L 167.6,139.8 L 148.0,144.9 L 128.4,143.2 L 108.8,150.2 L 89.2,150.7 L 69.6,156.2 L 50.0,154.9 Z"/>
    <polyline class="s-cf" points="50.0,148.0 69.6,149.3 89.2,143.8 108.8,143.3 128.4,136.3 148.0,138.0 167.6,132.9 187.2,134.4 206.8,127.0 226.4,122.5 246.0,125.9 265.6,122.1 285.2,122.8 304.8,119.6 324.4,113.7 344.0,115.6 363.6,115.2 383.2,115.4 402.8,114.7 422.4,109.4 442.0,108.3 461.6,107.1 481.2,100.2 500.8,98.9 520.4,96.7 540.0,94.5"/>
    <polyline class="s1" points="50.0,150.4 69.6,148.2 89.2,145.7 108.8,144.7 128.4,141.0 148.0,139.4 167.6,142.0 187.2,137.8 206.8,139.5 226.4,138.5 246.0,135.0 265.6,122.9 285.2,114.6 304.8,111.1 324.4,105.8 344.0,104.7 363.6,99.3 383.2,103.9 402.8,108.5 422.4,101.9 442.0,93.0 461.6,105.8 481.2,102.9 500.8,89.9 520.4,87.0 540.0,84.2"/>
    <circle class="dot-1" cx="540.0" cy="84.2" r="3.3"/>
    <circle class="dot-cf" cx="540.0" cy="94.5" r="3.3"/>
    <text class="direct-label" x="546" y="80">Observed</text>
    <text class="direct-label" x="546" y="102">Predicted</text>
  </svg>
  <p class="panel-title spaced">Cumulative effect on DAU (95% credible interval)</p>
  <svg viewBox="0 0 640 170" role="img" aria-label="Cumulative effect chart where the credible interval band widens over time and dips down to touch zero by the end of the post-period">
    <line class="zero-line" x1="50" y1="136.4" x2="540" y2="136.4"/>
    <text class="axis-text" x="54" y="132">0</text>
    <line class="launch-line" x1="304.4" y1="20" x2="304.4" y2="150"/>
    <line class="axis-line" x1="50" y1="150" x2="540" y2="150"/>
    <text class="axis-text" x="50" y="167">Week 1</text>
    <text class="axis-text" x="540" y="167" text-anchor="end">Week 26</text>
    <path class="ci-fill" d="M 50.0,136.4 L 69.6,136.4 L 89.2,136.4 L 108.8,136.4 L 128.4,136.4 L 148.0,136.4 L 167.6,136.4 L 187.2,136.4 L 206.8,136.4 L 226.4,136.4 L 246.0,136.4 L 265.6,136.4 L 285.2,129.8 L 304.8,122.3 L 324.4,115.1 L 344.0,106.5 L 363.6,95.8 L 383.2,87.0 L 402.8,80.5 L 422.4,73.4 L 442.0,63.0 L 461.6,58.6 L 481.2,56.0 L 500.8,48.3 L 520.4,40.3 L 540.0,32.0 L 540.0,136.8 L 520.4,137.5 L 500.8,137.9 L 481.2,138.0 L 461.6,133.0 L 442.0,129.8 L 422.4,132.6 L 402.8,132.1 L 383.2,131.0 L 363.6,132.2 L 344.0,135.3 L 324.4,136.3 L 304.8,135.9 L 285.2,135.8 L 265.6,136.4 L 246.0,136.4 L 226.4,136.4 L 206.8,136.4 L 187.2,136.4 L 167.6,136.4 L 148.0,136.4 L 128.4,136.4 L 108.8,136.4 L 89.2,136.4 L 69.6,136.4 L 50.0,136.4 Z"/>
    <polyline class="s1" points="50.0,136.4 69.6,136.4 89.2,136.4 108.8,136.4 128.4,136.4 148.0,136.4 167.6,136.4 187.2,136.4 206.8,136.4 226.4,136.4 246.0,136.4 265.6,136.4 285.2,132.8 304.8,129.1 324.4,125.7 344.0,120.9 363.6,114.0 383.2,109.0 402.8,106.3 422.4,103.0 442.0,96.4 461.6,95.8 481.2,97.0 500.8,93.1 520.4,88.9 540.0,84.4"/>
    <circle class="dot-1" cx="540.0" cy="84.4" r="3.3"/>
    <text class="direct-label" x="546" y="87">Cumulative lift</text>
  </svg>
  <figcaption>Top: observed DAU pulls slightly above the model's predicted counterfactual after launch, but the credible interval band is wide relative to the gap. Bottom: the cumulative effect trends positive, but the 95% credible interval widens with every week out from launch and drifts back down to touch zero — meaning we can't rule out "no effect at all."</figcaption>
</figure>

<hr>

## The Honest Take: It's Not Magic

Here's the part I made sure got said out loud in class, because it's the part people skip when they cite this package: **the results were not great, and it was often genuinely hard to get anything statistically significant out of it.**

A few reasons why, in my experience:

- **The counterfactual is only as good as your synthetic control.** Australia being untouched by the campaign was certain; Australia behaving like the US market was a judgment call based on business acumen, not a validated fact. A comparison market that's subtly different in the wrong way quietly biases the whole synthetic control, and everything built on top of it.
- **DAU is noisy, and marketing lifts are often small relative to that noise.** A few percentage points of lift can be real and still sit inside a credible interval that touches zero.
- **The model is doing a lot of work with a short post-period.** Right after launch, you simply don't have much data to distinguish "real effect" from "this week was unusual anyway."
- **Everything else that's happening at the same time doesn't stop.** Other campaigns, product changes, competitor moves — BSTS assumes your control series absorbs all of that. It doesn't, fully.

In the Zynga case specifically, the credible interval on the cumulative effect kept widening the further out from launch I looked, and by the end of the post-period it had drifted back down to touch zero — the band in that last chart above isn't exaggerated for effect, that's roughly the shape of what I actually got back. Statistically, I could not say with confidence that the campaign moved DAU at all.

But here's the thing: that wasn't a failure of the method, it was the honest ceiling of what was answerable. There was no attribution tracking, no holdout, no randomization — a wide credible interval was the *correct* amount of uncertainty to have, not a sign I did it wrong. Given what we actually had to work with, "here's our best estimate, and here's how much you should trust it" was the best possible answer, and a far more defensible one than the confident-sounding, made-up-precision number marketing wanted to put in a slide.

## Why This Belongs in the Curriculum Anyway

Most of the flashy topics on that sign-up sheet assume you got to design the experiment. Product data science is full of moments where you don't: a brand campaign, a legal or policy-driven change, a one-time event, a competitor's move you have to react to after the fact. In those moments, knowing how to construct a defensible counterfactual — and being honest about how much uncertainty is still in it — matters more than knowing the newest model architecture.

Maybe next time it's on the sign-up sheet, someone will actually pick it.
