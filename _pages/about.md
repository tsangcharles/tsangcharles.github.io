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

Charles is a Staff Data Scientist at Glass Lewis, where he builds AI tools that turn messy documents into structured data. Before that, he did product analytics at Instagram and Zynga, and consulting at EY and KPMG. He also teaches data science in the [Master of Mathematical Finance program](https://www.mmf.utoronto.ca/) at the University of Toronto.

Besides work, Charles is a big fan of Pokemon and Digimon. In his free time, he also enjoys playing basketball and soccer.

Charles has a Golden Doodle named Pudding, he is very energetic and rarely listens to commands.

<style>
/* ---------- Horizontal career & teaching timelines ---------- */
.htl-section { margin: 2.5rem 0 1rem; }
.htl-section h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem; }
.htl-section h3 a { font-size: 0.8rem; font-weight: 500; margin-left: 0.5rem; }

/* Entries are data only; the script draws the timeline from them */
.htl-item { display: none; }

.htl-scroll { padding: 0 24px 0.25rem; }
.htl-track { position: relative; }
.htl-bar {
  position: absolute;
  height: 6px;
  border-radius: 3px;
  background: var(--c);
  opacity: 0.35;
  transition: opacity 0.2s ease;
}
.htl-logo {
  position: absolute;
  width: var(--logo, 42px);
  height: var(--logo, 42px);
  padding: 0;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid var(--c);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 1;
}
.htl-logo img { width: 62%; height: 62%; object-fit: contain; }
.htl-logo .htl-mono { font-size: 0.8rem; font-weight: 800; color: var(--c); }
.htl-logo:hover, .htl-logo:focus-visible, .htl-logo.is-active {
  transform: translate(-50%, -50%) scale(1.18);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  z-index: 2;
  outline: none;
}
.htl-axis {
  position: relative;
  height: 1.4rem;
  border-top: 1px solid var(--global-divider-color);
  font-size: 0.7rem;
  color: var(--global-text-color-light);
}
.htl-axis span { position: absolute; top: 0.3rem; transform: translateX(-50%); }

/* Hover box */
.htl-popup {
  position: fixed;
  width: 320px;
  max-width: calc(100vw - 16px);
  background: var(--global-card-bg-color);
  border: 1px solid var(--global-divider-color);
  border-top: 4px solid var(--c);
  border-radius: 12px;
  padding: 0.8rem 1rem 0.9rem;
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
  font-size: 0.84rem;
  line-height: 1.55;
  color: var(--global-text-color);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 9999;
}
.htl-popup.visible { opacity: 1; }
:is(.htl-popup, .htl-detail) .htl-role { font-weight: 700; font-size: 0.98rem; line-height: 1.3; }
:is(.htl-popup, .htl-detail) .htl-org { font-weight: 600; color: var(--global-text-color-light); }
:is(.htl-popup, .htl-detail) .htl-when { font-size: 0.75rem; color: var(--global-text-color-light); margin: 0.15rem 0 0.5rem; }
:is(.htl-popup, .htl-detail) p { margin: 0 0 0.35rem; }
:is(.htl-popup, .htl-detail) p:last-child { margin-bottom: 0; }
:is(.htl-popup, .htl-detail) ul { margin: 0; padding-left: 1.1rem; }
:is(.htl-popup, .htl-detail) li::marker { color: var(--c); }

@media (max-width: 576px) {
  .htl-scroll { padding: 0 14px 0.25rem; }
  .htl-logo { border-width: 1.5px; }
  .htl-logo .htl-mono { font-size: 0.6rem; }
}

/* Touch screens: details sit in a panel under the timeline instead of a hover box */
.htl-hint { font-size: 0.72rem; color: var(--global-text-color-light); text-align: center; margin: 0.2rem 0 0.4rem; }
.htl-detail {
  background: var(--global-card-bg-color);
  border: 1px solid var(--global-divider-color);
  border-top: 4px solid var(--c);
  border-radius: 12px;
  padding: 0.8rem 1rem 0.9rem;
  font-size: 0.86rem;
  line-height: 1.55;
  color: var(--global-text-color);
}

html[data-theme="dark"] .htl-popup { box-shadow: 0 12px 32px rgba(0,0,0,0.45); }
</style>

<!--
  HOW TO EDIT: one <div class="htl-item"> per role.
    style="--c:#hex"     brand colour (logo ring, bar, popup accent)
    data-role / data-org  shown at the top of the hover box
    data-start="YYYY-MM"  data-end="YYYY-MM" or "present"
    data-domain="x.com"   logo is fetched from this domain's icon
    data-logo="/assets/img/logos/x.png"  (optional) use your own logo file instead
    data-initials="EY"    (optional) shown if no logo loads
  The div's content (HTML) is the description in the hover box.
-->

<div class="htl-section">
<h3>Experience</h3>
<div class="htl">
  <div class="htl-item" style="--c:#1f4e8c" data-role="Staff Data Scientist" data-org="Glass, Lewis &amp; Co." data-start="2025-03" data-end="present" data-domain="glasslewis.com" data-initials="GL">
    <ul>
      <li><b>AI Engineering:</b> Production AI apps that extract data from unstructured documents.</li>
      <li><b>Clustering:</b> K-means segmentation of funds by voting behaviour, aligned with Glass Lewis's views.</li>
    </ul>
  </div>
  <div class="htl-item" style="--c:#6d28d9" data-role="Senior Data Scientist" data-org="Owl.co" data-start="2023-07" data-end="2024-10" data-domain="owl.co" data-initials="Owl">
    <ul>
      <li><b>Machine Learning:</b> SageMaker classifiers to flag high-priority claim findings.</li>
      <li><b>Operational Analytics:</b> Throughput and quality metrics to optimize workforce efficiency.</li>
    </ul>
  </div>
  <div class="htl-item" style="--c:#0866ff" data-role="Senior Data Scientist" data-org="Meta" data-start="2021-10" data-end="2023-06" data-domain="meta.com" data-initials="M">
    <p>Data science lead for the 0&rarr;1 launch of <b>Intent Aware Ads</b> on Instagram.</p>
    <ul>
      <li>Analyses that drove product decisions</li>
      <li>A/B test design and readouts</li>
      <li>Success metrics and stakeholder reporting</li>
    </ul>
  </div>
  <div class="htl-item" style="--c:#e4202e" data-role="Lead Data Scientist" data-org="Zynga" data-start="2020-03" data-end="2021-10" data-domain="zynga.com" data-initials="Z">
    <p>Growth pod, <i>Words with Friends</i>: data science initiatives that shaped the product roadmap.</p>
  </div>
  <div class="htl-item" style="--c:#d4b800" data-role="Manager" data-org="EY" data-start="2018-11" data-end="2020-03" data-domain="ey.com" data-initials="EY">
    <p>Tech lead manager for data science and data engineering teams.</p>
    <ul>
      <li>Data science maturity assessment</li>
      <li>Spark pipelines on Hadoop for an insurer</li>
      <li>Reinforcement learning for collections at a Tier I bank</li>
    </ul>
  </div>
  <div class="htl-item" style="--c:#00338d" data-role="Senior Consultant" data-org="KPMG" data-start="2016-11" data-end="2018-10" data-logo="/assets/img/logos/kpmg.svg" data-initials="K">
    <p>Data science and financial risk management consulting.</p>
  </div>
  <div class="htl-item" style="--c:#ec111a" data-role="Manager, Model Validation" data-org="Scotiabank" data-start="2015-07" data-end="2016-11" data-domain="scotiabank.com" data-initials="S">
    <p>Validated commodity and equity derivatives pricing models for mark-to-market and CCR.</p>
  </div>
</div>
</div>

<div class="htl-section">
<h3>Teaching <a href="{{ '/teaching/' | relative_url }}">full teaching history &rarr;</a></h3>
<div class="htl">
  <div class="htl-item" style="--c:#1e3765" data-role="Lecturer, MMF1922H Data Science" data-org="University of Toronto · Master of Mathematical Finance" data-segments="2020-09/2020-10, 2021-09/2021-10, 2022-09/2022-10, 2023-09/2023-10, 2024-09/2024-10, 2025-09/2025-10" data-domain="utoronto.ca" data-initials="UofT">
    <p><b>MMF1922H Data Science</b>, every Sep&ndash;Oct in the <a href="https://www.mmf.utoronto.ca/">MMF</a> program.</p>
  </div>
  <div class="htl-item" style="--c:#4a7ab8" data-role="Lecturer" data-org="University of Toronto · Mathematics" data-start="2016-05" data-end="2016-08" data-domain="utoronto.ca" data-initials="UofT">
    <p><b>MAT133Y</b> Calculus and Linear Algebra for Commerce.</p>
  </div>
</div>
</div>

<div class="htl-popup" id="htlPopup"></div>

<script>
(function () {
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var today = new Date();
  var nowIdx = today.getFullYear() * 12 + today.getMonth();
  var LANE = 56; // vertical space per lane (px)

  // "YYYY-MM" -> month index; "present" -> current month
  function idx(s) {
    if (!s || s === 'present') return nowIdx;
    var p = s.split('-');
    return (+p[0]) * 12 + (+p[1] - 1);
  }
  function label(i) { return MONTHS[i % 12] + ' ' + Math.floor(i / 12); }
  function duration(n) {
    var y = Math.floor(n / 12), m = n % 12, out = [];
    if (y) out.push(y + (y === 1 ? ' yr' : ' yrs'));
    if (m) out.push(m + (m === 1 ? ' mo' : ' mos'));
    return out.join(' ');
  }

  var popup = document.getElementById('htlPopup');
  var TOUCH = window.matchMedia('(hover: none)').matches;

  function content(r) {
    return '<div class="htl-role">' + r.el.dataset.role + '</div>' +
      '<div class="htl-org">' + r.el.dataset.org + '</div>' +
      '<div class="htl-when">' + label(r.start) + ' – ' +
        (r.present ? 'Present' : label(r.end - 1)) +
        ' · ' + duration(r.end - r.start) + '</div>' +
      r.el.innerHTML;
  }

  var activeBtn = null;

  function show(r, btn) {
    if (activeBtn && activeBtn !== btn) hide();
    activeBtn = btn;
    r.bar.style.opacity = 1;
    popup.style.setProperty('--c', r.color);
    popup.innerHTML = content(r);
    popup.classList.add('visible');
    btn.classList.add('is-active');
    // Place above the logo, or below if there is no room; keep inside the viewport
    var b = btn.getBoundingClientRect(), pw = popup.offsetWidth, ph = popup.offsetHeight, m = 10;
    var left = Math.min(Math.max(8, b.left + b.width / 2 - pw / 2), window.innerWidth - pw - 8);
    var top = b.top - ph - m;
    if (top < 8) top = b.bottom + m;
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
  }
  function hide() {
    popup.classList.remove('visible');
    if (!activeBtn) return;
    activeBtn.classList.remove('is-active');
    activeBtn.htlRole.bar.style.opacity = '';
    activeBtn = null;
  }

  document.querySelectorAll('.htl').forEach(function (root) {
    // data-segments="YYYY-MM/YYYY-MM, ..." repeats one entry for each session (e.g. a yearly course)
    var roles = [];
    root.querySelectorAll('.htl-item').forEach(function (el) {
      var color = getComputedStyle(el).getPropertyValue('--c').trim();
      var ranges = el.dataset.segments
        ? el.dataset.segments.split(',').map(function (seg) { return seg.trim().split('/'); })
        : [[el.dataset.start, el.dataset.end]];
      ranges.forEach(function (rg) {
        roles.push({
          el: el,
          start: idx(rg[0]),
          end: idx(rg[1]) + 1, // inclusive of the end month
          present: rg[1] === 'present',
          color: color
        });
      });
    });
    if (!roles.length) return;

    var min = Math.floor(Math.min.apply(null, roles.map(function (r) { return r.start; })) / 12) * 12;
    // Ongoing roles end the timeline at today ("Present"); otherwise snap to the next January
    var ongoing = roles.some(function (r) { return r.present; });
    var max = Math.max.apply(null, roles.map(function (r) { return r.end; }));
    if (!ongoing) max = Math.ceil(max / 12) * 12;
    var span = max - min;
    var pct = function (i) { return ((i - min) / span * 100) + '%'; };

    // Greedy lane assignment so overlapping roles stack.
    // Ending and starting in the same month counts as back-to-back, not overlapping.
    var lanes = [];
    roles.slice().sort(function (a, b) { return a.start - b.start; }).forEach(function (r) {
      var lane = lanes.findIndex(function (end) { return end - 1 <= r.start; });
      if (lane === -1) { lane = lanes.length; lanes.push(0); }
      lanes[lane] = r.end;
      r.lane = lane;
    });

    var scroll = document.createElement('div');
    scroll.className = 'htl-scroll';
    var track = document.createElement('div');
    track.className = 'htl-track';
    track.style.height = (lanes.length * LANE) + 'px';

    roles.forEach(function (r) {
      // Lane 0 sits just above the axis; later lanes stack upwards
      var y = (lanes.length - r.lane - 0.5) * LANE;

      var bar = document.createElement('div');
      bar.className = 'htl-bar';
      bar.style.setProperty('--c', r.color);
      bar.style.left = pct(r.start);
      bar.style.width = 'calc(' + ((r.end - r.start) / span * 100) + '% - 2px)';
      bar.style.top = (y - 3) + 'px';
      track.appendChild(bar);
      r.bar = bar;
      r.mid = (r.start + r.end) / 2;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'htl-logo';
      btn.style.setProperty('--c', r.color);
      btn.style.left = pct((r.start + r.end) / 2);
      btn.style.top = y + 'px';
      btn.htlRole = r;
      btn.setAttribute('aria-label', r.el.dataset.role + ', ' + r.el.dataset.org);

      var mono = document.createElement('span');
      mono.className = 'htl-mono';
      mono.textContent = r.el.dataset.initials || r.el.dataset.org.charAt(0);
      var src = r.el.dataset.logo ||
        (r.el.dataset.domain && 'https://www.google.com/s2/favicons?sz=128&domain=' + r.el.dataset.domain);
      if (src) {
        var img = document.createElement('img');
        img.alt = '';
        img.onerror = function () { img.replaceWith(mono); };
        img.src = src;
        btn.appendChild(img);
      } else {
        btn.appendChild(mono);
      }

      r.btn = btn;
      if (TOUCH) {
        // Touch: tapping a logo switches the panel under the timeline
        btn.addEventListener('click', function () { select(r); });
      } else {
        // Mouse: hover box. Keyboard: focus.
        btn.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') show(r, btn); });
        btn.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hide(); });
        btn.addEventListener('click', function () { show(r, btn); });
        btn.addEventListener('focus', function () { show(r, btn); });
        btn.addEventListener('blur', hide);
      }
      track.appendChild(btn);
    });

    var axis = document.createElement('div');
    axis.className = 'htl-axis';
    scroll.appendChild(track);
    scroll.appendChild(axis);
    root.appendChild(scroll);

    if (TOUCH) {
      var hint = document.createElement('div');
      hint.className = 'htl-hint';
      hint.textContent = 'Tap a logo to see each role';
      var detail = document.createElement('div');
      detail.className = 'htl-detail';
      root.appendChild(hint);
      root.appendChild(detail);
      var selected = null;
      var select = function (r) {
        if (selected) {
          selected.btn.classList.remove('is-active');
          selected.bar.style.opacity = '';
        }
        selected = r;
        r.btn.classList.add('is-active');
        r.bar.style.opacity = 1;
        detail.style.setProperty('--c', r.color);
        detail.innerHTML = content(r);
      };
      // Start on the most recent role
      select(roles.reduce(function (a, b) { return b.end > a.end ? b : a; }));
    }

    // Logos shrink to fit the closest pair in a lane; year labels thin out on narrow screens
    function layout() {
      axis.innerHTML = '';
      var pxPerMonth = track.clientWidth / span;
      var gap = Infinity;
      roles.forEach(function (a) {
        roles.forEach(function (b) {
          if (a !== b && a.lane === b.lane) gap = Math.min(gap, Math.abs(a.mid - b.mid) * pxPerMonth);
        });
      });
      var base = window.innerWidth <= 576 ? 30 : 42;
      track.style.setProperty('--logo', Math.max(20, Math.min(base, gap - 4)) + 'px');

      var step = Math.max(1, Math.ceil(36 / (pxPerMonth * 12)));
      function tick(at, text) {
        var t = document.createElement('span');
        t.style.left = pct(at);
        t.textContent = text;
        axis.appendChild(t);
      }
      // Skip a year label that would crowd the "Present" label
      for (var yr = min / 12; yr * 12 <= max; yr += step) {
        if (ongoing && (max - yr * 12) * pxPerMonth < 44) break;
        tick(yr * 12, yr);
      }
      if (ongoing) tick(max, 'Present');
    }
    layout();
    window.addEventListener('resize', layout);
  });

  // Close when tapping outside a logo, or on scroll so the fixed box never drifts from its logo
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.htl-logo')) hide();
  });
  window.addEventListener('scroll', hide, { passive: true });
})();
</script>
