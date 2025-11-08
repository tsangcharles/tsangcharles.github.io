---
layout: post
title: How does Gradient Descent work?
date: 2019-09-23
description: Math Behind Gradient Descent
tags: optimization, mathematics
categories: theoretical
giscus_comments: false
---

I first learned about gradient descent when I was in my "Calculus of Several Variables" course. I recall the Professor saying "a function F will decrease (locally) the quickest along the direction of the gradient of F". It was not very clear how this was useful (possibly ever), but it proves to be a very useful practical result in computational mathematics. We shall visit this today.

Let us start off with the basics. Recall that for a function $$f:\mathbb{R}^n \to \mathbb{R}$$ is said to be differentiable at $$\vec{a}\in\mathbb{R}^n$$ if there exists a linear transformation $$T:\mathbb{R}^n \to \mathbb{R}$$ such that

$$ \lim\_{\vec{h}\to \vec{0}} \frac{|f\left(\vec{a}+\vec{h}\right) - f\left(\vec{a}\right) - T\left(\vec{a}\right)\vec{h}|}{|\vec{h}|} = 0$$

The linear transformation $$T$$ is often called the derivative of $$f$$ and is denoted as $$Df$$. Since $$f$$ is a scalar-valued function, the derivative can also be called the gradient and is denoted as $$\nabla f$$.

Given the function $$f$$ is differentiable at a point $$a$$, we can also define the directional derivative of the function $$f$$ at a point $$\vec{a}$$ in the direction of a unit vector $$\vec{u}$$ to be

$$\frac{\partial f}{\partial \vec{u}}\left(a\right) = \lim_{h \to 0} \frac{f\left(\vec{a}+h\vec{u}\right)-f\left(\vec{a}\right)} {h} $$

One can easily show that this is equivalent to the matrix product or dot product $$\nabla f\left(\vec{a}\right)\cdot \vec{u}$$.

**The interpretation of directional derivative is important.** The meaning of a directional derivative of a function $$f$$ at $$\vec{a}$$ in the direction of $$\vec{u}$$ tells us the rate of change of a function $$f$$ at specific direction $$\vec{u}$$. The idea of gradient descent is to determine at which direction does function decrease the quickest. In other words, we want to minimize $$\frac{\partial f}{\partial \vec{u}}\left(a\right) = \nabla f\left(\vec{a}\right)\cdot \vec{u}$$.

But by the Cauchy–Schwarz inequality
$$\frac{\partial f}{\partial \vec{u}}\left(a\right) = \nabla f\left(\vec{a}\right)\cdot \vec{u} \ge -|\nabla f\left(\vec{a}\right)| | \vec{u} |$$, and the equality for lower bound is achieved when $$\vec{u}$$ is in the same direction of $$\nabla f\left(\vec{a}\right)$$. Hence $$f$$ decreases the quickest at $$\vec{a}$$ along $$\nabla f\left(a\right)$$.

This means, if we start off at a point $$\vec{a_0}$$, we want to find a direction $$\vec{u_0}=\nabla f\left(\vec{a_0}\right)$$ where if we travel along the direction $$\vec{u_0}$$, we can arrive to $$\vec{a_1} = \vec{a_0} + \vec{u_0}$$ where $$f\left(\vec{a_1}\right) < f\left(\vec{a_0}\right)$$ and iteratively $$f\left(\vec{a_n}\right) < \dots < f\left(\vec{a_0}\right)$$

This is a very useful result in applied mathematics. It is often the case we need to find the minimum (or maximum) of a function, then in that case, we would first pick an arbitrary initial point and iteratively travel along the path of the gradient (negative of gradient) to minimize (or maximize) objective function.

## Interactive Gradient Descent Visualization

Below is an interactive animation showing gradient descent finding a local minimum on a 2D surface:

<div style="text-align: center; margin: 20px 0;">
  <canvas id="gradientCanvas" width="500" height="400" style="border: 2px solid #ddd; background: #f9f9f9; border-radius: 4px;"></canvas>
</div>

<div style="text-align: center; margin: 15px 0; font-family: monospace; font-size: 13px; color: #333;">
  <div><strong>Iteration:</strong> <span id="iterCount">0</span> | <strong>Function Value:</strong> <span id="funcValue">0.9050</span> | <strong>Position:</strong> x=<span id="posX">0.050</span>, y=<span id="posY">0.950</span> | <strong>Gradient:</strong> <span id="gradMag">0.000</span></div>
</div>

<div style="text-align: center; margin: 15px 0;">
  <button id="startBtn" style="padding: 12px 28px; font-size: 14px; font-weight: 500; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px; transition: background 0.3s; margin-right: 8px;">Start Descent</button>
  <button id="resetBtn" style="padding: 12px 28px; font-size: 14px; font-weight: 500; cursor: pointer; background: #6c757d; color: white; border: none; border-radius: 4px; transition: background 0.3s;">Reset</button>
</div>

<p style="text-align: center; color: #666; font-size: 14px;">The red dot represents the current position. The contour lines show the function value. Watch as gradient descent converges to the minimum.</p>

<script>
const canvas = document.getElementById('gradientCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

// Function to minimize: (x-0.5)^2 + (y-0.5)^2 (paraboloid)
function f(x, y) {
  return Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2);
}

// Gradient of f
function grad(x, y) {
  return {
    dx: 2 * (x - 0.5),
    dy: 2 * (y - 0.5)
  };
}

// Convert world coordinates to canvas coordinates
function worldToCanvas(x, y) {
  return {
    cx: x * width,
    cy: height - y * height
  };
}

let x = 0.05, y = 0.95;
let isDescending = false;
let isPaused = false;
let trail = [];
let iteration = 0;
const learningRate = 0.05;
let frameCounter = 0;
const frameSkip = 10; // Skip 10 frames to slow down animation

function updateStats() {
  document.getElementById('iterCount').textContent = iteration;
  document.getElementById('funcValue').textContent = f(x, y).toFixed(4);
  document.getElementById('posX').textContent = x.toFixed(3);
  document.getElementById('posY').textContent = y.toFixed(3);
  const g = grad(x, y);
  const magnitude = Math.sqrt(g.dx * g.dx + g.dy * g.dy);
  document.getElementById('gradMag').textContent = magnitude.toFixed(4);
}

function drawFunction() {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  // Draw filled colored circles (contour levels) - purple to yellow gradient
  for (let level = 0.95; level >= 0.05; level -= 0.1) {
    // Color gradient from purple (high) to yellow (low)
    const hue = 60 + (1 - level) * 270; // 60 = yellow, 330 = purple
    ctx.fillStyle = `hsl(${hue}, 85%, 55%)`;
    ctx.globalAlpha = 0.2;
    
    const r = Math.sqrt(level) * width;
    const centerX = worldToCanvas(0.5, 0.5).cx;
    const centerY = worldToCanvas(0.5, 0.5).cy;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.globalAlpha = 1;
}

function drawTrail() {
  if (trail.length > 1) {
    ctx.strokeStyle = 'rgba(220, 53, 69, 0.6)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    const pt0 = worldToCanvas(trail[0].x, trail[0].y);
    ctx.moveTo(pt0.cx, pt0.cy);
    
    // Use quadratic curves for smooth path
    for (let i = 1; i < trail.length; i++) {
      const pt = worldToCanvas(trail[i].x, trail[i].y);
      if (i === 1) {
        ctx.lineTo(pt.cx, pt.cy);
      } else {
        const prevPt = worldToCanvas(trail[i - 1].x, trail[i - 1].y);
        ctx.quadraticCurveTo(prevPt.cx, prevPt.cy, pt.cx, pt.cy);
      }
    }
    ctx.stroke();
  }
}

function drawPoint() {
  const pt = worldToCanvas(x, y);
  ctx.fillStyle = '#dc3545';
  ctx.beginPath();
  ctx.arc(pt.cx, pt.cy, 6, 0, Math.PI * 2);
  ctx.fill();
}

function drawArrows() {
  if (trail.length < 2) return;
  
  // Draw arrows along the trail
  const arrowSpacing = 3; // Draw arrow every N points
  for (let i = arrowSpacing; i < trail.length; i += arrowSpacing) {
    const current = trail[i];
    const prev = trail[i - arrowSpacing];
    
    const pt = worldToCanvas(current.x, current.y);
    const prevPt = worldToCanvas(prev.x, prev.y);
    
    const dx = pt.cx - prevPt.cx;
    const dy = pt.cy - prevPt.cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 2) continue;
    
    const angle = Math.atan2(dy, dx);
    const arrowLength = 10;
    const arrowWidth = 8;
    
    // Arrow head point positioned on the line
    const arrowX = pt.cx - arrowLength * Math.cos(angle);
    const arrowY = pt.cy - arrowLength * Math.sin(angle);
    
    // Draw filled arrow head
    ctx.fillStyle = '#dc3545';
    ctx.beginPath();
    ctx.moveTo(pt.cx, pt.cy);
    ctx.lineTo(arrowX - arrowWidth * Math.sin(angle), arrowY + arrowWidth * Math.cos(angle));
    ctx.lineTo(arrowX + arrowWidth * Math.sin(angle), arrowY - arrowWidth * Math.cos(angle));
    ctx.closePath();
    ctx.fill();
    
    // Optional: draw outline for better visibility
    ctx.strokeStyle = 'rgba(220, 53, 69, 0.8)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function step() {
  if (!isDescending) return;
  
  const g = grad(x, y);
  const magnitude = Math.sqrt(g.dx * g.dx + g.dy * g.dy);
  
  if (magnitude > 0.01) {
    // Add momentum/smoothing for curved paths
    const momentum = 0.15;
    let dx = -learningRate * g.dx;
    let dy = -learningRate * g.dy;
    
    // Apply some inertia from previous direction
    if (trail.length > 1) {
      const prevStep = trail[trail.length - 1];
      const prevPrevStep = trail[trail.length - 2];
      const prevDx = prevStep.x - prevPrevStep.x;
      const prevDy = prevStep.y - prevPrevStep.y;
      
      dx = dx * (1 - momentum) + prevDx * momentum;
      dy = dy * (1 - momentum) + prevDy * momentum;
    }
    
    x += dx;
    y += dy;
    
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));
    
    trail.push({x, y});
    iteration++;
    updateStats();
  } else {
    isDescending = false;
  }
}

function animate() {
  drawFunction();
  drawTrail();
  drawArrows();
  drawPoint();
  
  if (isDescending) {
    frameCounter++;
    if (frameCounter >= frameSkip) {
      step();
      frameCounter = 0;
    }
  }
  
  requestAnimationFrame(animate);
}

document.getElementById('startBtn').addEventListener('click', () => {
  if (!isDescending && !isPaused) {
    // Start descent
    isDescending = true;
    document.getElementById('startBtn').textContent = 'Stop';
    document.getElementById('startBtn').style.background = '#dc3545';
  } else if (isDescending) {
    // Pause descent
    isDescending = false;
    isPaused = true;
    document.getElementById('startBtn').textContent = 'Resume';
    document.getElementById('startBtn').style.background = '#6c757d';
  } else if (isPaused) {
    // Resume descent
    isDescending = true;
    isPaused = false;
    document.getElementById('startBtn').textContent = 'Stop';
    document.getElementById('startBtn').style.background = '#dc3545';
  }
});

document.getElementById('startBtn').addEventListener('mouseover', () => {
  const btn = document.getElementById('startBtn');
  if (isDescending) {
    btn.style.background = '#c82333';
  } else if (isPaused) {
    btn.style.background = '#5a6268';
  } else {
    btn.style.background = '#0056b3';
  }
});

document.getElementById('startBtn').addEventListener('mouseout', () => {
  const btn = document.getElementById('startBtn');
  if (isDescending) {
    btn.style.background = '#dc3545';
  } else if (isPaused) {
    btn.style.background = '#6c757d';
  } else {
    btn.style.background = '#007bff';
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  isDescending = false;
  isPaused = false;
  x = 0.05;
  y = 0.95;
  trail = [];
  iteration = 0;
  updateStats();
  document.getElementById('startBtn').textContent = 'Start Descent';
  document.getElementById('startBtn').style.background = '#007bff';
});

document.getElementById('resetBtn').addEventListener('mouseover', () => {
  document.getElementById('resetBtn').style.background = '#5a6268';
});

document.getElementById('resetBtn').addEventListener('mouseout', () => {
  document.getElementById('resetBtn').style.background = '#6c757d';
});

updateStats();
animate();
</script>
