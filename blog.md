---
title: Blog
layout: default
---

<div class="pub-filter-bar" id="blog-filter-bar">
  <span class="pub-filter-label">Filter:</span>
  {% assign blog_posts = site.posts | where: 'category', 'blog' %}
  {% assign tags = "" | split: "" %}
  {% for post in blog_posts %}
    {% if post.visibility == "public" and post.tag %}
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

<div class="data-cards-grid" id="blog-grid">
{% assign blog_posts = site.posts | where: 'category', 'blog' | sort: 'date' | reverse %}
{% for post in blog_posts %}
  {% include blog_card.html post=post %}
{% endfor %}
</div>

<script>
(function () {
  var bar = document.getElementById('blog-filter-bar');
  var grid = document.getElementById('blog-grid');
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
    grid.querySelectorAll('.blog-card').forEach(function (card) {
      card.style.display = (!active || card.getAttribute('data-tag') === active) ? '' : 'none';
    });
  });
})();
</script>
