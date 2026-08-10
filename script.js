/* ==========================================================================
   KARTHIKEYAN SELVAMANI — PORTFOLIO INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- LOADER ---------------- */
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');
  const loaderStatus = document.getElementById('loaderStatus');
  const statuses = ['loading assets…','compiling shaders…','warming up the orb…','ready.'];
  let p = 0, si = 0;
  const loadTimer = setInterval(() => {
    p += Math.random() * 18 + 8;
    if (p >= 100) { p = 100; clearInterval(loadTimer); }
    loaderProgress.style.width = p + '%';
    if (p > si * 25 && si < statuses.length - 1) { si++; }
    loaderStatus.textContent = statuses[si];
    if (p === 100) {
      loaderStatus.textContent = statuses[statuses.length - 1];
      setTimeout(() => loader.classList.add('hide'), 350);
    }
  }, 180);
  // safety fallback
  setTimeout(() => loader.classList.add('hide'), 2600);

  /* ---------------- AOS ---------------- */
  if (window.AOS) {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* ---------------- TYPED.JS ---------------- */
  if (window.Typed) {
    new Typed('#typed', {
      strings: [
        'Computer Vision Engineer',
        'Robotics &amp; IoT Builder',
        'Generative AI Developer',
        'Published Researcher — ICICEA\'26',
        'General Secretary, CSEA'
      ],
      typeSpeed: 42,
      backSpeed: 22,
      backDelay: 1500,
      startDelay: 300,
      loop: true,
      smartBackspace: true
    });
  }

  /* ---------------- PARTICLES.JS ---------------- */
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 900 } },
        color: { value: ['#22d3ee', '#8b6bf2', '#f472b6'] },
        shape: { type: 'circle' },
        opacity: { value: 0.45, random: true },
        size: { value: 2.4, random: true },
        line_linked: { enable: true, distance: 140, color: '#3a4166', opacity: 0.25, width: 1 },
        move: { enable: true, speed: 0.7, direction: 'none', random: true, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 150, line_linked: { opacity: 0.4 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  /* ---------------- NAVBAR SCROLL STATE ---------------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const scrollBar = document.getElementById('scrollProgressBar');

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('show', y > 500);

    const h = document.documentElement;
    const scrollPct = (h.scrollTop || document.body.scrollTop) / ((h.scrollHeight || document.body.scrollHeight) - h.clientHeight) * 100;
    scrollBar.style.width = scrollPct + '%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------------- MOBILE NAV TOGGLE ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---------------- CURSOR GLOW ---------------- */
  const glow = document.getElementById('cursorGlow');
  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });

  /* ---------------- MOUSE PARALLAX ON ORB ---------------- */
  const orbStage = document.querySelector('.orb-stage');
  if (orbStage) {
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
      const rect = document.querySelector('.hero').getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      orbStage.style.transform = `translate(${relX * 18}px, ${relY * 18}px)`;
    });
  }

  /* ---------------- MAGNETIC BUTTONS ---------------- */
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* ---------------- RIPPLE EFFECT ---------------- */
  document.querySelectorAll('.ripple').forEach(el => {
    el.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });

  /* ---------------- TILT ON PROJECT CARDS ---------------- */
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ---------------- ANIMATED COUNTERS ---------------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const isDecimal = target % 1 !== 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isDecimal ? target.toFixed(1) : target;
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------- SKILL BARS ---------------- */
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.getAttribute('data-width') + '%';
        barObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barObserver.observe(b));

  /* ---------------- CONTACT FORM (mailto fallback, no backend) ---------------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:karthikeyanofficial46@gmail.com?subject=${subject}&body=${body}`;
    formNote.textContent = 'Opening your email client…';
    setTimeout(() => { formNote.textContent = ''; }, 4000);
  });

  /* ---------------- LIGHTBOX GALLERY ---------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.lightbox-trigger img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.getAttribute('data-full') || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------------- FOOTER YEAR ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------- SMOOTH ANCHOR SCROLL OFFSET ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.pageYOffset - 84;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

});
