const root = document.documentElement;
const body = document.body;
const header = document.querySelector('.header');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const year = document.getElementById('year');
const backToTop = document.getElementById('backToTop');
const copyEmail = document.getElementById('copyEmail');
const copyNote = document.getElementById('copyNote');
const contactForm = document.getElementById('contactForm');
const typedLine = document.getElementById('typedLine');

const EMAIL = 'emanzaarour9@gmail.com';

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
}
themeIcon.textContent = root.getAttribute('data-theme') === 'dark' ? '☾' : '☀';

themeToggle.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
  themeIcon.textContent = nextTheme === 'dark' ? '☾' : '☀';
});

menuToggle.addEventListener('click', () => {
  const isOpen = body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const updateChrome = () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
  backToTop.classList.toggle('visible', window.scrollY > 550);
};

window.addEventListener('scroll', updateChrome, { passive: true });
updateChrome();

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const navItems = [...document.querySelectorAll('.nav-links a')];
const sections = navItems
  .map((item) => document.querySelector(item.getAttribute('href')))
  .filter(Boolean);

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((item) => item.classList.toggle('active', item.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { threshold: 0.36 });

sections.forEach((section) => activeObserver.observe(section));

const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const target = Number(entry.target.dataset.counter);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 70));
    const update = () => {
      current = Math.min(target, current + increment);
      entry.target.textContent = current;
      if (current < target) requestAnimationFrame(update);
    };
    update();
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));

const typedPhrases = [
  'Transforming ideas into clean digital experiences.',
  'Building data-informed solutions with Python.',
  'Designing STEAM lessons students can enjoy.',
  'Creating responsive web projects with purpose.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const phrase = typedPhrases[phraseIndex];
  typedLine.textContent = phrase.slice(0, charIndex);
  if (!isDeleting && charIndex < phrase.length) {
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else if (!isDeleting && charIndex === phrase.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1200);
    return;
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typedPhrases.length;
  }
  setTimeout(typeLoop, isDeleting ? 34 : 58);
}

typeLoop();

const skillTabs = document.querySelectorAll('.skill-tab');
const skillGroups = document.querySelectorAll('.skill-group');
skillTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    skillTabs.forEach((item) => item.classList.remove('active'));
    skillGroups.forEach((group) => group.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.skill).classList.add('active');
  });
});

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const value = filter.dataset.filter;
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    projects.forEach((project) => {
      const visible = value === 'all' || project.dataset.category.split(' ').includes(value);
      project.classList.toggle('hidden', !visible);
    });
  });
});

const caseStudies = {
  makeup: {
    type: 'Full-stack / AI concept',
    title: 'AI Makeup Shopping Website with Virtual Try‑On',
    summary: 'A full-stack e-commerce project designed for makeup shopping, combining product browsing with an AI-powered virtual try-on feature.',
    points: [
      'Built with PHP, MySQL, HTML, CSS, and JavaScript.',
      'Included authentication, product catalog, shopping cart, wishlist, checkout, and admin dashboard features.',
      'Designed a responsive interface connected to a MySQL database.',
      'Focused on a real-world beauty shopping use case with interactive try-on behavior.'
    ]
  },
  data: {
    type: 'AI & Data Science',
    title: 'Data Science & Machine Learning Project',
    summary: 'A data-focused project using Python notebooks to clean, explore, visualize, and model real-world datasets.',
    points: [
      'Used Python, Pandas, NumPy, Matplotlib, Scikit-learn, and Jupyter Notebook.',
      'Performed data preprocessing, cleaning, exploratory data analysis, and visualization.',
      'Built and evaluated machine learning models for predictive analysis.',
      'Presented findings through clear visual reports and structured insights.'
    ]
  },
  academy: {
    type: 'Web application',
    title: 'Academy Management System',
    summary: 'A web-based system for academy operations with database-managed records and user-facing services.',
    points: [
      'Developed using PHP, HTML, CSS, JavaScript, and SQL.',
      'Implemented user authentication and course enrollment features.',
      'Added certificate generation to support academy workflows.',
      'Integrated an SQL database to manage users, courses, and records.'
    ]
  }
};

const modal = document.getElementById('projectModal');
const modalType = document.getElementById('modalType');
const modalTitle = document.getElementById('modalTitle');
const modalSummary = document.getElementById('modalSummary');
const modalPoints = document.getElementById('modalPoints');
let lastFocusedElement = null;

function openModal(key) {
  const study = caseStudies[key];
  if (!study) return;
  lastFocusedElement = document.activeElement;
  modalType.textContent = study.type;
  modalTitle.textContent = study.title;
  modalSummary.textContent = study.summary;
  modalPoints.innerHTML = study.points.map((point) => `<div>${point}</div>`).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('[data-modal]').forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.modal));
});

document.querySelectorAll('[data-close-modal]').forEach((item) => {
  item.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

const tiltCard = document.querySelector('.tilt-card');
if (tiltCard && window.matchMedia('(pointer: fine)').matches) {
  tiltCard.addEventListener('mousemove', (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = -((y / rect.height) - 0.5) * 8;
    tiltCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
}

copyEmail.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copyNote.textContent = 'Email copied successfully.';
  } catch (error) {
    copyNote.textContent = EMAIL;
  }
  setTimeout(() => { copyNote.textContent = ''; }, 2600);
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(contactForm);
  const name = form.get('name');
  const email = form.get('email');
  const message = form.get('message');
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const bodyMessage = encodeURIComponent(`Hello Eman,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${bodyMessage}`;
});
