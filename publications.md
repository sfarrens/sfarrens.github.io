---
title: Publications
layout: default
---

<div class="pub-header">

  <div class="pub-badges">
    <a href="https://orcid.org/0000-0002-9594-9387" target="_blank" rel="me noopener noreferrer"
       class="pub-badge pub-badge--orcid"
       itemscope itemtype="https://schema.org/Person"
       itemprop="sameAs" content="https://orcid.org/0000-0002-9594-9387">
      <span class="pub-badge-label">
        <img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" alt="ORCID iD" class="pub-badge-icon">
        ORCID
      </span>
      <span class="pub-badge-value">0000-0002-9594-9387</span>
    </a>
    <a href="https://ui.adsabs.harvard.edu/search/p_=0&q=author%3A%22Farrens%2C%20S.%22%20AND%20database%3Aastronomy&sort=date%20desc%2C%20bibcode%20desc"
       target="_blank" class="pub-badge pub-badge--ads">
      <span class="pub-badge-label">
        <img src="{{ site.image_path }}/nasa.png" alt="NASA ADS" class="pub-badge-icon">
        NASA ADS
      </span>
      <span class="pub-badge-value">All my papers ↗</span>
    </a>
  </div>

</div>

> [!DISCLAIMER]
> The ADS list includes all papers on record, including collaboration papers where my contribution may have been indirect. The publications listed below are those where I led the work or made significant contributions.

<div class="pub-filter-bar">
  <span class="pub-filter-label">Filter:</span>
  <button class="pub-filter-btn" id="filter-first-author">First-author only</button>
</div>

<div class="data-cards-grid data-cards-grid--list" id="papers-grid">
{% for paper in site.data.papers %}
  {% include paper_card.html paper=paper %}
{% endfor %}
</div>

<script>
(function () {
  var btn = document.getElementById('filter-first-author');
  var grid = document.getElementById('papers-grid');
  if (!btn || !grid) return;
  btn.addEventListener('click', function () {
    var active = grid.classList.toggle('filter-first-author');
    btn.classList.toggle('active', active);
    btn.textContent = active ? 'Show all papers' : 'First-author only';
  });
})();
</script>
