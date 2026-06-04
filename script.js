(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var navToggle = document.querySelector('.nav-toggle');
  if (navToggle && nav) {
    function setNavOpen(open) {
      nav.classList.toggle('is-open', open);
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    navToggle.addEventListener('click', function () {
      setNavOpen(!nav.classList.contains('is-open'));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setNavOpen(false);
      });
    });
  }

  /* Hero parallax (scroll-based depth) */
  var heroBg = document.querySelector('.hero-bg');
  var heroBgGraphic = document.querySelector('.hero-bg-graphic');
  var heroDiagonal = document.querySelector('.hero-diagonal');
  var heroVisual = document.querySelector('.hero-visual');
  if (heroBg && heroDiagonal && heroVisual) {
    window.addEventListener('scroll', function () {
      if (window.innerWidth < 900) {
        heroBg.style.transform = '';
        if (heroBgGraphic) heroBgGraphic.style.transform = '';
        heroDiagonal.style.transform = '';
        heroVisual.style.transform = '';
        return;
      }
      var scrollY = window.scrollY;
      var bgShift = scrollY * 0.15;
      heroBg.style.transform = 'translateY(' + bgShift + 'px)';
      if (heroBgGraphic) heroBgGraphic.style.transform = 'translateY(' + bgShift + 'px)';
      heroDiagonal.style.transform = 'translateY(' + bgShift + 'px)';
      heroVisual.style.transform = 'translateY(' + scrollY * 0.35 + 'px)';
    });
  }

  /* Car: path animation, wheel rotation, glow trail; mobile-optimized */
  var pathDesktop = document.getElementById('hero-curve-path');
  var pathMobile = document.getElementById('hero-curve-path-mobile');
  var carEl = document.querySelector('.hero-car');
  var glowEl = document.querySelector('.hero-car-glow');
  var wheelFront = document.querySelector('.hero-car-wheel--front');
  var wheelBack = document.querySelector('.hero-car-wheel--back');
  var pathContainer = document.querySelector('.hero-car-path');
  var heroSection = document.querySelector('.hero');
  var MOBILE_BREAK = 900;
  var viewBox = { w: 1000, h: 200 };

  function isMobile() {
    return window.innerWidth < MOBILE_BREAK;
  }

  if (pathDesktop && carEl && pathContainer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var duration = 8;
    var startTime = null;

    function getScrollProgress() {
      if (!heroSection) return 0;
      var scrollY = window.scrollY || window.pageYOffset;
      var heroTop = heroSection.offsetTop;
      var heroHeight = heroSection.offsetHeight;
      var vh = window.innerHeight;
      var maxScroll = Math.max(0, heroHeight - vh);
      if (maxScroll <= 0) return 0;
      var scrollThrough = scrollY - heroTop;
      return Math.max(0, Math.min(1, scrollThrough / maxScroll));
    }

    function animateCar() {
      if (isMobile()) {
        carEl.style.visibility = 'hidden';
        return;
      }
      carEl.style.visibility = '';
      var rect = pathContainer.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        requestAnimationFrame(animateCar);
        return;
      }
      if (startTime === null) startTime = performance.now();

      var pathEl = (isMobile() && pathMobile) ? pathMobile : pathDesktop;
      var pathLen = pathEl.getTotalLength();

      var elapsed = (performance.now() - startTime) / 1000;
      var timeProgress = (elapsed / duration) % 1;
      var scrollProgress = getScrollProgress();
      var progress;
      if (isMobile()) {
        progress = timeProgress;
      } else {
        progress = (0.65 * timeProgress + 0.35 * scrollProgress) % 1;
      }
      if (progress < 0) progress += 1;

      var distance = progress * pathLen;
      var pt = pathEl.getPointAtLength(distance);
      var tangentPt = pathEl.getPointAtLength(Math.min(distance + 2, pathLen));
      var angle = Math.atan2(tangentPt.y - pt.y, tangentPt.x - pt.x);

      var scaleX = rect.width / viewBox.w;
      var scaleY = rect.height / viewBox.h;
      var leftPx = pt.x * scaleX;
      var topPx = pt.y * scaleY;

      carEl.style.left = leftPx + 'px';
      carEl.style.top = topPx + 'px';
      carEl.style.transform = 'translate(-50%,-50%) rotate(' + angle + 'rad)';

      if (glowEl && !isMobile()) {
        var glowOffset = 44;
        glowEl.style.left = (leftPx - Math.cos(angle) * glowOffset) + 'px';
        glowEl.style.top = (topPx - Math.sin(angle) * glowOffset) + 'px';
        glowEl.style.transform = 'translate(-50%,-50%) rotate(' + angle + 'rad)';
      }

      var wheelMultiplier = isMobile() ? 1.5 : 12;
      var wheelAngle = progress * Math.PI * wheelMultiplier;
      if (wheelFront) wheelFront.style.transform = 'rotate(' + wheelAngle + 'rad)';
      if (wheelBack) wheelBack.style.transform = 'rotate(' + wheelAngle + 'rad)';

      requestAnimationFrame(animateCar);
    }
    requestAnimationFrame(animateCar);
  }

  var testimonialCards = document.querySelectorAll('.testimonial-card');
  var prevBtns = document.querySelectorAll('.testimonial-btn--prev');
  var nextBtns = document.querySelectorAll('.testimonial-btn--next');
  var currentIndex = 0;
  var totalTestimonials = testimonialCards.length;

  function showTestimonial(index) {
    if (totalTestimonials === 0) return;
    currentIndex = (index + totalTestimonials) % totalTestimonials;
    testimonialCards.forEach(function (card, i) {
      card.classList.toggle('testimonial-card--active', i === currentIndex);
    });
  }

  prevBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      showTestimonial(currentIndex - 1);
    });
  });
  nextBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      showTestimonial(currentIndex + 1);
    });
  });

  /* Auto-update copyright year and "Last updated" dates */
  var yearEls = document.querySelectorAll('.js-current-year');
  var currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });
  var updatedEls = document.querySelectorAll('.js-last-updated');
  updatedEls.forEach(function (el) {
    el.textContent = currentYear;
  });
})();
