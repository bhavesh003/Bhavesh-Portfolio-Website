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

// Animate sections on scroll using IntersectionObserver
const sections = document.querySelectorAll(
    '.infocontainer, .about_container, .experience_container, .academics_container, .project_container, .certification_container, .skill_container, .socialmedia_container, .interest_container, .contact_container'
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
const openResumeBtn = document.getElementById('openResume');
const closeResumeBtn = document.getElementById('closeResume');

openResumeBtn?.addEventListener('click', () => {
    modal?.classList.add('open');
});

closeResumeBtn?.addEventListener('click', () => modal?.classList.remove('open'));

modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
        modal.classList.remove('open');
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

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill_item');

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.progress_fill');
            const percentage = fill.dataset.progress;
            fill.style.width = `${percentage}%`;
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});