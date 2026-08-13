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
      <div class="project-thumb" style="background:${p.color}">${p.icon}</div>
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

/* ---------- Init ---------- */
renderProjects();
observeReveals();

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
