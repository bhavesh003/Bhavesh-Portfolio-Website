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

// Typewriter effect
function startTypewriter() {
  const el = document.querySelector('.tw_text');
  if (!el) return;
  const words = JSON.parse(el.getAttribute('data-words') || '[]');
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = words[wordIndex] || '';
    const shown = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);
    el.textContent = shown;

    if (!deleting && charIndex > current.length + 2) {
      deleting = true;
      setTimeout(tick, 900);
      return;
    }
    if (deleting && charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(tick, 350);
      return;
    }
    setTimeout(tick, deleting ? 40 : 70);
  }
  tick();
}
startTypewriter();

// Read More toggle (About)
const aboutToggle = document.getElementById('aboutToggle');
const aboutMore = document.querySelector('#about_section .about_more');
if (aboutToggle && aboutMore) {
  aboutToggle.addEventListener('click', () => {
    const expanded = aboutToggle.getAttribute('aria-expanded') === 'true';
    aboutToggle.setAttribute('aria-expanded', String(!expanded));
    aboutMore.toggleAttribute('aria-hidden');
    aboutToggle.textContent = expanded ? 'Read More' : 'Show Less';
  });
}

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
openResume?.addEventListener('click', () => modal?.classList.add('open'));
closeResume?.addEventListener('click', () => modal?.classList.remove('open'));
modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

// Contact form via EmailJS (requires configuration)
window.addEventListener('load', () => {
  if (window.emailjs) {
    // emailjs.init('YOUR_PUBLIC_KEY');
  }
});

// Scroll progress indicator
const progressEl = document.getElementById('progress');
const scrollProgressEl = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  if (!progressEl) return;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / docHeight) * 100;
  progressEl.style.width = scrolled + '%';
  
  // Update custom scroll progress bar
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

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm?.querySelector('.submit_btn');
const btnText = submitBtn?.querySelector('.btn_text');
const btnLoading = submitBtn?.querySelector('.btn_loading');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!submitBtn || !btnText || !btnLoading) return;
  
  // Show loading state
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };
  
  try {
    // Simulate API call (replace with actual email service)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
    
  } catch (error) {
    alert('Sorry, there was an error sending your message. Please try again.');
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  }
});
