(function () {
  var hamburger = document.getElementById('nav-hamburger');
  var navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  function open() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function close() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    navLinks.classList.contains('open') ? close() : open();
  });

  // Close when clicking/tapping outside the nav
  document.addEventListener('click', function (e) {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      close();
    }
  });

  // Close when a nav link is tapped (important for same-page anchors)
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', close);
  });
})();
