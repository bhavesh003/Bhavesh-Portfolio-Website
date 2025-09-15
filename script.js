// Smooth scrolling for navigation links (with offset for fixed navbar)
document.querySelectorAll('.nav_link').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
    // close mobile menu after click
    const navLinks = document.querySelector('.nav-links');
    navLinks?.classList.remove('open');
  });
});

// Toggle project details on mobile screens
if (window.matchMedia('(max-width: 768px)').matches) {
  document.querySelectorAll('.project_title').forEach(title => {
    title.addEventListener('click', function () {
      const details = this.nextElementSibling;
      if (!details) return;
      if (details.style.maxHeight && details.style.maxHeight !== '0px') {
        details.style.maxHeight = '0px';
      } else {
        details.style.maxHeight = details.scrollHeight + 'px';
      }
    });
  });
}

// Animate sections on scroll using IntersectionObserver
const sections = document.querySelectorAll(
  '.infocontainer, .about_container, .experience_container, .academics_container, .project_container, .certification_container, .skill_container, .socialmedia_container, .interest_container'
);

sections.forEach(section => section.classList.add('hidden'));

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

sections.forEach(section => revealObserver.observe(section));

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

// Active nav link on scroll
const sectionsForActive = [
  '#home_section',
  '#about_section',
  '#experience_section',
  '#academic_section',
  '#project_section',
  '#certification_section',
  '#intro_section',
  '#interests_section',
].map(sel => document.querySelector(sel)).filter(Boolean);

const navAnchors = Array.from(document.querySelectorAll('.nav_link'));

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
  });
}, { threshold: 0.5 });

sectionsForActive.forEach(sec => activeObserver.observe(sec));

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

function updateThemeIcon(isDark) {
  if (themeIcon) {
    themeIcon.textContent = isDark ? '🌙' : '☀️';
  }
}

function initializeTheme() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }
}

if (themeToggle) {
  initializeTheme();
  
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
  });
}

// Resume modal
const modal = document.getElementById('resumeModal');
const openResume = document.getElementById('openResume');
const closeResume = document.getElementById('closeResume');
const viewResumeBtn = document.querySelector('.btn');

viewResumeBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  if (modal) modal.classList.add('open');
});

closeResume?.addEventListener('click', () => modal?.classList.remove('open'));
modal?.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('open');
});

// Scroll progress indicator
const scrollProgressEl = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / docHeight) * 100;
  if (scrollProgressEl) {
    scrollProgressEl.style.width = scrolled + '%';
  }
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});