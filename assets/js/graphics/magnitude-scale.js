(function () {
  'use strict';

  // ── SVG helpers ───────────────────────────────────────────────────────────────

  var NS = 'http://www.w3.org/2000/svg';
  var W = 300, H = 520, AXIS_X = 105, MAG_TOP = -28, MAG_BOT = 32;
  var Y_TOP = 50, Y_BOT = H - 40;

  function magToY(m) {
    return Y_TOP + (m - MAG_TOP) / (MAG_BOT - MAG_TOP) * (Y_BOT - Y_TOP);
  }

  function svgEl(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }

  function svgTxt(content, attrs) {
    var e = svgEl('text', attrs);
    e.textContent = content;
    return e;
  }

  // ── Base SVG: background, axis, ticks — shared across all states ──────────────

  function buildBase(svg) {
    svg.appendChild(svgEl('rect', {
      x: 0, y: 0, width: W, height: H, fill: '#0d1117', rx: 8
    }));

    svg.appendChild(svgTxt('Apparent Magnitude', {
      x: W / 2, y: 26,
      'font-family': 'system-ui, sans-serif', 'font-size': 10.5,
      'font-weight': 600, fill: '#8b949e',
      'text-anchor': 'middle', 'letter-spacing': '0.05em'
    }));

    svg.appendChild(svgEl('line', {
      x1: AXIS_X, y1: Y_TOP, x2: AXIS_X, y2: Y_BOT,
      stroke: '#30363d', 'stroke-width': 1.5
    }));

    // Arrow at the bottom (fainter direction)
    svg.appendChild(svgEl('polygon', {
      points: AXIS_X + ',' + (Y_BOT + 8) + ' ' +
              (AXIS_X - 4) + ',' + (Y_BOT - 2) + ' ' +
              (AXIS_X + 4) + ',' + (Y_BOT - 2),
      fill: '#30363d'
    }));

    svg.appendChild(svgTxt('◀ brighter', {
      x: AXIS_X - 9, y: Y_TOP - 8,
      'font-family': 'system-ui, sans-serif', 'font-size': 8.5,
      fill: '#6e7681', 'text-anchor': 'end'
    }));
    svg.appendChild(svgTxt('fainter ▶', {
      x: AXIS_X + 9, y: Y_BOT + 20,
      'font-family': 'system-ui, sans-serif', 'font-size': 8.5,
      fill: '#6e7681', 'text-anchor': 'start'
    }));

    [-25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30].forEach(function (m) {
      var y = magToY(m);
      svg.appendChild(svgEl('line', {
        x1: AXIS_X - 5, y1: y, x2: AXIS_X + 5, y2: y,
        stroke: '#30363d', 'stroke-width': 1
      }));
      svg.appendChild(svgTxt((m > 0 ? '+' : '') + m, {
        x: AXIS_X - 9, y: y + 3.5,
        'font-family': 'system-ui, sans-serif', 'font-size': 8,
        fill: '#6e7681', 'text-anchor': 'end'
      }));
    });
  }

  // ── State group builders ──────────────────────────────────────────────────────
  // Each returns a <g> to append to the SVG. Opacity is driven externally.

  function docGroup() {
    return document.createElementNS(NS, 'g');
  }

  function addDot(g, obj) {
    var y = magToY(obj.mag);
    var r = obj.r || 4;
    if (obj.dashed) {
      g.appendChild(svgEl('circle', {
        cx: AXIS_X, cy: y, r: r,
        fill: 'none', stroke: obj.color,
        'stroke-width': 1.2, 'stroke-dasharray': '3 2'
      }));
    } else {
      g.appendChild(svgEl('circle', { cx: AXIS_X, cy: y, r: r, fill: obj.color }));
    }
    g.appendChild(svgTxt(obj.label, {
      x: AXIS_X + r + 7, y: y - 2.5,
      'font-family': 'system-ui, sans-serif', 'font-size': 8.5,
      fill: '#e6edf3', 'text-anchor': 'start'
    }));
    g.appendChild(svgTxt((obj.mag > 0 ? '+' : '') + obj.mag.toFixed(1), {
      x: AXIS_X + r + 7, y: y + 9.5,
      'font-family': 'system-ui, sans-serif', 'font-size': 7.5,
      fill: obj.color, 'text-anchor': 'start', opacity: '0.8'
    }));
  }

  // State 0: Hipparchus 6-class band
  function buildGroup0() {
    var g = docGroup();
    var y1 = magToY(1), y2 = magToY(6);

    g.appendChild(svgEl('rect', {
      x: AXIS_X + 8, y: y1, width: 75, height: y2 - y1,
      fill: 'rgba(160,200,255,0.07)',
      stroke: 'rgba(160,200,255,0.22)', 'stroke-width': 0.75, rx: 3
    }));

    [1, 2, 3, 4, 5, 6].forEach(function (m) {
      var y = magToY(m);
      g.appendChild(svgEl('line', {
        x1: AXIS_X + 8, y1: y, x2: AXIS_X + 83, y2: y,
        stroke: 'rgba(160,200,255,0.18)', 'stroke-width': 0.6, 'stroke-dasharray': '2 2'
      }));
      g.appendChild(svgTxt('class ' + m, {
        x: AXIS_X + 87, y: y + 3.5,
        'font-family': 'system-ui, sans-serif', 'font-size': 7.5,
        fill: '#8b949e', 'text-anchor': 'start'
      }));
    });

    g.appendChild(svgTxt('Hipparchus\'s 6 classes', {
      x: AXIS_X + 45, y: y1 - 7,
      'font-family': 'system-ui, sans-serif', 'font-size': 8,
      fill: '#8b949e', 'text-anchor': 'middle'
    }));

    return g;
  }

  // State 1: Pogson bracket + named bright stars
  function buildGroup1() {
    var g = docGroup();

    // Bracket
    var y1 = magToY(1), y2 = magToY(6), bx = AXIS_X - 22;
    var mid = (y1 + y2) / 2;
    g.appendChild(svgEl('line', { x1: bx, y1: y1, x2: bx, y2: y2,
      stroke: '#c0584e', 'stroke-width': 1.2 }));
    g.appendChild(svgEl('line', { x1: bx - 4, y1: y1, x2: bx + 4, y2: y1,
      stroke: '#c0584e', 'stroke-width': 1.2 }));
    g.appendChild(svgEl('line', { x1: bx - 4, y1: y2, x2: bx + 4, y2: y2,
      stroke: '#c0584e', 'stroke-width': 1.2 }));
    g.appendChild(svgTxt('×100', {
      x: bx - 7, y: mid + 3,
      'font-family': 'system-ui, sans-serif', 'font-size': 9, 'font-weight': 700,
      fill: '#c0584e', 'text-anchor': 'end'
    }));
    g.appendChild(svgTxt('5 mags', {
      x: bx - 7, y: mid + 13,
      'font-family': 'system-ui, sans-serif', 'font-size': 7.5,
      fill: '#c0584e', 'text-anchor': 'end'
    }));

    // Named stars
    [
      { label: 'Sirius',          mag: -1.5, color: '#A0C8FF', r: 5 },
      { label: 'Polaris',         mag:  2.0, color: '#C8DCFF', r: 3.5 },
      { label: 'Naked-eye limit', mag:  6.5, color: '#7799bb', r: 3 }
    ].forEach(function (o) { addDot(g, o); });

    return g;
  }

  // State 2: full extended scale
  function buildGroup2() {
    var g = docGroup();
    [
      { label: 'Sun',                 mag: -26.7, color: '#FFD700', r: 9 },
      { label: 'Full Moon',           mag: -12.7, color: '#E8E8D0', r: 7 },
      { label: 'Venus (max)',          mag:  -4.9, color: '#FFFACD', r: 5 },
      { label: 'Sirius',              mag:  -1.5, color: '#A0C8FF', r: 5 },
      { label: 'Polaris',             mag:   2.0, color: '#C8DCFF', r: 3.5 },
      { label: 'Naked-eye limit',     mag:   6.5, color: '#7799bb', r: 3 },
      { label: 'Binoculars ~+10',     mag:  10.0, color: '#556688', r: 2.5 },
      { label: 'Amateur scope ~+13',  mag:  13.5, color: '#334466', r: 2 },
      { label: 'Hubble limit ~+31',   mag:  31.0, color: '#1a2233', r: 1.5 }
    ].forEach(function (o) { addDot(g, o); });
    return g;
  }

  // State 3: Sun at 10 pc marker + annotation
  function buildGroup3() {
    var g = docGroup();
    addDot(g, { label: 'Sun at 10 pc', mag: 4.8, color: '#FFD700', r: 9, dashed: true });
    g.appendChild(svgTxt('← M (absolute)', {
      x: AXIS_X - 14, y: magToY(4.8) + 4,
      'font-family': 'system-ui, sans-serif', 'font-size': 7.5,
      fill: '#FFD700', 'text-anchor': 'end', opacity: '0.75'
    }));
    return g;
  }

  var GROUP_BUILDERS = [buildGroup0, buildGroup1, buildGroup2, buildGroup3];

  // ── Setup each run graphic panel ──────────────────────────────────────────────
  // Each panel gets its own SVG. State groups for states firstState…lastState are
  // appended with opacity 0; firstState group starts at opacity 1.

  function setupPanel(panel) {
    var firstState = parseInt(panel.dataset.firstState, 10);
    var lastState  = parseInt(panel.dataset.lastState,  10);

    var svg = svgEl('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      xmlns: NS,
      role: 'img',
      'aria-label': 'Astronomical magnitude scale',
      preserveAspectRatio: 'xMidYMid meet'
    });
    buildBase(svg);

    var stateGroups = {};
    for (var s = firstState; s <= lastState; s++) {
      var builder = GROUP_BUILDERS[s];
      if (!builder) continue;
      var g = builder();
      g.style.opacity    = s === firstState ? '1' : '0';
      g.style.transition = 'opacity 0.55s ease';
      svg.appendChild(g);
      stateGroups[s] = g;
    }

    panel.appendChild(svg);
    panel._stateGroups = stateGroups;
    panel._firstState  = firstState;

    // Size the panel to the SVG's natural proportions so no black bars appear
    panel.style.aspectRatio = W + ' / ' + H;
  }

  document.querySelectorAll('.scrolly-run-graphic').forEach(setupPanel);

  // ── Transition callback (called by scrollytelling.js on step change) ──────────
  // Shows all groups up to and including `state`, hides those above.

  window.scrollyGraphic = function (state, prev, panel) {
    if (!panel || !panel._stateGroups) return;
    Object.keys(panel._stateGroups).forEach(function (key) {
      var s = parseInt(key, 10);
      panel._stateGroups[key].style.opacity = s <= state ? '1' : '0';
    });
  };

})();
