---
layout: about
title: about
permalink: /
subtitle:

profile:
  align: right
  image: Charles.jpeg
  image_circular: false # crops the image to make it circular
  more_info:

selected_papers: false # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: false # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: true
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

Charles is a full-stack data generalist, equally comfortable wrangling pipelines, building models, and shipping AI-powered products. He also teaches as a Data Science Lecturer for the [Master of Mathematical Finance program](https://www.mmf.utoronto.ca/) at the University of Toronto. Charles has previously worked at Instagram (Meta), Zynga, EY, and KPMG.

Besides work, Charles is a big fan of Pokemon and Digimon. In his free time, he also enjoys playing basketball and soccer.

Charles has a Golden Doodle named Pudding, he is very energetic and rarely listens to commands.

<style>
.skills-clouds-section { margin: 2.5rem 0; }
.skills-clouds-section h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; color: inherit; }

.clouds-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 2rem;
}
@media (max-width: 600px) {
  .clouds-grid { grid-template-columns: 1fr; }
}

.big-cloud {
  border-radius: 16px;
  padding: 1.1rem 1.4rem 1.4rem;
  box-shadow: 0 4px 14px rgba(0,0,0,0.07);
}

.cloud-se { background: #dbeafe; }
.cloud-ds { background: #ede9fe; }
.cloud-ml { background: #dcfce7; }
.cloud-de { background: #ccfbf1; }

.big-cloud-label {
  font-size: 0.92rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.75rem;
}

.small-clouds-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.small-cloud {
  border-radius: 8px;
  padding: 0.28rem 0.72rem;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.09);
  white-space: nowrap;
}
.small-cloud:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }

.cloud-se .small-cloud { background: #93c5fd; color: #1e3a5f; }
.cloud-ds .small-cloud { background: #c4b5fd; color: #2e1065; }
.cloud-ml .small-cloud { background: #86efac; color: #14532d; }
.cloud-de .small-cloud { background: #5eead4; color: #134e4a; }

/* Dark mode overrides */
html[data-theme="dark"] .big-cloud { box-shadow: 0 4px 14px rgba(0,0,0,0.35); }

html[data-theme="dark"] .cloud-se { background: #1e3a5f; }
html[data-theme="dark"] .cloud-ds { background: #2e1065; }
html[data-theme="dark"] .cloud-ml { background: #14532d; }
html[data-theme="dark"] .cloud-de { background: #134e4a; }

html[data-theme="dark"] .big-cloud-label { color: #e5e7eb; }

html[data-theme="dark"] .cloud-se .small-cloud { background: #3b82f6; color: #dbeafe; }
html[data-theme="dark"] .cloud-ds .small-cloud { background: #7c3aed; color: #ede9fe; }
html[data-theme="dark"] .cloud-ml .small-cloud { background: #16a34a; color: #dcfce7; }
html[data-theme="dark"] .cloud-de .small-cloud { background: #0d9488; color: #ccfbf1; }

.cloud-popup {
  position: fixed;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.7rem 1rem;
  max-width: 240px;
  box-shadow: 0 10px 32px rgba(0,0,0,0.13);
  font-size: 0.81rem;
  line-height: 1.55;
  color: #374151;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 9999;
}
.cloud-popup.visible { opacity: 1; }

html[data-theme="dark"] .cloud-popup {
  background: #2c3237;
  border-color: #4b5563;
  color: #e5e7eb;
  box-shadow: 0 10px 32px rgba(0,0,0,0.4);
}
</style>

<div class="skills-clouds-section">

<div class="clouds-grid">

  <div class="big-cloud cloud-ds">
    <div class="big-cloud-label">Data Science</div>
    <div class="small-clouds-group">
      <div class="small-cloud" data-info="Spent several years at Meta working on Instagram, helping launch Intent Aware Ads and driving product decisions through deep data analysis. At Zynga, led continuous improvement efforts for Words with Friends. Comfortable going from raw data all the way to shaping the product roadmap.">Product Analytics</div>
      <div class="small-cloud" data-info="Used Bayesian causal impact models to measure the effectiveness of marketing campaigns at Zynga, separating true lift from noise in the absence of clean A/B test conditions.">Statistics</div>
      <div class="small-cloud" data-info="Crafted rigorous data analyses paired with clear, compelling visualizations to communicate product impact to stakeholders at Instagram and Zynga — turning complex findings into decisions.">Data Visualization</div>
      <div class="small-cloud" data-info="Regularly presented data-driven findings to cross-functional stakeholders at Instagram and Zynga, translating technical analysis into clear narratives that influenced product and business decisions.">Communication</div>
      <div class="small-cloud" data-info="Acted as the subject matter expert for experiment design and A/B testing at Instagram and Zynga — guiding teams through test setup, sample sizing, and interpretation to confidently ship products.">A/B Testing</div>
      <div class="small-cloud" data-info="Wrote efficient, optimized queries against massive datasets at Instagram and Zynga to surface product insights that directly shaped roadmap decisions.">SQL</div>
    </div>
  </div>

  <div class="big-cloud cloud-de">
    <div class="big-cloud-label">Data Engineering</div>
    <div class="small-clouds-group">
      <div class="small-cloud" data-info="Maintained and updated data warehouse tables at Zynga, ensuring clean, reliable data was available for downstream analytics and reporting.">Data Warehousing</div>
      <div class="small-cloud" data-info="Built and maintained data pipelines at Zynga and for consulting clients at EY, automating the flow and transformation of data to keep downstream systems accurate and up to date.">Data Pipelines</div>
      <div class="small-cloud" data-info="Used Spark at EY for a consulting client to transform large datasets in a distributed fashion on Hadoop, enabling high-speed processing of big data that would be impractical to run conventionally.">Spark</div>
      <div class="small-cloud" data-info="Designed and implemented data models at EY for a consulting client, structuring data into clean, queryable schemas that made downstream analytics reliable and efficient.">Data Modeling</div>
    </div>
  </div>

  <div class="big-cloud cloud-se">
    <div class="big-cloud-label">Software Engineering</div>
    <div class="small-clouds-group">
      <div class="small-cloud" data-info="Built a large-scale LLM-powered platform that ingests PDF documents and extracts structured data at speed — designed for high throughput, scalability, and seamless integration with downstream systems.">AI Engineering</div>
      <div class="small-cloud" data-info="Wrote production-grade Python powering a high-throughput LLM platform — async pipelines, concurrent document ingestion, robust error handling, and clean abstractions built to run reliably at scale.">Python Programming</div>
      <div class="small-cloud" data-info="Designed and built the backend API layer for the LLM extraction platform, exposing clean, reliable endpoints for document ingestion and structured data retrieval to downstream consumers.">API Design</div>
      <div class="small-cloud" data-info="Architected the end-to-end system design for the LLM extraction platform — from ingestion and processing topology to storage and API layers, with scalability and fault tolerance built in from the ground up.">Systems Design</div>
    </div>
  </div>

  <div class="big-cloud cloud-ml">
    <div class="big-cloud-label">Machine Learning</div>
    <div class="small-clouds-group">
      <div class="small-cloud" data-info="Extensive experience across the ML spectrum — from supervised learning for predicting user LTV and extracting feature importance for product insights, to productizing classification models, to unsupervised clustering for user segmentation, to reinforcement learning for a banking client at EY.">ML Modeling</div>
      <div class="small-cloud" data-info="Implemented MLflow for experiment tracking and model monitoring, and deployed production ML models using Amazon SageMaker — keeping models reliable, observable, and maintainable after launch.">MLOps</div>
      <div class="small-cloud" data-info="Invested heavily in feature engineering for supervised learning models — iterating on feature construction and selection to squeeze out meaningful gains in model performance.">Feature Engineering</div>
    </div>
  </div>

</div>

<div class="cloud-popup" id="cloudPopup"></div>

<script>
(function () {
  var popup = document.getElementById('cloudPopup');
  document.querySelectorAll('.small-cloud').forEach(function (el) {
    el.addEventListener('mouseenter', function (e) {
      popup.textContent = el.getAttribute('data-info');
      popup.classList.add('visible');
      move(e);
    });
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', function () {
      popup.classList.remove('visible');
    });
  });
  function move(e) {
    var pw = 240, ph = popup.offsetHeight || 90, m = 14;
    var left = e.clientX + m, top = e.clientY - ph / 2;
    if (left + pw > window.innerWidth)  left = e.clientX - pw - m;
    if (top < 8)                         top = 8;
    if (top + ph > window.innerHeight)   top = window.innerHeight - ph - 8;
    popup.style.left = left + 'px';
    popup.style.top  = top  + 'px';
  }
})();
</script>

</div>
