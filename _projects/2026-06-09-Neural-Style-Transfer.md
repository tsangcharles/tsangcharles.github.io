---
layout: page
title: Neural Style Transfer
description: Upload a photo and a style image — stylize in the browser using fast neural style transfer
importance: 1
img: /assets/img/nst/preview.png
category: machine-learning
---

Before large language models took over the conversation, computer vision had its own viral moment. Neural style transfer — the ability to repaint a photograph in the visual style of a painting — was one of those results that genuinely surprised people when it came out. The outputs looked like something a human would spend hours doing, and the model did it algorithmically.

## How It Works

The original paper by Gatys, Ecker, and Bethge (2015) framed style transfer as an optimization problem. Given a content image and a style image, you iteratively update a third image — starting from noise — until it matches the content structure of the first and the texture statistics of the second. The mechanism is a pretrained convolutional network (VGG-19). Early layers capture local textures; deeper layers capture semantic structure. Style is captured by the **Gram matrix** of feature activations — a measure of which features co-activate together, stripped of spatial information. Content is captured by the feature activations themselves at a deeper layer.

It worked beautifully. It was also slow — several minutes per image on a GPU, since every stylization required hundreds of gradient steps.

Johnson, Alahi, and Fei-Fei (2016) fixed the speed problem by training a feedforward network to perform the optimization in a single forward pass. The network learns to approximate the output of the iterative process, but at inference it runs in milliseconds. The catch: you train one network per style. Changing styles means a different model.

The final step was **arbitrary style transfer** (Huang & Belongie, 2017). The key insight was Adaptive Instance Normalization (AdaIN): shift and scale the content image's feature statistics to match those of the style image, then decode. This made it possible to use any style image at inference time without retraining — which is what this demo does.

This demo runs entirely in your browser using TensorFlow.js and the pretrained Magenta arbitrary style transfer model. No data leaves your device.

---

<style>
.nst-container {
    max-width: 900px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
}

.nst-upload-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.nst-upload-box {
    flex: 1;
    min-width: 220px;
}

.nst-upload-box label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
    font-size: 14px;
}

html[data-theme="dark"] .nst-upload-box label {
    color: #ccc;
}

.nst-drop-zone {
    border: 2px dashed #ccc;
    border-radius: 8px;
    width: 100%;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: #fafafa;
    transition: border-color 0.2s;
    box-sizing: border-box;
}

html[data-theme="dark"] .nst-drop-zone {
    background: #2a2a2a;
    border-color: #555;
}

.nst-drop-zone:hover {
    border-color: #74b9ff;
}

.nst-drop-zone.dragover {
    border-color: #74b9ff;
    background: #eaf4ff;
}

html[data-theme="dark"] .nst-drop-zone.dragover {
    background: #1a2a3a;
}

.nst-drop-zone img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 6px;
}

.nst-drop-placeholder {
    text-align: center;
    color: #aaa;
    font-size: 13px;
    pointer-events: none;
    padding: 16px;
}

.nst-drop-placeholder svg {
    display: block;
    margin: 0 auto 8px;
    opacity: 0.5;
}

.nst-file-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
}

.nst-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.nst-btn {
    padding: 10px 28px;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    cursor: pointer;
    font-weight: bold;
    background: #74b9ff;
    color: white;
    transition: background 0.2s;
}

.nst-btn:hover:not(:disabled) {
    background: #0984e3;
}

.nst-btn:disabled {
    background: #b2bec3;
    cursor: not-allowed;
}

.nst-strength-group {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #555;
}

html[data-theme="dark"] .nst-strength-group {
    color: #aaa;
}

.nst-strength-group input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 16px;
    background: transparent;
    outline: none;
    width: 120px;
}

.nst-strength-group input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #74b9ff;
    cursor: pointer;
    margin-top: -6px;
}

.nst-strength-group input[type="range"]::-webkit-slider-runnable-track {
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
}

.nst-strength-group input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #74b9ff;
    border: none;
    cursor: pointer;
}

.nst-strength-group input[type="range"]::-moz-range-track {
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
}

.nst-status {
    font-size: 13px;
    color: #636e72;
    font-style: italic;
}

html[data-theme="dark"] .nst-status {
    color: #a0a0a0;
}

.nst-output-section {
    margin-top: 8px;
}

.nst-output-section h4 {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 8px;
    color: #333;
}

html[data-theme="dark"] .nst-output-section h4 {
    color: #ccc;
}

#nst-output-canvas {
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    border: 1px solid #ddd;
    display: none;
}

html[data-theme="dark"] #nst-output-canvas {
    border-color: #444;
}

.nst-download-btn {
    display: none;
    margin-top: 10px;
    padding: 8px 20px;
    border: none;
    border-radius: 6px;
    background: #00b894;
    color: white;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
}

.nst-download-btn:hover {
    background: #00a383;
}
</style>

<div class="nst-container">

  <div class="nst-upload-row">
    <div class="nst-upload-box">
      <label>Your Photo (content)</label>
      <div class="nst-drop-zone" id="content-drop">
        <input class="nst-file-input" type="file" accept="image/*" id="content-input">
        <div class="nst-drop-placeholder" id="content-placeholder">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          Click or drag to upload
        </div>
        <img id="content-preview" style="display:none;" alt="content preview">
      </div>
    </div>

    <div class="nst-upload-box">
      <label>Style Image</label>
      <div class="nst-drop-zone" id="style-drop">
        <input class="nst-file-input" type="file" accept="image/*" id="style-input">
        <div class="nst-drop-placeholder" id="style-placeholder">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Click or drag to upload<br><span style="font-size:11px;color:#bbb;">Try a painting or texture</span>
        </div>
        <img id="style-preview" style="display:none;" alt="style preview">
      </div>
    </div>
  </div>

  <div class="nst-controls">
    <button class="nst-btn" id="nst-run-btn" disabled>Stylize</button>
    <div class="nst-strength-group">
      <label for="nst-strength">Style strength</label>
      <input type="range" id="nst-strength" min="0" max="1" step="0.05" value="1">
      <span id="nst-strength-val">1.0</span>
    </div>
    <span class="nst-status" id="nst-status"></span>
  </div>

  <div class="nst-output-section">
    <canvas id="nst-output-canvas"></canvas>
    <br>
    <button class="nst-download-btn" id="nst-download-btn">Download</button>
  </div>

</div>

<script>
(function () {
  let model = null;
  let contentImg = null, styleImg = null;
  let libReady = false;

  const runBtn = document.getElementById('nst-run-btn');
  const status = document.getElementById('nst-status');
  const outputCanvas = document.getElementById('nst-output-canvas');
  const downloadBtn = document.getElementById('nst-download-btn');
  const strengthSlider = document.getElementById('nst-strength');
  const strengthVal = document.getElementById('nst-strength-val');

  strengthSlider.addEventListener('input', () => {
    strengthVal.textContent = parseFloat(strengthSlider.value).toFixed(2);
  });

  function setupDropZone(dropId, inputId, previewId, placeholderId, onLoad) {
    const drop = document.getElementById(dropId);
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const placeholder = document.getElementById(placeholderId);

    function loadFile(file) {
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          preview.src = e.target.result;
          preview.style.display = 'block';
          placeholder.style.display = 'none';
          onLoad(img);
          updateRunBtn();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    input.addEventListener('change', (e) => loadFile(e.target.files[0]));
    drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('dragover'); });
    drop.addEventListener('dragleave', () => drop.classList.remove('dragover'));
    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      drop.classList.remove('dragover');
      loadFile(e.dataTransfer.files[0]);
    });
  }

  setupDropZone('content-drop', 'content-input', 'content-preview', 'content-placeholder', (img) => { contentImg = img; });
  setupDropZone('style-drop', 'style-input', 'style-preview', 'style-placeholder', (img) => { styleImg = img; });

  function updateRunBtn() {
    runBtn.disabled = !(contentImg && styleImg);
  }

  function setStatus(msg) { status.textContent = msg; }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  }

  async function ensureReady() {
    if (libReady) return;
    setStatus('Loading library (first run only)…');
    await loadScript('https://cdn.jsdelivr.net/npm/@magenta/image@0.2.1/dist/magentaimage.js');
    libReady = true;
  }

  async function ensureModel() {
    if (model) return;
    setStatus('Loading model weights (first run only, ~10 MB)…');
    model = new window.mi.ArbitraryStyleTransferNetwork();
    await model.initialize();
  }

  function resizeToCanvas(img, maxW, maxH) {
    const scale = Math.min(1, maxW / img.naturalWidth, maxH / img.naturalHeight);
    const w = Math.round(img.naturalWidth * scale);
    const h = Math.round(img.naturalHeight * scale);
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    return c;
  }

  runBtn.addEventListener('click', async () => {
    runBtn.disabled = true;
    outputCanvas.style.display = 'none';
    downloadBtn.style.display = 'none';

    try {
      await ensureReady();
      await ensureModel();

      setStatus('Stylizing…');
      const styleRatio = parseFloat(strengthSlider.value);
      // Style predictor expects 256×256; transform network handles larger content fine
      const styleCanvas   = resizeToCanvas(styleImg,   256, 256);
      const contentCanvas = resizeToCanvas(contentImg, 512, 512);
      const imageData = await model.stylize(contentCanvas, styleCanvas, styleRatio);

      outputCanvas.width = imageData.width;
      outputCanvas.height = imageData.height;
      outputCanvas.getContext('2d').putImageData(imageData, 0, 0);
      outputCanvas.style.display = 'block';
      downloadBtn.style.display = 'inline-block';
      setStatus('Done.');
    } catch (err) {
      setStatus('Error: ' + err.message);
      console.error(err);
    }

    runBtn.disabled = false;
    updateRunBtn();
  });

  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'stylized.png';
    link.href = outputCanvas.toDataURL('image/png');
    link.click();
  });
})();
</script>
