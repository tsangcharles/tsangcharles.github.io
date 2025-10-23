---
layout: page
title: Central Limit Theorem
description: Interactive simulation demonstrating the Central Limit Theorem
importance: 1
img: /assets/img/clt/preview.png
category: data-science
---

The Central Limit Theorem is one of the most fundamental concepts in statistics. 
Formally, if $X_1,\dots,X_n$ are i.i.d. with $\mathbb{E}[X_i]=\mu$ and $\operatorname{Var}(X_i)=\sigma^2<\infty$, then
$$
\frac{\sum_{i=1}^n X_i - n\mu}{\sigma\sqrt{n}} \xrightarrow{d} \mathcal{N}(0,1),
$$
equivalently,
$$
\sqrt{n}\,\frac{\bar X_n - \mu}{\sigma} \xrightarrow{d} \mathcal{N}(0,1),
$$
where $\bar X_n = \tfrac{1}{n}\sum_{i=1}^n X_i$.
 The proof is elegant and surprisingly straightforward. At a high level, you compute the characteristic function of the normalized sample mean and show that the higher-order terms in its Taylor expansion vanish as $n$ grows, so it converges to the characteristic function of a standard normal.

 In practice, the CLT says that the distribution of sample means becomes approximately normal as the sample size increases, regardless of the shape of the underlying population (assuming finite variance).

 As a student, I struggled to build intuition for the CLT. An interactive demo I once used finally made it click, so I recreated a version here. 

<style>
.clt-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px;
    font-family: Arial, sans-serif;
    overflow-x: hidden; /* prevent accidental horizontal scroll on small screens */
}

/* Responsive layout wrapper */
.clt-grid {
    display: flex;
    flex-direction: column; /* mobile-first: stacked */
    gap: 16px;
}

.controls {
    background: white;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 16px;
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

.control-group select,
.control-group input[type="number"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 200px;
}

.control-group input[type="range"] {
    width: 260px;
}

/* Flat slider styling */
.controls input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 16px; /* match thumb height so it centers */
    background: transparent; /* track draws background */
    outline: none;
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
    margin-top: -6px; /* center over 4px track ( (16-4)/2 ) */
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

.button-group {
    margin-top: 12px;
}

.btn {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-primary {
    background-color: #636e72;
    color: white;
}

.btn-primary:hover { background-color: #4a5256; }

.btn-secondary {
    background-color: #a29bfe;
    color: white;
}

.btn-secondary:hover { background-color: #a29bfe; }

.btn-animate {
    background-color: #a29bfe;
    color: white;
}

.btn-animate:hover { background-color: #a29bfe; }

.visualization {
    margin-top: 16px;
}

.chart-container {
    margin-bottom: 8px;
    background: white;
    padding: 12px;
    border-radius: 8px;
}

.chart-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
    margin-top: 0;
}

.stats-display {
    background: transparent;
    padding: 12px 0;
    border-radius: 0;
    margin-top: 20px;
}

.stat-item {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 10px;
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
    width: 100%; /* make canvas fit container width on mobile */
    height: auto;
}

/* Desktop layout: left controls, right charts stacked (parent on top, sampling bottom) */
@media (min-width: 992px) {
    .clt-grid {
        display: grid;
        grid-template-columns: 300px 1fr;
        grid-template-rows: auto auto;
        gap: 16px;
        align-items: center;
    }
    .clt-controls { /* alias when the controls sit in grid */
        grid-column: 1;
        grid-row: 1 / span 2; /* sidebar height spans both rows */
        margin-bottom: 0;
    }
    .clt-parent {
        grid-column: 2;
        grid-row: 1;
    }
    .clt-sampling {
        grid-column: 2;
        grid-row: 2;
    }
    .chart-container canvas {
        max-height: 200px;
    }
    .chart-container {
        margin-bottom: 8px;
    }
    .controls {
        margin-bottom: 0;
    }
}
</style>

<div class="clt-container">
    <div class="clt-grid">
    <aside class="controls clt-controls">
        <div class="control-group">
            <label for="distribution">Parent Population Distribution:</label>
            <select id="distribution">
                <option value="uniform">Uniform</option>
                <option value="normal">Normal</option>
                <option value="exponential">Exponential</option>
                <option value="bimodal">Bimodal</option>
                <option value="skewed">Right Skewed</option>
            </select>
        </div>

        <div class="control-group">
            <label for="sampleSize">Sample Size (N): <span class="slider-value" id="sampleSizeValue">5</span></label>
            <input type="range" id="sampleSize" min="2" max="50" value="5" step="1">
        </div>

        <div class="control-group">
            <label>Number of Samples: <span class="slider-value" id="numSamplesValue">0</span></label>
        </div>

        <div class="button-group">
            <button class="btn btn-primary" id="sample1">Draw Sample of 1</button>
            <button class="btn btn-primary" id="sample5">Draw Sample of 5</button>
            <button class="btn btn-primary" id="sample1000">Draw 1000 Samples</button>
        </div>
        
        <div class="button-group">
            <button class="btn btn-animate" id="animate">Animate</button>
            <button class="btn btn-secondary" id="reset">Reset</button>
        </div>
    </aside>

    <div class="visualization clt-visuals">
        <section class="chart-container clt-parent" id="parent-container">
            <div class="chart-title">Parent Population Distribution</div>
            <canvas id="populationChart" width="800" height="300"></canvas>
        </section>

        <section class="chart-container clt-sampling" id="sampling-container">
            <div class="chart-title">Distribution of Sample Means</div>
            <canvas id="samplingChart" width="800" height="300"></canvas>
            <div class="stats-display">
                <div class="stat-item">
                    <span class="stat-label">Mean of Means:</span>
                    <span class="stat-value" id="meanOfMeans">—</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">SD of Means:</span>
                    <span class="stat-value" id="sdOfMeans">—</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Expected SD (σ/√n):</span>
                    <span class="stat-value" id="expectedSD">—</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Samples Drawn:</span>
                    <span class="stat-value" id="samplesDrawn">0</span>
                </div>
            </div>
        </section>
    </div>
    </div>
</div>

<script>
class CLTSimulation {
    constructor() {
        this.sampleMeans = [];
        this.populationMean = 0;
        this.populationSD = 1;
        this.animationId = null;
        this.seed = 12345; // Fixed seed for reproducibility
        
        this.initializeControls();
        this.setupResize();
        this.drawPopulation();
    }

    // Seeded random number generator (Mulberry32)
    seededRandom() {
        this.seed = (this.seed + 0x6D2B79F5) | 0;
        let t = Math.imul(this.seed ^ (this.seed >>> 15), 1 | this.seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    // Reset seed to initial value
    resetSeed() {
        this.seed = 12345;
    }

    initializeControls() {
        // Slider updates
        document.getElementById('sampleSize').addEventListener('input', (e) => {
            document.getElementById('sampleSizeValue').textContent = e.target.value;
            this.updateExpectedSD();
        });

        document.getElementById('distribution').addEventListener('change', () => {
            this.reset();
            this.drawPopulation();
        });

        // Button handlers
        document.getElementById('sample1').addEventListener('click', () => this.drawSamples(1));
        document.getElementById('sample5').addEventListener('click', () => this.drawSamples(5));
        document.getElementById('sample1000').addEventListener('click', () => this.drawSamples(1000));
        document.getElementById('reset').addEventListener('click', () => this.reset());
        document.getElementById('animate').addEventListener('click', () => this.toggleAnimation());
    }

    setupResize() {
        const doResize = () => {
            this.resizeCanvases();
            // Re-draw with current state
            this.drawPopulation();
            this.drawSamplingDistribution();
            this.updateStats();
        };
        // Initial sizing
        this.resizeCanvases();
        // Debounced window resize
        window.addEventListener('resize', this.debounce(doResize, 150));
    }

    resizeCanvases() {
        const popCanvas = document.getElementById('populationChart');
        const sampCanvas = document.getElementById('samplingChart');
        [popCanvas, sampCanvas].forEach((canvas) => {
            if (!canvas) return;
            const container = canvas.parentElement;
            const width = Math.max(260, Math.floor(container.clientWidth));
            const height = window.innerWidth >= 992 ? 180 : 220; // much shorter on desktop
            canvas.style.width = '100%';
            canvas.style.height = height + 'px';
            canvas.width = width;
            canvas.height = height;
        });
    }

    debounce(fn, wait) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    toggleAnimation() {
        if (this.animationId) {
            clearInterval(this.animationId);
            this.animationId = null;
            document.getElementById('animate').textContent = 'Animate';
        } else {
            this.animationId = setInterval(() => {
                this.drawSamples(10);
            }, 100);
            document.getElementById('animate').textContent = 'Stop';
        }
    }

    reset() {
        this.sampleMeans = [];
        this.resetSeed(); // Reset seed for reproducibility
        if (this.animationId) {
            clearInterval(this.animationId);
            this.animationId = null;
            document.getElementById('animate').textContent = 'Animate';
        }
        document.getElementById('numSamplesValue').textContent = '0';
        this.drawPopulation();
        this.drawSamplingDistribution();
        this.updateStats();
    }

    // Generate random values from different distributions
    generateValue(dist) {
        switch(dist) {
            case 'uniform':
                return this.seededRandom() * 10;
            case 'normal':
                return this.boxMuller() * 2 + 5;
            case 'exponential':
                return -Math.log(this.seededRandom()) * 2;
            case 'bimodal':
                return this.seededRandom() < 0.5 ? 
                    this.boxMuller() * 1.5 + 2 : 
                    this.boxMuller() * 1.5 + 8;
            case 'skewed':
                return Math.pow(this.seededRandom(), 2) * 10;
            default:
                return this.seededRandom() * 10;
        }
    }

    // Box-Muller transform for normal distribution
    boxMuller() {
        let u = 0, v = 0;
        while(u === 0) u = this.seededRandom();
        while(v === 0) v = this.seededRandom();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    drawPopulation() {
        const dist = document.getElementById('distribution').value;
        const canvas = document.getElementById('populationChart');
        const ctx = canvas.getContext('2d');
        const pad = { top: 20, right: 20, bottom: 26, left: 40 };
        
        // Generate population data
        const data = [];
        for (let i = 0; i < 10000; i++) {
            data.push(this.generateValue(dist));
        }

        // Calculate population statistics
        this.populationMean = data.reduce((a, b) => a + b, 0) / data.length;
        const variance = data.reduce((a, b) => a + Math.pow(b - this.populationMean, 2), 0) / data.length;
        this.populationSD = Math.sqrt(variance);

        // Create histogram
        const bins = 50;
        const histogram = new Array(bins).fill(0);
        const min = 0;
        const max = 10;
        const binWidth = (max - min) / bins;

        data.forEach(value => {
            const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
            if (binIndex >= 0) histogram[binIndex]++;
        });

        // Draw histogram with padding
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const maxCount = Math.max(...histogram) || 1;
        const plotWidth = canvas.width - pad.left - pad.right;
        const plotHeight = canvas.height - pad.top - pad.bottom;
        const barWidth = plotWidth / bins;

    ctx.fillStyle = '#636e72';
        histogram.forEach((count, i) => {
            const barHeight = (count / maxCount) * plotHeight;
            const x = pad.left + i * barWidth;
            const y = canvas.height - pad.bottom - barHeight;
            ctx.fillRect(x, y, Math.max(1, barWidth - 1), barHeight);
        });

        // Axis baseline
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad.left, canvas.height - pad.bottom + 0.5);
        ctx.lineTo(canvas.width - pad.right, canvas.height - pad.bottom + 0.5);
        ctx.stroke();

        // Draw axis labels (0 .. 10)
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        for (let i = 0; i <= 10; i += 2) {
            const x = pad.left + (i / 10) * plotWidth;
            ctx.fillText(i.toString(), x, canvas.height - 6);
        }

        this.updateExpectedSD();
    }

    drawSamples(count) {
        const dist = document.getElementById('distribution').value;
        const sampleSize = parseInt(document.getElementById('sampleSize').value);

        for (let i = 0; i < count; i++) {
            const sample = [];
            for (let j = 0; j < sampleSize; j++) {
                sample.push(this.generateValue(dist));
            }
            const mean = sample.reduce((a, b) => a + b, 0) / sample.length;
            this.sampleMeans.push(mean);
        }

        document.getElementById('numSamplesValue').textContent = this.sampleMeans.length;

        this.drawSamplingDistribution();
        this.updateStats();
    }

    drawSamplingDistribution() {
        const canvas = document.getElementById('samplingChart');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (this.sampleMeans.length === 0) return;

        // Create histogram
        const bins = 50;
        const histogram = new Array(bins).fill(0);
        const min = 0;
        const max = 10;
        const binWidth = (max - min) / bins;

        this.sampleMeans.forEach(mean => {
            const binIndex = Math.min(Math.floor((mean - min) / binWidth), bins - 1);
            if (binIndex >= 0) histogram[binIndex]++;
        });

        // Draw histogram with padding
        const maxCount = Math.max(...histogram) || 1;
        const pad = { top: 20, right: 20, bottom: 26, left: 40 };
        const plotWidth = canvas.width - pad.left - pad.right;
        const plotHeight = canvas.height - pad.top - pad.bottom;
        const barWidth = plotWidth / bins;

    ctx.fillStyle = '#74b9ff';
        histogram.forEach((count, i) => {
            const barHeight = (count / maxCount) * plotHeight;
            const x = pad.left + i * barWidth;
            const y = canvas.height - pad.bottom - barHeight;
            ctx.fillRect(x, y, Math.max(1, barWidth - 1), barHeight);
        });

        // Overlay normal curve
        if (this.sampleMeans.length > 10) {
            const meanOfMeans = this.sampleMeans.reduce((a, b) => a + b, 0) / this.sampleMeans.length;
            const variance = this.sampleMeans.reduce((a, b) => a + Math.pow(b - meanOfMeans, 2), 0) / this.sampleMeans.length;
            const sdOfMeans = Math.sqrt(variance);

            ctx.strokeStyle = '#FF5722';
            ctx.lineWidth = 3;
            ctx.beginPath();

            for (let px = 0; px <= plotWidth; px++) {
                const value = (px / plotWidth) * (max - min) + min;
                const normalValue = (1 / (sdOfMeans * Math.sqrt(2 * Math.PI))) * 
                    Math.exp(-0.5 * Math.pow((value - meanOfMeans) / sdOfMeans, 2));
                const yVal = (normalValue * this.sampleMeans.length * binWidth) * (plotHeight) / maxCount;
                const x = pad.left + px;
                const y = canvas.height - pad.bottom - yVal;
                if (px === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        // Axis baseline
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad.left, canvas.height - pad.bottom + 0.5);
        ctx.lineTo(canvas.width - pad.right, canvas.height - pad.bottom + 0.5);
        ctx.stroke();

        // Draw axis labels
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        for (let i = 0; i <= 10; i += 2) {
            const x = pad.left + (i / 10) * (canvas.width - pad.left - pad.right);
            ctx.fillText(i.toString(), x, canvas.height - 6);
        }
    }

    updateStats() {
        if (this.sampleMeans.length === 0) {
            document.getElementById('meanOfMeans').textContent = '—';
            document.getElementById('sdOfMeans').textContent = '—';
            document.getElementById('samplesDrawn').textContent = '0';
            return;
        }

        const meanOfMeans = this.sampleMeans.reduce((a, b) => a + b, 0) / this.sampleMeans.length;
        const variance = this.sampleMeans.reduce((a, b) => a + Math.pow(b - meanOfMeans, 2), 0) / this.sampleMeans.length;
        const sdOfMeans = Math.sqrt(variance);

        document.getElementById('meanOfMeans').textContent = meanOfMeans.toFixed(3);
        document.getElementById('sdOfMeans').textContent = sdOfMeans.toFixed(3);
        document.getElementById('samplesDrawn').textContent = this.sampleMeans.length;
    }

    updateExpectedSD() {
        const sampleSize = parseInt(document.getElementById('sampleSize').value);
        const expectedSD = this.populationSD / Math.sqrt(sampleSize);
        document.getElementById('expectedSD').textContent = expectedSD.toFixed(3);
    }
}

// Initialize simulation when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CLTSimulation();
});
</script>

## How to Use

1. **Select a Distribution**: Choose from Uniform, Normal, Exponential, Bimodal, or Right Skewed distributions
2. **Set Sample Size**: Adjust the slider to change how many values are in each sample (N)
3. **Draw Samples**: Click the buttons to draw 1, 5, or 1000 samples at a time
4. **Observe**: Watch as the distribution of sample means becomes increasingly normal, regardless of the parent distribution
5. **Animate**: Click "Animate" to continuously draw samples and watch the Central Limit Theorem in action!

## Key Observations

- **Shape**: No matter how skewed or unusual the parent distribution is, the sampling distribution of means approaches a normal distribution as you draw more samples
- **Center**: The mean of the sampling distribution approximates the population mean
- **Spread**: The standard deviation of the sampling distribution (Standard Error) equals σ/√n, where σ is the population standard deviation and n is the sample size

The red curve overlaid on the sampling distribution shows the theoretical normal distribution, which should match your empirical distribution more closely as you draw more samples!

