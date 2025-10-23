---
layout: page
title: Central Limit Theorem
description: Interactive simulation demonstrating the Central Limit Theorem
importance: 1
img: /assets/img/clt/preview.svg
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
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.controls {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.control-group {
    margin-bottom: 15px;
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
    width: 300px;
}

.slider-value {
    display: inline-block;
    margin-left: 10px;
    font-weight: bold;
    color: #0066cc;
}

.button-group {
    margin-top: 20px;
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
    background-color: #2196F3;
    color: white;
}

.btn-primary:hover {
    background-color: #1976D2;
}

.btn-secondary {
    background-color: #9C27B0;
    color: white;
}

.btn-secondary:hover {
    background-color: #7B1FA2;
}

.btn-animate {
    background-color: #9C27B0;
    color: white;
}

.btn-animate:hover {
    background-color: #7B1FA2;
}

.visualization {
    margin-top: 30px;
}

.chart-container {
    margin-bottom: 30px;
    background: white;
    padding: 20px;
    border-radius: 8px;
}

.chart-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}

.stats-display {
    background: #e9ecef;
    padding: 15px;
    border-radius: 8px;
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
    color: #0066cc;
    font-family: monospace;
}

canvas {
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>

<div class="clt-container">
    <div class="controls">
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
    </div>

    <div class="visualization">
        <div class="chart-container">
            <div class="chart-title">Parent Population Distribution</div>
            <canvas id="populationChart" width="800" height="300"></canvas>
        </div>

        <div class="chart-container">
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
        
        this.initializeControls();
        this.drawPopulation();
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
                return Math.random() * 10;
            case 'normal':
                return this.boxMuller() * 2 + 5;
            case 'exponential':
                return -Math.log(Math.random()) * 2;
            case 'bimodal':
                return Math.random() < 0.5 ? 
                    this.boxMuller() * 1.5 + 2 : 
                    this.boxMuller() * 1.5 + 8;
            case 'skewed':
                return Math.pow(Math.random(), 2) * 10;
            default:
                return Math.random() * 10;
        }
    }

    // Box-Muller transform for normal distribution
    boxMuller() {
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    drawPopulation() {
        const dist = document.getElementById('distribution').value;
        const canvas = document.getElementById('populationChart');
        const ctx = canvas.getContext('2d');
        
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

        // Draw histogram
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const maxCount = Math.max(...histogram);
        const barWidth = canvas.width / bins;

        ctx.fillStyle = '#4CAF50';
        histogram.forEach((count, i) => {
            const barHeight = (count / maxCount) * (canvas.height - 40);
            ctx.fillRect(i * barWidth, canvas.height - barHeight - 20, barWidth - 1, barHeight);
        });

        // Draw axis labels
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        for (let i = 0; i <= 10; i += 2) {
            const x = (i / 10) * canvas.width;
            ctx.fillText(i.toString(), x, canvas.height - 5);
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

        // Draw histogram
        const maxCount = Math.max(...histogram);
        const barWidth = canvas.width / bins;

        ctx.fillStyle = '#2196F3';
        histogram.forEach((count, i) => {
            const barHeight = (count / maxCount) * (canvas.height - 40);
            ctx.fillRect(i * barWidth, canvas.height - barHeight - 20, barWidth - 1, barHeight);
        });

        // Overlay normal curve
        if (this.sampleMeans.length > 10) {
            const meanOfMeans = this.sampleMeans.reduce((a, b) => a + b, 0) / this.sampleMeans.length;
            const variance = this.sampleMeans.reduce((a, b) => a + Math.pow(b - meanOfMeans, 2), 0) / this.sampleMeans.length;
            const sdOfMeans = Math.sqrt(variance);

            ctx.strokeStyle = '#FF5722';
            ctx.lineWidth = 3;
            ctx.beginPath();

            for (let x = 0; x < canvas.width; x++) {
                const value = (x / canvas.width) * (max - min) + min;
                const normalValue = (1 / (sdOfMeans * Math.sqrt(2 * Math.PI))) * 
                    Math.exp(-0.5 * Math.pow((value - meanOfMeans) / sdOfMeans, 2));
                const y = canvas.height - 20 - (normalValue * this.sampleMeans.length * binWidth) * (canvas.height - 40) / maxCount;
                
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        // Draw axis labels
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        for (let i = 0; i <= 10; i += 2) {
            const x = (i / 10) * canvas.width;
            ctx.fillText(i.toString(), x, canvas.height - 5);
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

