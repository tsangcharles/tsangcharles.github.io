---
layout: page
permalink: /teaching/
title: teaching
description: Teaching philosophy and course history across mathematics, statistics, and data science
nav: true
nav_order: 5
---

<style>
.tp-section { margin: 2.25rem 0; }
.tp-eyebrow {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--global-theme-color);
  margin-bottom: 0.2rem;
}
.tp-section h2 { font-size: 1.35rem; font-weight: 700; margin: 0 0 1rem; }

/* Stats */
.tp-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin: 0.5rem 0 2rem; }
.tp-stat {
  border: 1px solid var(--global-divider-color);
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
  background: var(--global-card-bg-color);
}
.tp-stat b { display: block; font-size: 1.6rem; line-height: 1.1; color: var(--global-theme-color); }
.tp-stat span { font-size: 0.78rem; color: var(--global-text-color-light); }

/* Philosophy */
.tp-lead {
  font-size: 1.15rem;
  line-height: 1.6;
  border-left: 4px solid var(--global-theme-color);
  padding: 0.2rem 0 0.2rem 1rem;
  margin: 0 0 1.25rem;
}
.tp-principles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.9rem; }
.tp-principle {
  border: 1px solid var(--global-divider-color);
  border-radius: 14px;
  padding: 1rem 1.1rem;
  background: var(--global-card-bg-color);
}
.tp-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  background: var(--global-theme-color);
  margin-bottom: 0.5rem;
}
.tp-principle h3 { font-size: 0.98rem; font-weight: 700; margin: 0 0 0.35rem; }
.tp-principle p { font-size: 0.86rem; line-height: 1.6; margin: 0; color: var(--global-text-color); }

/* Lecturer cards */
.tp-lecture { display: grid; grid-template-columns: 2fr 1fr; gap: 0.9rem; }
.tp-card {
  border: 1px solid var(--global-divider-color);
  border-radius: 14px;
  padding: 1rem 1.15rem;
  background: var(--global-card-bg-color);
  border-top: 4px solid var(--sc);
}
.tp-card .tp-code { font-size: 0.78rem; font-weight: 700; color: var(--sc); letter-spacing: 0.03em; }
.tp-card h3 { font-size: 1.05rem; font-weight: 700; margin: 0.1rem 0 0.2rem; }
.tp-card .tp-where { font-size: 0.82rem; color: var(--global-text-color-light); margin-bottom: 0.6rem; }

/* Term chips */
.tp-terms { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.tp-terms i {
  font-style: normal;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.08rem 0.5rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--sc) 14%, transparent);
  color: var(--global-text-color);
}

/* TA filters + grid */
.tp-filters { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
.tp-filters button {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--global-divider-color);
  background: transparent;
  color: var(--global-text-color);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.tp-filters button:hover { border-color: var(--global-theme-color); }
.tp-filters button.on { background: var(--global-theme-color); border-color: var(--global-theme-color); color: #fff; }
.tp-filters button small { opacity: 0.7; margin-left: 0.2rem; }
.tp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 0.65rem; }
.tp-course {
  border: 1px solid var(--global-divider-color);
  border-left: 4px solid var(--sc);
  border-radius: 10px;
  padding: 0.6rem 0.75rem 0.7rem;
  background: var(--global-card-bg-color);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.tp-course:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
.tp-course.hidden { display: none; }
.tp-course .tp-code { display: block; font-size: 0.8rem; font-weight: 700; color: var(--sc); }
.tp-course .tp-name { display: block; font-size: 0.84rem; line-height: 1.35; margin: 0.1rem 0 0.45rem; }

/* Subject colours */
.s-mat { --sc: #2563eb; }
.s-sta { --sc: #7c3aed; }
.s-eco { --sc: #0d9488; }
.s-fin { --sc: #d97706; }
.s-phl { --sc: #db2777; }
.s-ds  { --sc: #1e3765; }
.tp-legend { display: flex; flex-wrap: wrap; gap: 0.9rem; font-size: 0.75rem; color: var(--global-text-color-light); margin-top: 0.9rem; }
.tp-legend span::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: var(--sc);
  margin-right: 0.35rem;
  vertical-align: -1px;
}

@media (max-width: 768px) {
  .tp-stats { grid-template-columns: repeat(2, 1fr); }
  .tp-principles, .tp-lecture { grid-template-columns: 1fr; }
}

html[data-theme="dark"] .s-ds { --sc: #7ea3d9; }
html[data-theme="dark"] .tp-course:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.4); }
</style>

<div class="tp-stats">
  <div class="tp-stat"><b>2008</b><span>first class taught</span></div>
  <div class="tp-stat"><b id="tpLectureTerms">7</b><span>terms as lecturer</span></div>
  <div class="tp-stat"><b id="tpTaCourses">39</b><span>courses as TA</span></div>
  <div class="tp-stat"><b>3</b><span>U of T campuses</span></div>
</div>

<div class="tp-section">
<div class="tp-eyebrow">Philosophy</div>
<h2>How I teach</h2>
<p class="tp-lead">I start with examples. Always. A definition with nothing to refer to is just notation &mdash; the example is what gives it somewhere to live.</p>
<div class="tp-principles">
  <div class="tp-principle">
    <div class="tp-num">1</div>
    <h3>Feel the need first</h3>
    <p>Before introducing a concept, I put students in a position where they need it. Once the question is alive in the room, the definition stops feeling arbitrary and starts feeling inevitable.</p>
  </div>
  <div class="tp-principle">
    <div class="tp-num">2</div>
    <h3>Connect it to practice</h3>
    <p>Industry work in ads, fraud detection and customer analytics showed me what actually matters. I bring that into class so students have a real reason to care.</p>
  </div>
  <div class="tp-principle">
    <div class="tp-num">3</div>
    <h3>Breadth, on purpose</h3>
    <p>Depth is easy to pursue alone, especially with AI tools. What's hard to get alone is the map: what exists, how it connects, and where each piece gets used.</p>
  </div>
</div>
</div>

<div class="tp-section">
<div class="tp-eyebrow">Lecturer</div>
<h2>Courses I've taught</h2>
<div class="tp-lecture">
  <div class="tp-card s-ds">
    <div class="tp-code">MMF1922H &middot; Graduate</div>
    <h3>Data Science</h3>
    <div class="tp-where">University of Toronto &middot; <a href="https://www.mmf.utoronto.ca/">Master of Mathematical Finance</a></div>
    <div class="tp-terms" data-terms="2020 Fall, 2021 Fall, 2022 Fall, 2023 Fall, 2024 Fall, 2025 Fall"></div>
  </div>
  <div class="tp-card s-mat">
    <div class="tp-code">MAT133Y &middot; Undergraduate</div>
    <h3>Calculus and Linear Algebra for Commerce</h3>
    <div class="tp-where">University of Toronto</div>
    <div class="tp-terms" data-terms="2016 Summer"></div>
  </div>
</div>
</div>

<div class="tp-section">
<div class="tp-eyebrow">Teaching Assistant</div>
<h2>Courses I've supported</h2>
<div class="tp-filters" id="tpFilters">
  <button type="button" class="on" data-f="all">All</button>
  <button type="button" data-f="stg">St. George</button>
  <button type="button" data-f="utm">Mississauga</button>
  <button type="button" data-f="utsc">Scarborough</button>
</div>
<!-- One line per course: data-campus = stg | utm | utsc; the subject colour comes from the course code -->
<div class="tp-grid" id="tpGrid">
  <div class="tp-course" data-campus="stg" data-code="MAT237Y" data-name="Multivariable Calculus" data-terms="2013 Summer, 2014 Summer"></div>
  <div class="tp-course" data-campus="stg" data-code="MAT244H" data-name="Introduction to Ordinary Differential Equations" data-terms="2012 Summer"></div>
  <div class="tp-course" data-campus="stg" data-code="APM466H / MAT1856H" data-name="Mathematical Theory of Finance" data-terms="2015 Fall, 2016 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="ECO200Y" data-name="Microeconomic Theory" data-terms="2009 Summer"></div>
  <div class="tp-course" data-campus="utm" data-code="ECO220Y" data-name="Quantitative Methods in Economics" data-terms="2008 Fall, 2009 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT133Y" data-name="Calculus and Linear Algebra for Commerce" data-terms="2008 Fall, 2009 Fall, 2010 Summer, 2010 Fall, 2014 Summer"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT134Y" data-name="Calculus for Life Sciences" data-terms="2009 Fall, 2010 Fall, 2011 Fall, 2012 Fall, 2013 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT135Y" data-name="Calculus" data-terms="2009 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT137Y" data-name="Calculus" data-terms="2010 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT202H" data-name="Introduction to Discrete Mathematics" data-terms="2014 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT212H" data-name="Modeling with Differential Equations in Life Sciences and Medicine" data-terms="2012 Winter"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT223H" data-name="Linear Algebra I" data-terms="2010 Summer"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT233H" data-name="Calculus of Several Variables" data-terms="2011 Fall, 2014 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT311H" data-name="Partial Differential Equations" data-terms="2013 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT378H" data-name="Introduction to Analysis" data-terms="2013 Winter, 2014 Winter, 2015 Winter"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT402H" data-name="Classical Geometries" data-terms="2013 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="MAT406H" data-name="Mathematical Introduction to Game Theory" data-terms="2012 Fall, 2014 Winter, 2014 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="PHL245H" data-name="Modern Symbolic Logic" data-terms="2008 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="STA107H" data-name="An Introduction to Probability and Modelling" data-terms="2012 Winter, 2012 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="STA219H" data-name="Mathematics of Investment and Credit" data-terms="2012 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="STA256H" data-name="Probability and Statistics I" data-terms="2013 Fall, 2014 Summer, 2014 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="STA257H" data-name="Probability and Statistics I" data-terms="2011 Fall, 2012 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="STA258H" data-name="Statistics with Applied Probability" data-terms="2014 Winter"></div>
  <div class="tp-course" data-campus="utm" data-code="STA260H" data-name="Probability and Statistics II" data-terms="2014 Winter"></div>
  <div class="tp-course" data-campus="utm" data-code="STA261H" data-name="Probability and Statistics II" data-terms="2012 Winter"></div>
  <div class="tp-course" data-campus="utm" data-code="STA302H" data-name="Regression Analysis" data-terms="2014 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="STA313H" data-name="Topics in Statistics: Applications of Statistical Models (Measure Theory)" data-terms="2014 Winter"></div>
  <div class="tp-course" data-campus="utm" data-code="STA348H" data-name="Introduction to Stochastic Processes" data-terms="2012 Fall, 2014 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="STA413H" data-name="Estimation and Testing" data-terms="2013 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="STA431H" data-name="Structural Equation Models" data-terms="2014 Fall"></div>
  <div class="tp-course" data-campus="utm" data-code="STA437H" data-name="Applied Multivariate Statistics" data-terms="2012 Fall"></div>
  <div class="tp-course" data-campus="utsc" data-code="MATA23H" data-name="Linear Algebra I" data-terms="2012 Summer, 2014 Winter"></div>
  <div class="tp-course" data-campus="utsc" data-code="MATA33H" data-name="Calculus for Management II" data-terms="2013 Summer"></div>
  <div class="tp-course" data-campus="utsc" data-code="MATC34H" data-name="Complex Variables" data-terms="2013 Fall"></div>
  <div class="tp-course" data-campus="utsc" data-code="MATC46H" data-name="Differential Equations II" data-terms="2014 Winter"></div>
  <div class="tp-course" data-campus="utsc" data-code="MGEA02H" data-name="Introduction to Microeconomics: A Mathematical Approach" data-terms="2013 Summer"></div>
  <div class="tp-course" data-campus="utsc" data-code="MGEB02H" data-name="Price Theory: A Mathematical Approach" data-terms="2013 Summer"></div>
  <div class="tp-course" data-campus="utsc" data-code="MGEC72H" data-name="Financial Economics" data-terms="2013 Summer"></div>
  <div class="tp-course" data-campus="utsc" data-code="MGFB10H" data-name="Principles of Finance" data-terms="2013 Summer"></div>
</div>
<div class="tp-legend">
  <span class="s-mat">Mathematics</span>
  <span class="s-sta">Statistics</span>
  <span class="s-eco">Economics</span>
  <span class="s-fin">Finance</span>
  <span class="s-phl">Philosophy</span>
</div>
</div>

<script>
(function () {
  // Subject colour from the course code prefix
  function subject(code) {
    if (/^(APM466|MGF|STA219)/.test(code)) return 's-fin';
    if (/^(ECO|MGE)/.test(code)) return 's-eco';
    if (/^STA/.test(code)) return 's-sta';
    if (/^PHL/.test(code)) return 's-phl';
    return 's-mat';
  }
  function chips(el, terms) {
    terms.split(',').forEach(function (t) {
      var i = document.createElement('i');
      i.textContent = t.trim();
      el.appendChild(i);
    });
  }

  // Lecturer cards
  var lectureTerms = 0;
  document.querySelectorAll('.tp-card .tp-terms').forEach(function (el) {
    chips(el, el.dataset.terms);
    lectureTerms += el.dataset.terms.split(',').length;
  });
  document.getElementById('tpLectureTerms').textContent = lectureTerms;

  // TA course tiles
  var courses = document.querySelectorAll('.tp-course');
  courses.forEach(function (el) {
    el.classList.add(subject(el.dataset.code));
    el.innerHTML = '<span class="tp-code"></span><span class="tp-name"></span><div class="tp-terms"></div>';
    el.querySelector('.tp-code').textContent = el.dataset.code;
    el.querySelector('.tp-name').textContent = el.dataset.name;
    chips(el.querySelector('.tp-terms'), el.dataset.terms);
  });
  document.getElementById('tpTaCourses').textContent = courses.length;

  // Campus filter
  var buttons = document.querySelectorAll('#tpFilters button');
  buttons.forEach(function (b) {
    var n = b.dataset.f === 'all' ? courses.length
      : document.querySelectorAll('.tp-course[data-campus="' + b.dataset.f + '"]').length;
    b.insertAdjacentHTML('beforeend', '<small>' + n + '</small>');
    b.addEventListener('click', function () {
      buttons.forEach(function (x) { x.classList.toggle('on', x === b); });
      courses.forEach(function (c) {
        c.classList.toggle('hidden', b.dataset.f !== 'all' && c.dataset.campus !== b.dataset.f);
      });
    });
  });
})();
</script>
