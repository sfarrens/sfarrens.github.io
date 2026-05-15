---
title: Tutorials
layout: default
---

<div class="pub-filter-bar" id="tutor-filter-bar">
  <span class="pub-filter-label">Filter:</span>
  {% assign tutor_posts = site.posts | where: 'category', 'tutor' %}
  {% assign tags = "" | split: "" %}
  {% for post in tutor_posts %}
    {% if post.tag %}
      {% unless tags contains post.tag %}
        {% assign tags = tags | push: post.tag %}
      {% endunless %}
    {% endif %}
  {% endfor %}
  {% assign tags = tags | sort %}
  {% for tag in tags %}
  <button class="pub-filter-btn" data-filter-tag="{{ tag }}">{{ tag }}</button>
  {% endfor %}
</div>

<div class="data-cards-grid data-cards-grid--list" id="tutor-grid">
{% assign tutorials = site.posts | where: 'category', 'tutor' | sort: 'date' | reverse %}
{% for post in tutorials %}
  {% include tutorial_card.html post=post %}
{% endfor %}
</div>

<script>
(function () {
  var bar = document.getElementById('tutor-filter-bar');
  var grid = document.getElementById('tutor-grid');
  if (!bar || !grid) return;
  var active = null;
  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('.pub-filter-btn');
    if (!btn) return;
    var tag = btn.getAttribute('data-filter-tag');
    if (active === tag) {
      active = null;
      btn.classList.remove('active');
    } else {
      bar.querySelectorAll('.pub-filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      active = tag;
    }
    grid.querySelectorAll('.tutorial-card').forEach(function (card) {
      card.style.display = (!active || card.getAttribute('data-tag') === active) ? '' : 'none';
    });
  });
})();
</script>
