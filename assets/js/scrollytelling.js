(function () {
  'use strict';

  var container = document.querySelector('.scrollytelling');
  if (!container) return;

  // ── 1. Parse cell annotation from an HTML comment node ───────────────────────
  // Format: <!-- cell: layout=split-left, graphic=state(1) -->

  function parseMeta(commentValue) {
    var meta = { layout: 'full', graphic: null };
    var str  = (commentValue || '').trim();
    if (str.indexOf('cell:') !== 0) return meta;
    str = str.slice(5).trim();

    str.split(',').forEach(function (part) {
      var eqIdx = part.indexOf('=');
      if (eqIdx < 0) return;
      var key = part.slice(0, eqIdx).trim();
      var val = part.slice(eqIdx + 1).trim();

      if (key === 'layout') {
        meta.layout = val;
      } else if (key === 'size') {
        meta.size = val;
      } else if (key === 'graphic') {
        var sm = val.match(/^state\((\d+)\)$/);
        var im = val.match(/^image\((.+)\)$/);
        if (sm) meta.graphic = { type: 'state', index: parseInt(sm[1], 10) };
        else if (im) meta.graphic = { type: 'image', url: im[1] };
      }
    });
    return meta;
  }

  // ── 2. Group childNodes at <hr> boundaries ────────────────────────────────────

  var childNodes = Array.from(container.childNodes);
  var rawGroups  = [];
  var separators = []; // separators[i] = HR node between rawGroups[i] and rawGroups[i+1]
  var current    = [];

  childNodes.forEach(function (node) {
    if (node.nodeType === 1 && node.tagName === 'HR') {
      separators.push(node);
      rawGroups.push(current); current = [];
    } else {
      current.push(node);
    }
  });
  rawGroups.push(current);

  var groups = rawGroups.map(function (nodes, idx) {
    var meta = { layout: 'full', graphic: null };
    var content = [], metaRead = false;

    nodes.forEach(function (node) {
      if (node.nodeType === 3 && node.nodeValue.trim() === '') return;
      if (!metaRead && node.nodeType === 8 &&
          node.nodeValue.trim().indexOf('cell:') === 0) {
        meta = parseMeta(node.nodeValue.trim());
        metaRead = true;
        return;
      }
      content.push(node);
    });

    return { nodes: content, meta: meta, _originalIdx: idx };
  }).filter(function (g) { return g.nodes.length > 0 || g.meta.layout === 'overlay'; });

  if (!groups.length) return;

  // ── 3. Identify runs of consecutive state+split groups ────────────────────────
  // A "run" is a maximal sequence of adjacent groups that all use a split layout
  // with a state graphic (same direction). These share one sticky graphic panel.

  function isRunEligible(g) {
    return (g.meta.layout === 'split-left' || g.meta.layout === 'split-right') &&
           g.meta.graphic && g.meta.graphic.type === 'state';
  }

  var runCatalog = []; // array of run arrays (each run = array of groups)
  var i = 0;
  while (i < groups.length) {
    if (isRunEligible(groups[i])) {
      var runLayout = groups[i].meta.layout;
      var j = i;
      while (j < groups.length && isRunEligible(groups[j]) &&
             groups[j].meta.layout === runLayout) j++;
      var run = groups.slice(i, j);
      var runIdx = runCatalog.length;
      run.forEach(function (g) { g._runIdx = runIdx; g._runLayout = runLayout; });
      runCatalog.push(run);
      i = j;
    } else {
      groups[i]._runIdx = -1;
      i++;
    }
  }

  // ── 4. Build DOM ──────────────────────────────────────────────────────────────
  // Runs → .scrolly-run wrapper with shared sticky graphic panel + stacked steps.
  // Non-run groups → standalone .scroll-step (full / split-image / full-graphic).

  var steps         = [];
  var handledRuns   = {};

  groups.forEach(function (group) {
    var meta = group.meta;

    // ── Non-run group ──────────────────────────────────────────────────────────
    if (group._runIdx < 0) {

      // ── Overlay cell ─────────────────────────────────────────────────────────
      if (meta.layout === 'overlay' && steps.length > 0) {
        var prevEntry = steps[steps.length - 1];
        var srcEl = prevEntry.el;
        for (var anc = srcEl.parentNode; anc && anc !== container; anc = anc.parentNode) {
          if (anc.classList.contains('scrolly-run')) { srcEl = anc; break; }
        }

        var scene = document.createElement('div');
        scene.className = 'scrolly-overlay-scene';
        container.insertBefore(scene, srcEl);

        var backdrop = document.createElement('div');
        backdrop.className = 'scrolly-overlay-backdrop';
        scene.appendChild(backdrop);
        backdrop.appendChild(srcEl);

        var ovEl = document.createElement('div');
        ovEl.className = 'scroll-step';
        ovEl.dataset.step = steps.length;
        ovEl.dataset.layout = 'overlay';
        scene.appendChild(ovEl);

        var ovBox = document.createElement('div');
        ovBox.className = 'scrolly-overlay-box';

        if (meta.graphic && meta.graphic.type === 'image') {
          ovBox.classList.add('scrolly-overlay-box--image');
          var ovImg = document.createElement('img');
          ovImg.src = meta.graphic.url; ovImg.alt = ''; ovImg.loading = 'lazy';
          ovBox.appendChild(ovImg);
        } else {
          var ovText = document.createElement('div');
          ovText.className = 'step-text';
          group.nodes.forEach(function (n) { ovText.appendChild(n); });
          ovBox.appendChild(ovText);
        }
        if (meta.size) ovBox.style.maxWidth = meta.size;
        ovEl.appendChild(ovBox);

        // Remove the separator HR between the backdrop step and this overlay step
        var prevSep = separators[group._originalIdx - 1];
        if (prevSep && prevSep.parentNode) prevSep.parentNode.removeChild(prevSep);

        // Tag both the backdrop step and the overlay step with the scene element so
        // update() can toggle is-active on the scene (undims backdrop only while in view)
        prevEntry.scene = scene;
        steps.push({ el: ovEl, meta: meta, runPanel: null, scene: scene });
        return;
      }

      var stepEl = document.createElement('div');
      stepEl.className    = 'scroll-step';
      stepEl.dataset.step = steps.length;
      stepEl.dataset.layout = meta.layout;
      container.insertBefore(stepEl, group.nodes[0]);

      var isSplit       = meta.layout === 'split-left' || meta.layout === 'split-right';
      var isFullGraphic = meta.layout === 'full-graphic';

      if ((isSplit || isFullGraphic) && meta.graphic) {
        var textDiv = document.createElement('div');
        textDiv.className = 'step-text';
        group.nodes.forEach(function (n) { textDiv.appendChild(n); });

        var graphicDiv = document.createElement('div');
        graphicDiv.className = 'step-graphic';

        if (meta.graphic.type === 'image') {
          var img = document.createElement('img');
          img.src = meta.graphic.url; img.alt = ''; img.loading = 'lazy';
          graphicDiv.appendChild(img);
        }

        if (meta.layout === 'split-right') {
          textDiv.style.order = '2'; graphicDiv.style.order = '1';
        }
        if (isFullGraphic) {
          stepEl.appendChild(graphicDiv);
          if (textDiv.childNodes.length) stepEl.appendChild(textDiv);
        } else {
          stepEl.appendChild(textDiv);
          stepEl.appendChild(graphicDiv);
        }
      } else {
        group.nodes.forEach(function (n) { stepEl.appendChild(n); });
      }

      steps.push({ el: stepEl, meta: meta, runPanel: null });
      return;
    }

    // ── First group of a new run ───────────────────────────────────────────────
    if (handledRuns[group._runIdx]) return; // subsequent groups → already processed
    handledRuns[group._runIdx] = true;

    var run       = runCatalog[group._runIdx];
    var runLayout = group._runLayout;

    var runWrapper = document.createElement('div');
    runWrapper.className = 'scrolly-run scrolly-run--' +
                           (runLayout === 'split-right' ? 'right' : 'left');
    container.insertBefore(runWrapper, run[0].nodes[0]);

    var stepsCol = document.createElement('div');
    stepsCol.className = 'scrolly-run-steps';

    var graphicPanel = document.createElement('div');
    graphicPanel.className        = 'scrolly-run-graphic';
    graphicPanel.dataset.firstState = run[0].meta.graphic.index;
    graphicPanel.dataset.lastState  = run[run.length - 1].meta.graphic.index;

    // DOM order: for split-right, graphic (left) then steps (right)
    if (runLayout === 'split-right') {
      runWrapper.appendChild(graphicPanel);
      runWrapper.appendChild(stepsCol);
    } else {
      runWrapper.appendChild(stepsCol);
      runWrapper.appendChild(graphicPanel);
    }

    // Create a .scroll-step for each group in the run (text column only)
    run.forEach(function (g) {
      var el = document.createElement('div');
      el.className    = 'scroll-step';
      el.dataset.step = steps.length;
      stepsCol.appendChild(el);

      var td = document.createElement('div');
      td.className = 'step-text';
      g.nodes.forEach(function (n) { td.appendChild(n); });
      el.appendChild(td);

      steps.push({ el: el, meta: g.meta, runPanel: graphicPanel });
    });

    // Remove HR nodes that fell between groups within this run — they are now
    // orphaned siblings of the run wrapper and would render as extra separators.
    for (var k = 0; k < run.length - 1; k++) {
      var sep = separators[run[k]._originalIdx];
      if (sep && sep.parentNode) sep.parentNode.removeChild(sep);
    }
  });

  if (!steps.length) return;

  // ── 5. Progress dots ──────────────────────────────────────────────────────────

  var nav = document.createElement('nav');
  nav.className = 'scroll-progress';
  nav.setAttribute('aria-label', 'Reading progress');

  var dots = steps.map(function (step, i) {
    var btn = document.createElement('button');
    btn.className = 'scroll-progress-dot';
    btn.setAttribute('aria-label', 'Go to section ' + (i + 1));
    btn.addEventListener('click', function () {
      step.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    nav.appendChild(btn);
    return btn;
  });

  document.body.appendChild(nav);

  // ── 6. Active-step tracking ───────────────────────────────────────────────────

  var activeIndex = -1;

  function findActiveIndex() {
    // Activate the last step whose top edge has crossed the upper 30% of the
    // viewport. This fires as soon as the heading scrolls into frame, not when
    // the step's midpoint reaches centre — crucial for tall steps.
    var triggerY = window.innerHeight * 0.3;
    var best = 0;
    steps.forEach(function (s, i) {
      if (s.el.getBoundingClientRect().top <= triggerY) best = i;
    });
    return best;
  }

  function update() {
    var idx = findActiveIndex();
    if (idx === activeIndex) return;
    var prev = activeIndex;
    activeIndex = idx;

    steps.forEach(function (s, i) { s.el.classList.toggle('active', i === idx); });
    dots.forEach(function (dot,  i) { dot.classList.toggle('active',  i === idx); });

    // Mark the active run wrapper so its graphic panel can be undimmed via CSS
    document.querySelectorAll('.scrolly-run').forEach(function (rw) {
      rw.classList.remove('has-active');
    });
    var activePanel = steps[idx].runPanel;
    if (activePanel) activePanel.parentElement.classList.add('has-active');

    // Undim backdrop content only while its overlay scene is being viewed
    var activeScene = steps[idx].scene || null;
    document.querySelectorAll('.scrolly-overlay-scene').forEach(function (sc) {
      sc.classList.toggle('is-active', sc === activeScene);
    });

    // Fire graphic callback when a state step becomes active
    var activeMeta = steps[idx].meta;
    if (typeof window.scrollyGraphic === 'function' &&
        activeMeta.graphic && activeMeta.graphic.type === 'state') {
      var prevState = (prev >= 0 &&
                       steps[prev].meta.graphic &&
                       steps[prev].meta.graphic.type === 'state')
        ? steps[prev].meta.graphic.index : -1;
      window.scrollyGraphic(activeMeta.graphic.index, prevState, activePanel);
    }
  }

  // ── 7. Wire scroll + resize ───────────────────────────────────────────────────

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () { update(); ticking = false; });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  update();
  setTimeout(function () { container.classList.add('js-ready'); }, 50);
})();
