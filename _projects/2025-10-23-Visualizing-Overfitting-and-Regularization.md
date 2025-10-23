---
layout: page
title: Visualizing Overfitting and Regularization in Machine Learning
description: Interactive demo on Overfitting and Regularization
importance: 3
img: /assets/img/2.jpg
category: machine-learning
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.min.js"></script>

<style>
.overfit-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
    font-family: Arial, sans-serif
;
    text-align: center;
}

.controls {
    background: white;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 16px;
    display: inline-block;
    text-align: left;
}

.control-group {
    margin-bottom: 12px;
}

.control-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
}

.controls input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 16px;
    background: transparent;
    outline: none;
    width: 260px;
}

.controls input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #74b9ff;
    border: 2px solid #74b9ff;
    box-shadow: none;
    cursor: pointer;
    margin-top: -6px;
}

.controls input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #74b9ff;
    border: 2px solid #74b9ff;
    box-shadow: none;
    cursor: pointer;
}

.controls input[type="range"]::-webkit-slider-runnable-track {
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
}

.controls input[type="range"]::-moz-range-track {
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
}

.slider-value {
    display: inline-block;
    margin-left: 10px;
    font-weight: bold;
    color: #636e72;
}

.btn {
    padding: 10px 20px;
    margin-right: 10px;
    margin-top: 8px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-secondary {
    background-color: #a29bfe;
    color: white;
}

.btn-secondary:hover {
    background-color: #6c5ce7;
}

.stats-display {
    margin-top: 10px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 4px;
    display: inline-block;
    text-align: left;
}

.stat-item {
    display: inline-block;
    margin-right: 20px;
}

.stat-label {
    font-weight: bold;
    color: #555;
}

.stat-value {
    color: #636e72;
    font-family: monospace;
}

canvas {
    border: 1px solid #ddd;
    border-radius: 4px;
    display: block;
    margin: 0 auto;
    background: #fff; /* ensure white background in dark mode */
}
</style>

<div class="overfit-container">
    <div class="controls" id="overfit-controls"></div>
    <canvas id="overfit-canvas" width="800" height="400" style="width: 100%; height: auto;"></canvas>
    <div class="stats-display">
        <div class="stat-item">
            <span class="stat-label">Train Error:</span>
            <span class="stat-value" id="trainErr">—</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Test Error:</span>
            <span class="stat-value" id="testErr">—</span>
        </div>
    </div>
</div>

<script>
class OverfitDemo {
    constructor() {
        this.degree = 1;
        this.lambda = 0;
        this.data = this.generateData();
        this.testData = this.generateData(30, true);
        this.initUI();
        this.draw();
    }

    generateData(n = 30, test = false) {
        // Generate noisy data with some non-linear pattern but not too regular
        const data = [];
        for (let i = 0; i < n; i++) {
            const x = Math.random() * 10 - 5;
            // More irregular pattern with multiple components
            const noise = (test ? 1.5 : 2.0) * (Math.random() - 0.5);
            const y = 2 + 0.3 * Math.sin(x) + 0.2 * x + 0.1 * Math.cos(2 * x) + noise;
            data.push({ x, y });
        }
        return data;
    }

    initUI() {
        // Controls
        const controls = document.getElementById('overfit-controls');
        controls.innerHTML = `
            <div class="control-group">
                <label>Model Complexity (Degree): <span class="slider-value" id="degreeValue">1</span></label>
                <input type="range" min="1" max="20" value="1" id="degreeSlider">
            </div>
            <div class="control-group">
                <label>Regularization (λ): <span class="slider-value" id="lambdaValue">0.00</span></label>
                <input type="range" min="0" max="10" step="0.01" value="0" id="lambdaSlider">
            </div>
            <button class="btn btn-secondary" id="resetBtn">Reset Data</button>
        `;
        document.getElementById('degreeSlider').addEventListener('input', e => {
            this.degree = parseInt(e.target.value);
            document.getElementById('degreeValue').textContent = this.degree;
            this.draw();
        });
        document.getElementById('lambdaSlider').addEventListener('input', e => {
            this.lambda = parseFloat(e.target.value);
            document.getElementById('lambdaValue').textContent = this.lambda.toFixed(2);
            this.draw();
        });
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.data = this.generateData();
            this.testData = this.generateData(30, true);
            this.draw();
        });
    }

    fitPolynomial(data, degree, lambda) {
        // Fit polynomial regression with L2 regularization (Ridge)
        // Returns coefficients [a0, a1, ..., an]
        const X = data.map(d => {
            const row = [];
            for (let i = 0; i <= degree; i++) row.push(Math.pow(d.x, i));
            return row;
        });
        const y = data.map(d => [d.y]);
        // X^T X + λI
        const XT = math.transpose(X);
        let XT_X = math.multiply(XT, X);
        for (let i = 0; i < XT_X.length; i++) XT_X[i][i] += lambda;
        const XT_y = math.multiply(XT, y);
        // Solve (XT_X) * coef = XT_y
        const coef = math.lusolve(XT_X, XT_y).map(a => a[0]);
        return coef;
    }

    predict(x, coef) {
        return coef.reduce((sum, a, i) => sum + a * Math.pow(x, i), 0);
    }

    calcError(data, coef) {
        return Math.sqrt(data.reduce((sum, d) => sum + Math.pow(this.predict(d.x, coef) - d.y, 2), 0) / data.length);
    }

    draw() {
        const canvas = document.getElementById('overfit-canvas');
        const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // White background to ensure readability in dark mode
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
        // Dynamic layout and scales
        const pad = { top: 30, right: 24, bottom: 44, left: 54 };
        const plotWidth = canvas.width - pad.left - pad.right;
        const plotHeight = canvas.height - pad.top - pad.bottom;
        const xMin = -5, xMax = 5;

        // Fit once to get curve and for y-range
        const coef = this.fitPolynomial(this.data, this.degree, this.lambda);

        // Determine y-range from data, test, and fitted curve
        let yMin = Infinity, yMax = -Infinity;
        const upd = (y) => { if (y < yMin) yMin = y; if (y > yMax) yMax = y; };
        this.data.forEach(d => upd(d.y));
        this.testData.forEach(d => upd(d.y));
        for (let i = 0; i <= 400; i++) {
            const xv = xMin + (i / 400) * (xMax - xMin);
            upd(this.predict(xv, coef));
        }
        const span = (yMax - yMin) || 1;
        yMin -= 0.1 * span;
        yMax += 0.1 * span;

        const toX = (x) => pad.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
        const toY = (y) => pad.top + (yMax - y) / (yMax - yMin) * plotHeight;

        // Axes
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // y-axis
        ctx.moveTo(pad.left + 0.5, pad.top);
        ctx.lineTo(pad.left + 0.5, pad.top + plotHeight);
        // x-axis
        ctx.moveTo(pad.left, pad.top + plotHeight + 0.5);
        ctx.lineTo(pad.left + plotWidth, pad.top + plotHeight + 0.5);
        ctx.stroke();

        // x ticks
        ctx.fillStyle = '#555';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        for (let xv = -5; xv <= 5; xv += 2.5) {
            const x = toX(xv);
            ctx.beginPath();
            ctx.moveTo(x, pad.top + plotHeight);
            ctx.lineTo(x, pad.top + plotHeight + 6);
            ctx.stroke();
            ctx.fillText(xv.toString(), x, pad.top + plotHeight + 20);
        }
        // Train data points (blue circles)
        ctx.fillStyle = '#2980b9';
        this.data.forEach(d => {
            const x = toX(d.x);
            const y = toY(d.y);
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
        // Test data points (red X markers)
        this.testData.forEach(d => {
            const x = toX(d.x);
            const y = toY(d.y);
            ctx.strokeStyle = '#e74c3c';
            ctx.lineWidth = 2;
            const size = 5;
            ctx.beginPath();
            ctx.moveTo(x - size, y - size);
            ctx.lineTo(x + size, y + size);
            ctx.moveTo(x + size, y - size);
            ctx.lineTo(x - size, y + size);
            ctx.stroke();
        });
        // Fit curve (plot across full width)
        ctx.strokeStyle = '#e67e22';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i <= plotWidth; i++) {
            const xv = xMin + (i / plotWidth) * (xMax - xMin);
            const yv = this.predict(xv, coef);
            const x = toX(xv);
            const y = toY(yv);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        // Errors
        const trainErr = this.calcError(this.data, coef);
        const testErr = this.calcError(this.testData, coef);
        document.getElementById('trainErr').textContent = trainErr.toFixed(3);
        document.getElementById('testErr').textContent = testErr.toFixed(3);
    // Legend with background for readability
    const legendHeight = 24;
    const legendWidth = Math.min(plotWidth - 12, 330);
    const legendX = pad.left + 6;
    const legendY = pad.top - (legendHeight + 6);

    // Background for legend (no border)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.rect(legendX, legendY, legendWidth, legendHeight);
    ctx.fill();

    // Legend items
    ctx.font = '12px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    let cursorX = legendX + 8;
    const yMid = legendY + legendHeight / 2;

    // Train dot + text
    ctx.fillStyle = '#2980b9';
    ctx.beginPath();
    ctx.arc(cursorX, yMid, 5, 0, 2 * Math.PI);
    ctx.fill();
    cursorX += 12;
    ctx.fillStyle = '#000';
    ctx.fillText('Train Data', cursorX, yMid);
    cursorX += ctx.measureText('Train Data').width + 18;

    // Test X + text
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cursorX - 6, yMid - 6);
    ctx.lineTo(cursorX + 6, yMid + 6);
    ctx.moveTo(cursorX + 6, yMid - 6);
    ctx.lineTo(cursorX - 6, yMid + 6);
    ctx.stroke();
    cursorX += 18;
    ctx.fillStyle = '#000';
    ctx.fillText('Test Data', cursorX, yMid);
    cursorX += ctx.measureText('Test Data').width + 18;

    // Model line + text
    ctx.strokeStyle = '#e67e22';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cursorX - 6, yMid);
    ctx.lineTo(cursorX + 12, yMid);
    ctx.stroke();
    cursorX += 18;
    ctx.fillStyle = '#000';
    ctx.fillText('Model Fit', cursorX, yMid);
    }
}

// Initialize simulation when page loads
document.addEventListener('DOMContentLoaded', () => {
    new OverfitDemo();
});
</script>

---

## How to Use

- Adjust <b>Model Complexity</b> to see how higher-degree polynomials fit the data (and noise)
- Increase <b>Regularization</b> to smooth the fit and reduce overfitting
- Click <b>Reset Data</b> to randomize the dataset
- Watch train/test errors update live

## What You're Seeing

- **Blue circles**: Training data points (what the model learns from)
- **Red X markers**: Test data points (unseen data used to evaluate generalization)
- **Orange curve**: Model fit curve
- **Train/Test Error**: Root mean squared error for each set

## Key Observations

- High complexity fits noise (overfitting: low train error, high test error)
- Regularization smooths the fit, reducing overfitting
- Underfitting occurs at low complexity (high errors)
- The best fit balances bias and variance

Try different settings and see the bias-variance tradeoff in action!