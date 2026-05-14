---
title: Software
layout: default
---

<div class="pub-header">

  <div class="pub-badges">
    <a href="https://github.com/sfarrens" target="_blank" rel="noopener noreferrer"
       class="pub-badge pub-badge--github">
      <span class="pub-badge-label">
        <svg class="pub-badge-icon" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
            -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
            .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
            -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
            .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
            .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
            0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        GitHub
      </span>
      <span class="pub-badge-value">github.com/sfarrens ↗</span>
    </a>
  </div>

</div>

<div class="pub-filter-bar" id="soft-filter-bar">
  <span class="pub-filter-label">Filter:</span>
  {% assign langs = site.data.software | map: 'language' | uniq | sort %}
  {% for lang in langs %}
  {% if lang %}<button class="pub-filter-btn" data-filter-lang="{{ lang }}">{{ lang }}</button>{% endif %}
  {% endfor %}
</div>

<div class="data-cards-grid data-cards-grid--list" id="soft-grid">
{% for software in site.data.software %}
  {% include software_card.html software=software %}
{% endfor %}
</div>

<script>
(function () {
  var bar = document.getElementById('soft-filter-bar');
  var grid = document.getElementById('soft-grid');
  if (!bar || !grid) return;
  var active = null;
  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('.pub-filter-btn');
    if (!btn) return;
    var lang = btn.getAttribute('data-filter-lang');
    if (active === lang) {
      active = null;
      btn.classList.remove('active');
    } else {
      bar.querySelectorAll('.pub-filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      active = lang;
    }
    grid.querySelectorAll('.software-card').forEach(function (card) {
      card.style.display = (!active || card.getAttribute('data-language') === active) ? '' : 'none';
    });
  });
})();
</script>
