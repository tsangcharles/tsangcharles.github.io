---
layout: post
title: How does Gradient Descent work?
date: 2019-09-23
description: Math Behind Gradient Descent
tags: machine-learning optimization AI
categories: mathematics
giscus_comments: true
---

I first learned about gradient descent when I was in my "Calculus of Several Variables" course. I recall the Professor saying "a function F will decrease (locally) the quickiest along the direction of the gradient of F". It was not very clear how this was useful (possibly ever), but it proves to be a very useful practical result in computational mathematics. We shall visit this today.

Let us start off with the basics. Recall that for a function $$f:\mathbb{R}^n \to \mathbb{R}$$ is said to be differentiable at $$\vec{a}\in\mathbb{R}^n$$ if there exists a linear transformation $$T:\mathbb{R}^n \to \mathbb{R}$$ such that

$$ \lim_{\vec{h}\to \vec{0}} \frac{|f\left(\vec{a}+\vec{h}\right) - f\left(\vec{a}\right) - T\left(\vec{a}\right)\vec{h}|}{|\vec{h}|} = 0$$

The linear transformation $$T$$ is often called the derivative of $$f$$ and is denoted as $$Df$$. Since $$f$$ is a scalar-valued function, the derivative can also be called the gradient and is denoted as $$\nabla f$$.

Given the function $$f$$ is diffrentiable at a point $$a$$, we can also define the directional derivative of the function $$f$$ at a point $$\vec{a}$$ in the direction of a unit vector $$\vec{u}$$ to be 

$$\frac{\partial f}{\partial \vec{u}}\left(a\right) = \lim_{h \to 0} \frac{f\left(\vec{a}+h\vec{u}\right)-f\left(\vec{a}\right)} {h} $$

One can easily show that this is equivalent to the matrix product or dot product $$\nabla f\left(\vec{a}\right)\cdot \vec{u}$$. 

**The interpretation of directional derivative is important.** The meaning of a directional derivative of a function $$f$$ at $$\vec{a}$$ in the direction of $$\vec{u}$$ tells us the rate of change of a function $$f$$ at specific direction $$\vec{u}$$. The idea of gradient descent is to determine at which direction does function decrease the quickest. In other words, we want to minimize $$\frac{\partial f}{\partial \vec{u}}\left(a\right) = \nabla f\left(\vec{a}\right)\cdot \vec{u}$$. 

But by Cauchy Schwartz inequality
$$\frac{\partial f}{\partial \vec{u}}\left(a\right) = \nabla f\left(\vec{a}\right)\cdot \vec{u} \ge -|\nabla f\left(\vec{a}\right)| | \vec{u} |$$, and the equality for lower bound is achieved when $$\vec{u}$$ is in the same direction of $$\nabla f\left(\vec{a}\right)$$. Hence $$f$$ decreases the quickest at $$\vec{a}$$ along $$\nabla f\left(a\right)$$.

This means, if we start off at a point $$\vec{a_0}$$, we want to find a direction $$\vec{u_0}=\nabla f\left(\vec{a_0}\right)$$ where if we travel along the direction $$\vec{u_0}$$, we can arrive to $$\vec{a_1} = \vec{a_0} + \vec{u_0}$$ where $$f\left(\vec{a_1}\right) < f\left(\vec{a_0}\right)$$ and iteratively $$f\left(\vec{a_n}\right) < \dots < f\left(\vec{a_0}\right)$$ 

This is a very useful result in applied mathematics. It is often the case we need to find the minimum (or maximum) of a function, then in that case, we would first pick an arbitrary initial point and iteratively travel along the path of the gradient (negative of gradient) to minimize (or maxmize) objective function.