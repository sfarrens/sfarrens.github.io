(function () {
  'use strict';

  var container = document.querySelector('.scrollytelling');
  if (!container) return;

  // Elements to animate: direct children of .scrollytelling and one level deeper
  var selectors = [
    'p', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'blockquote', 'pre',
    'img', 'figure', 'table',
    '.in-post-image-container', '.about-iframe-container'
  ];

  var elements = container.querySelectorAll(selectors.join(', '));

  // Mark each element as an animation target
  elements.forEach(function (el) {
    el.classList.add('scroll-fade');
  });

  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    elements.forEach(function (el) { el.classList.add('scroll-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  elements.forEach(function (el) { observer.observe(el); });
})();
