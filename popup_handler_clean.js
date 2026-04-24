
  // Filtro categorie
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.blog-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach((card, i) => {
        const cat = card.dataset.cat;
        const show = filter === 'Tutti' || cat === filter;
        card.style.display = show ? '' : 'none';
        // Rimuovi featured se filtrato
        if (i === 0) {
          card.classList.toggle('blog-card-featured', show && filter === 'Tutti');
        }
      });
    });
  });


  // ─── FAQ Toggle ───
  function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.faq-q.open').forEach(b => {
      b.classList.remove('open');
      b.closest('.faq-item').querySelector('.faq-a').classList.remove('open');
    });
    if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
  }

  // ─── Reveal animations ───
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => {
    const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
    el.style.transitionDelay = (siblings.indexOf(el) * 70) + 'ms';
    observer.observe(el);
  });

  // ─── Nav scroll ───
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60 ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)';
    nav.style.boxShadow = window.scrollY > 60 ? '0 1px 0 rgba(0,0,0,0.08)' : 'none';
  });

  // ─── Step items → Video switch (solo click manuale) ───
  const stepItems = document.querySelectorAll('.step-item');
  let currentStep = 0;

  function activateStep(idx) {
    stepItems.forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step-video-wrap').forEach(v => {
      v.classList.remove('active');
      // Reset inline style
      v.style.aspectRatio = '';
      v.style.maxHeight = '';
    });
    if (stepItems[idx]) stepItems[idx].classList.add('active');
    const target = document.getElementById('step-video-' + (idx + 1));
    if (target) {
      target.classList.add('active');
      // Tutti i video sono in formato verticale 9/16
    }
    currentStep = idx;
  }

  // Solo click manuale — nessun autoplay
  stepItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      activateStep(i);
    });
  });

  // Attiva il primo step al caricamento
  activateStep(0);

  // ─── Clients Carousel ───
  let carouselIdx = 0;
  const cardsPerView = 3;
  const totalCards = 6;
  const maxIdx = totalCards - cardsPerView; // = 3

  function updateCarousel() {
    const grid = document.getElementById('clients-grid');
    if (!grid) return;
    const card = grid.querySelector('.client-card');
    if (!card) return;
    const cardW = card.offsetWidth + 20; // gap
    grid.style.transform = 'translateX(-' + (carouselIdx * cardW) + 'px)';
    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === carouselIdx);
    });
  }

  function moveCarousel(dir) {
    carouselIdx = Math.max(0, Math.min(maxIdx, carouselIdx + dir));
    updateCarousel();
  }

  function goToSlide(idx) {
    carouselIdx = Math.max(0, Math.min(maxIdx, idx));
    updateCarousel();
  }


  // ─── Video Carousel (“Il prodotto in azione”) ───
  let vcIdx = 0;
  const vcPerView = 3;
  const vcTotal = 5;
  const vcMax = vcTotal - vcPerView; // = 2

  function vcUpdate() {
    const grid = document.getElementById('video-grid');
    if (!grid) return;
    const card = grid.querySelector('.video-card');
    if (!card) return;
    const gap = 28;
    const cardW = card.offsetWidth + gap;
    grid.style.transform = 'translateX(-' + (vcIdx * cardW) + 'px)';
    // Dots
    document.querySelectorAll('.vc-dot').forEach((d, i) => {
      d.classList.toggle('active', i === vcIdx);
    });
    // Buttons
    const prev = document.getElementById('vc-prev');
    const next = document.getElementById('vc-next');
    if (prev) prev.disabled = vcIdx === 0;
    if (next) next.disabled = vcIdx >= vcMax;
  }

  function vcMove(dir) {
    vcIdx = Math.max(0, Math.min(vcMax, vcIdx + dir));
    vcUpdate();
  }

  function vcGoTo(idx) {
    vcIdx = Math.max(0, Math.min(vcMax, idx));
    vcUpdate();
  }

  // Inizializza al caricamento
  window.addEventListener('load', vcUpdate);
  window.addEventListener('resize', vcUpdate);

  // ─── PRESS CAROUSEL ───
  let pressIdx = 0;
  const pressCardsPerView = 3;
  const pressTotalCards = 6;
  const pressMaxIdx = pressTotalCards - pressCardsPerView; // = 3

  function pressUpdate() {
    const grid = document.getElementById('press-grid');
    if (!grid) return;
    const card = grid.querySelector('.press-card');
    if (!card) return;
    const gap = 20;
    const cardW = card.offsetWidth + gap;
    // Su mobile mostra 1 card alla volta
    const vw = window.innerWidth;
    let perView = 3;
    if (vw <= 640) perView = 1;
    else if (vw <= 900) perView = 2;
    const maxI = Math.max(0, pressTotalCards - perView);
    pressIdx = Math.min(pressIdx, maxI);
    grid.style.transform = 'translateX(-' + (pressIdx * cardW) + 'px)';
    document.querySelectorAll('.press-nav-dot').forEach(function(d, i) {
      d.classList.toggle('active', i === pressIdx);
    });
  }

  function pressMove(dir) {
    const vw = window.innerWidth;
    let perView = 3;
    if (vw <= 640) perView = 1;
    else if (vw <= 900) perView = 2;
    const maxI = Math.max(0, pressTotalCards - perView);
    pressIdx = Math.max(0, Math.min(maxI, pressIdx + dir));
    pressUpdate();
  }

  function pressGoTo(idx) {
    const vw = window.innerWidth;
    let perView = 3;
    if (vw <= 640) perView = 1;
    else if (vw <= 900) perView = 2;
    const maxI = Math.max(0, pressTotalCards - perView);
    pressIdx = Math.max(0, Math.min(maxI, idx));
    pressUpdate();
  }

  window.addEventListener('load', pressUpdate);
  window.addEventListener('resize', pressUpdate);

  // ─── CALENDLY: apri il link corretto in base alla lingua attiva ───
  function openCalendlyByLang() {
    const lang = localStorage.getItem('ml_lang') || document.documentElement.lang || 'it';
    const url = (lang === 'it')
      ? 'https://calendly.com/andrea-bertoni-my-lime/30-minute-meeting'
      : 'https://calendly.com/sushant-mapari-my-lime/30min';
    window.open(url, '_blank');
  }

  // ─── FIX PIANI: CTA uniformate con link Calendly ───
  document.addEventListener('DOMContentLoaded', function() {
    // Hover JS su tutte e 3 le card piani
    document.querySelectorAll('.solution-card').forEach(function(card) {
      const isFeatured = card.classList.contains('featured');
      card.addEventListener('mouseenter', function() {
        this.style.setProperty('background', '#3C4C68', 'important');
        this.style.setProperty('border-color', '#3C4C68', 'important');
        this.style.setProperty('box-shadow', '0 24px 60px rgba(0,102,255,0.18)', 'important');
        this.style.setProperty('transform', 'scale(1.04) translateY(-4px)', 'important');
        this.querySelectorAll('.solution-tier, .solution-name, .solution-tagline, .solution-features li, .roi-num, .roi-label').forEach(function(el) {
          el.style.setProperty('color', 'rgba(255,255,255,0.85)', 'important');
        });
        this.querySelectorAll('.solution-features li').forEach(function(el) {
          el.style.setProperty('border-bottom-color', 'rgba(255,255,255,0.07)', 'important');
        });
        const cta = this.querySelector('.solution-cta');
        if (cta) { cta.style.setProperty('background', '#ffffff', 'important'); cta.style.setProperty('color', '#1a1a1a', 'important'); }
        const badge = this.querySelector('.best-value-badge');
        if (badge) badge.style.setProperty('opacity', '0', 'important');
      });
      card.addEventListener('mouseleave', function() {
        if (isFeatured) {
          this.style.setProperty('background', '#ffffff', 'important');
          this.style.setProperty('border-color', '#C9A84C', 'important');
          this.style.setProperty('box-shadow', '0 0 0 1px rgba(201,168,76,0.3), 0 24px 60px rgba(201,168,76,0.15)', 'important');
        } else {
          this.style.removeProperty('background');
          this.style.removeProperty('border-color');
          this.style.removeProperty('box-shadow');
        }
        this.style.removeProperty('transform');
        this.querySelectorAll('.solution-tier, .solution-name, .solution-tagline, .solution-features li, .roi-num, .roi-label').forEach(function(el) {
          el.style.removeProperty('color');
        });
        this.querySelectorAll('.solution-features li').forEach(function(el) {
          el.style.removeProperty('border-bottom-color');
        });
        const cta = this.querySelector('.solution-cta');
        if (cta) { cta.style.setProperty('background', '#1a1a1a', 'important'); cta.style.setProperty('color', '#ffffff', 'important'); }
        const badge = this.querySelector('.best-value-badge');
        if (badge) badge.style.removeProperty('opacity');
      });
    });
    // Hamburger menu mobile
    function toggleMobileMenu() {
      var menu = document.getElementById('mobile-menu');
      var btn = document.getElementById('nav-hamburger');
      menu.classList.toggle('open');
      btn.classList.toggle('open');
    }
    function closeMobileMenu() {
      document.getElementById('mobile-menu').classList.remove('open');
      document.getElementById('nav-hamburger').classList.remove('open');
    }
    // ─── Blog toggle ───
    window.showBlog = function() {
      document.getElementById('main-content').classList.add('hidden');
      document.getElementById('blog-section').classList.add('active');
      window.scrollTo(0, 0);
    };
    window.hideBlog = function() {
      document.getElementById('blog-section').classList.remove('active');
      document.getElementById('main-content').classList.remove('hidden');
    };
    // Intercetta click su link con # (sezioni) per tornare al main content
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      if (link.getAttribute('onclick') && link.getAttribute('onclick').indexOf('showBlog') !== -1) return;
      link.addEventListener('click', function() {
        if (document.getElementById('blog-section').classList.contains('active')) {
          hideBlog();
        }
      });
    });

    // Chiudi menu al click fuori
    document.addEventListener('click', function(e) {
      var menu = document.getElementById('mobile-menu');
      var btn = document.getElementById('nav-hamburger');
      if (menu && menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Uniforma tutte le CTA a "Contatta il team" con link Calendly
    document.querySelectorAll('.solution-cta').forEach(function(cta) {
      cta.textContent = 'Contatta il team';
      cta.style.cursor = 'pointer';
      cta.addEventListener('click', function(e) {
        e.preventDefault();
        openCalendlyByLang();
      });
    });
  });
