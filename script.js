/* =========================================================
   Portfolio — vanilla JavaScript
   ========================================================= */

/* ---------- Data ---------- */
const projects = [
  {
    title: 'Task Flow',
    description: 'A drag-and-drop task manager with real-time sync and offline support.',
    tags: ['React', 'Node.js', 'WebSocket'],
    category: 'app',
    color: 'linear-gradient(135deg, #5b7cfa, #a06bff)',
    icon: '✅',
    demo: '#',
    code: '#',
  },
  {
    title: 'Weather Now',
    description: 'A clean weather dashboard pulling live data from multiple APIs.',
    tags: ['JavaScript', 'API', 'CSS'],
    category: 'web',
    color: 'linear-gradient(135deg, #00b4d8, #48cae4)',
    icon: '🌤️',
    demo: '#',
    code: '#',
  },
  {
    title: 'Shopify Clone',
    description: 'A full e-commerce storefront with cart, checkout, and Stripe payments.',
    tags: ['Next.js', 'Stripe', 'TypeScript'],
    category: 'web',
    color: 'linear-gradient(135deg, #2fa96b, #7ed957)',
    icon: '🛒',
    demo: '#',
    code: '#',
  },
  {
    title: 'Fit Tracker',
    description: 'A mobile-first workout logger with charts and progress goals.',
    tags: ['React Native', 'Chart.js'],
    category: 'app',
    color: 'linear-gradient(135deg, #f7971e, #ffd200)',
    icon: '💪',
    demo: '#',
    code: '#',
  },
  {
    title: 'Brand System',
    description: 'A design system and component library with 40+ reusable UI pieces.',
    tags: ['Figma', 'Design', 'Storybook'],
    category: 'design',
    color: 'linear-gradient(135deg, #e5484d, #ff7a85)',
    icon: '🎨',
    demo: '#',
    code: '#',
  },
  {
    title: 'DevBlog',
    description: 'A markdown-powered blog with syntax highlighting and dark mode.',
    tags: ['Astro', 'Markdown', 'CSS'],
    category: 'web',
    color: 'linear-gradient(135deg, #6a3de8, #b16cff)',
    icon: '📝',
    demo: '#',
    code: '#',
  },
];

/* Featured slides for the pinned scroll showcase.
   bg = full-bleed background image, screen = image shown in the device. */
const featured = [
  {
    num: '01 / CASE 01',
    title: 'Reducomply — Compliance Platform',
    tags: ['Product Design', 'Research', 'Design System'],
    desc: 'Architected an enterprise compliance platform balancing 5 permission tiers — from Super Admin to auditor. Built a scalable design system that eliminated UI fragmentation across 20+ screens.',
    bg: 'https://picsum.photos/id/180/1600/900',
    screen: 'https://picsum.photos/id/2/900/700',
    tint: '#243a6b',
  },
  {
    num: '02 / CASE 02',
    title: 'Task Flow — Realtime Workspace',
    tags: ['Product Design', 'Frontend', 'Motion'],
    desc: 'A drag-and-drop workspace with realtime sync and offline support. Designed the interaction model and shipped a fluid, latency-hiding UI that feels instant even on flaky networks.',
    bg: 'https://picsum.photos/id/48/1600/900',
    screen: 'https://picsum.photos/id/20/900/700',
    tint: '#0b6b5f',
  },
  {
    num: '03 / CASE 03',
    title: 'The Healing Dawn — UI Redesign',
    tags: ['UI Design', 'Visual Design', 'Wellness'],
    desc: 'Scaled a creative concept into a production visual language. Designed responsive layouts, a typography scale, and component states for high-converting wellness landing pages.',
    bg: 'https://picsum.photos/id/152/1600/900',
    screen: 'https://picsum.photos/id/64/900/700',
    tint: '#6b2d4a',
  },
  {
    num: '04 / CASE 04',
    title: 'Fit Tracker — Mobile Analytics',
    tags: ['Mobile', 'Data Viz', 'Prototyping'],
    desc: 'A mobile-first workout logger with progress charts and goal streaks. Ran user research, built interactive prototypes, and handed off production-ready specs to engineering.',
    bg: 'https://picsum.photos/id/119/1600/900',
    screen: 'https://picsum.photos/id/26/900/700',
    tint: '#7a5a1e',
  },
];

const skills = [
  { name: 'JavaScript / TypeScript', level: 92 },
  { name: 'React & Next.js', level: 88 },
  { name: 'HTML & CSS', level: 95 },
  { name: 'Node.js & Express', level: 82 },
  { name: 'UI / UX Design', level: 75 },
  { name: 'Databases (SQL / NoSQL)', level: 78 },
];

/* ---------- Render projects ---------- */
const projectsGrid = document.getElementById('projectsGrid');

function renderProjects(filter = 'all') {
  projectsGrid.innerHTML = '';
  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  list.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.innerHTML = `
      <div class="project-thumb blur-scroll" style="background:${p.color}">${p.icon}</div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        <div class="project-links">
          <a href="${p.demo}" target="_blank" rel="noopener">Live Demo ↗</a>
          <a href="${p.code}" target="_blank" rel="noopener">Code ↗</a>
        </div>
      </div>`;
    projectsGrid.appendChild(card);
  });

  // Re-run reveal observer on the new cards
  observeReveals();
}

/* ---------- Project filters ---------- */
document.getElementById('filters').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  renderProjects(btn.dataset.filter);
  if (typeof setupBlur === 'function') setupBlur(); // re-bind blur to the new cards
});

/* ---------- Render skills ---------- */
const skillsGrid = document.getElementById('skillsGrid');
skills.forEach((s) => {
  const el = document.createElement('div');
  el.className = 'skill reveal';
  el.innerHTML = `
    <div class="skill-head"><span>${s.name}</span><span>${s.level}%</span></div>
    <div class="skill-bar"><div class="skill-fill" data-level="${s.level}"></div></div>`;
  skillsGrid.appendChild(el);
});

/* ---------- Theme toggle ---------- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}

const savedTheme =
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ---------- Mobile nav ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach((link) =>
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

/* ---------- Navbar scroll state + active link ---------- */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinkEls.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* ---------- Scroll reveal (IntersectionObserver) ---------- */
let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars when they appear
            const fill = entry.target.querySelector('.skill-fill');
            if (fill) fill.style.width = fill.dataset.level + '%';

            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => revealObserver.observe(el));
}

/* ---------- Animated counters ---------- */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = +el.dataset.count;
    let count = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const tick = () => {
      count = Math.min(target, count + step);
      el.textContent = count + (count >= target ? '+' : '');
      if (count < target) requestAnimationFrame(tick);
    };
    tick();
  });
}

const aboutSection = document.getElementById('about');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);
counterObserver.observe(aboutSection);

/* ---------- Contact form validation ---------- */
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const validators = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.'),
  message: (v) => (v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'),
};

function validateField(field) {
  const group = field.closest('.form-group');
  const errorEl = form.querySelector(`.error-msg[data-for="${field.name}"]`);
  const error = validators[field.name](field.value);
  group.classList.toggle('invalid', !!error);
  if (errorEl) errorEl.textContent = error;
  return !error;
}

form.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if (field.closest('.form-group').classList.contains('invalid')) validateField(field);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll('input, textarea')];
  const valid = fields.map(validateField).every(Boolean);

  if (!valid) {
    formStatus.textContent = 'Please fix the errors above.';
    formStatus.className = 'form-status';
    return;
  }

  // No backend here — simulate a successful send.
  formStatus.textContent = '✓ Thanks! Your message has been sent.';
  formStatus.className = 'form-status success';
  form.reset();
});

/* ---------- Back to top ---------- */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Smooth scroll + scroll-linked blur ---------- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
const hasLenis = typeof Lenis !== 'undefined';

let lenis = null;

function initSmoothScroll() {
  if (prefersReducedMotion || !hasLenis) return;

  lenis = new Lenis({ duration: 1.2, smoothWheel: true });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Make anchor links work with Lenis
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -68 });
      }
    });
  });

  if (hasGSAP) lenis.on('scroll', ScrollTrigger.update);
}

/* Blur farther from viewport center. Two engines: GSAP (smoothest) or vanilla fallback. */
const MAX_BLUR = 12;   // px
const MAX_SCALE = 0.1; // extra zoom at max blur
let vanillaBlurBound = false;

function setupBlur() {
  if (prefersReducedMotion) return;

  if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);
    // Remove triggers from a previous render (e.g. after filtering projects)
    ScrollTrigger.getAll().forEach((t) => {
      if (t.vars && t.vars.id === 'blur') t.kill();
    });

    gsap.utils.toArray('.blur-scroll').forEach((el) => {
      // Blur in as it rises from the bottom, sharp at center, blur back out toward the top.
      gsap.fromTo(
        el,
        { filter: `blur(${MAX_BLUR}px)`, scale: 1 + MAX_SCALE },
        {
          filter: 'blur(0px)',
          scale: 1,
          ease: 'none',
          scrollTrigger: { id: 'blur', trigger: el, start: 'top bottom', end: 'center center', scrub: true },
        }
      );
      gsap.fromTo(
        el,
        { filter: 'blur(0px)', scale: 1 },
        {
          filter: `blur(${MAX_BLUR}px)`,
          scale: 1 + MAX_SCALE,
          ease: 'none',
          scrollTrigger: { id: 'blur', trigger: el, start: 'center center', end: 'bottom top', scrub: true },
        }
      );
    });
    ScrollTrigger.refresh();
    return;
  }

  // Vanilla fallback (no libraries): compute blur from distance to viewport center.
  document.documentElement.classList.add('no-gsap');

  const update = () => {
    const center = window.innerHeight / 2;
    document.querySelectorAll('.blur-scroll').forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.min(1, Math.abs(elCenter - center) / center);
      el.style.filter = `blur(${(dist * MAX_BLUR).toFixed(2)}px)`;
      el.style.transform = `scale(${1 + dist * MAX_SCALE})`;
    });
    vanillaBlurTicking = false;
  };

  if (!vanillaBlurBound) {
    const onScroll = () => {
      if (!vanillaBlurTicking) {
        requestAnimationFrame(update);
        vanillaBlurTicking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    vanillaBlurBound = true;
  }
  update(); // paint immediately for the current (and any new) elements
}
let vanillaBlurTicking = false;

/* ---------- Pinned scroll showcase ---------- */
const showcaseTrack = document.getElementById('showcaseTrack');
const slidesEl = document.getElementById('slides');
const dotsEl = document.getElementById('showcaseDots');

function renderShowcase() {
  // Track height: one viewport of scrolling per slide.
  showcaseTrack.style.height = featured.length * 100 + 'vh';

  slidesEl.innerHTML = featured
    .map(
      (f) => `
      <div class="slide">
        <div class="slide-bg" style="background-color:${f.tint};background-image:url('${f.bg}')"></div>
        <div class="slide-inner">
          <div class="slide-left">
            <span class="slide-num">${f.num}</span>
            <h3>${f.title}</h3>
            <div class="slide-tags">${f.tags.map((t) => `<span>${t}</span>`).join('')}</div>
          </div>
          <div class="slide-device" style="background-color:${f.tint};background-image:url('${f.screen}')"></div>
          <div class="slide-right">
            <p>${f.desc}</p>
            <a href="#projects">Explore Case Study →</a>
          </div>
        </div>
      </div>`
    )
    .join('');

  dotsEl.innerHTML = featured
    .map((_, i) => `<button data-i="${i}" aria-label="Go to slide ${i + 1}"></button>`)
    .join('');

  // Click a dot to jump to that slide's scroll position.
  dotsEl.querySelectorAll('button').forEach((b) => {
    b.addEventListener('click', () => {
      const i = +b.dataset.i;
      const total = showcaseTrack.offsetHeight - window.innerHeight;
      const trackTop = showcaseTrack.getBoundingClientRect().top + window.scrollY;
      const y = trackTop + (i / (featured.length - 1)) * total;
      if (lenis) lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}

const slideNodes = () => slidesEl.querySelectorAll('.slide');
const dotNodes = () => dotsEl.querySelectorAll('button');

function driveShowcase() {
  if (!showcaseTrack) return;
  const slides = slideNodes();
  const dots = dotNodes();
  const n = featured.length;

  // Absolute document offset of the track (offsetTop is unreliable because
  // .showcase is a positioned offset-parent, so it can report 0).
  const rect = showcaseTrack.getBoundingClientRect();
  const start = rect.top + window.scrollY;
  const total = showcaseTrack.offsetHeight - window.innerHeight;
  // progress 0 → 1 across the whole pinned track
  const progress = Math.min(1, Math.max(0, (window.scrollY - start) / total));
  const pos = progress * (n - 1); // fractional slide position
  const active = Math.round(pos);

  slides.forEach((slide, i) => {
    const dist = Math.abs(i - pos); // 0 when centered, grows as it leaves
    const bg = slide.querySelector('.slide-bg');
    const inner = slide.querySelector('.slide-inner');

    if (prefersReducedMotion) {
      slide.style.opacity = dist < 0.5 ? 1 : 0;
      return;
    }

    // The signature move: sharp & solid when centered, blur + scale OUT as it leaves.
    const opacity = Math.max(0, 1 - dist);
    const blur = Math.min(18, dist * 18);
    slide.style.opacity = opacity;
    slide.style.zIndex = String(10 - Math.round(dist));
    slide.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';

    // Direction of travel: <0 = already passed (leaving upward), >0 = still incoming.
    const dir = i - pos;

    // "Blur outward": the LEAVING slide zooms up + blurs as if rushing past the
    // viewer; the INCOMING slide eases in from slightly smaller. This directional
    // scale is what makes the blur read as expanding outward rather than a flat fade.
    const bgScale = dir <= 0 ? 1.1 + dist * 0.4 : 1.1 - dist * 0.06;
    bg.style.filter = `blur(${blur}px) brightness(${1 - dist * 0.35})`;
    bg.style.transform = `scale(${bgScale})`;

    const innerScale = dir <= 0 ? 1 + dist * 0.35 : 1 - dist * 0.08;
    inner.style.filter = `blur(${Math.min(14, dist * 14)}px)`;
    inner.style.transform = `scale(${innerScale})`;
  });

  dots.forEach((d, i) => d.classList.toggle('active', i === active));
}

/* ---------- Init ---------- */
renderProjects();
renderShowcase();
observeReveals();
initSmoothScroll();
setupBlur();
driveShowcase();

// Drive the showcase every scroll frame (works with native scroll and Lenis).
let showcaseTicking = false;
function onShowcaseScroll() {
  if (!showcaseTicking) {
    requestAnimationFrame(() => {
      driveShowcase();
      showcaseTicking = false;
    });
    showcaseTicking = true;
  }
}
window.addEventListener('scroll', onShowcaseScroll, { passive: true });
window.addEventListener('resize', () => {
  renderShowcase(); // recompute track height on resize
  driveShowcase();
});
if (lenis) lenis.on('scroll', onShowcaseScroll);

// Reveal hero content immediately
document.querySelectorAll('.hero-inner > *').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 120 * i + 100);
});
