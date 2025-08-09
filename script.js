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

// Toggle project details
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

// Footer current year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

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
  '#contact_section'
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
