// Smooth scrolling for navigation links
document.querySelectorAll('.nav_link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Toggle project details
document.querySelectorAll('.project_title').forEach(title => {
    title.addEventListener('click', function() {
        const details = this.nextElementSibling;

        if (details.style.maxHeight) {
            details.style.maxHeight = null;
        } else {
            details.style.maxHeight = details.scrollHeight + 'px';
        }
    });
});

// Animate sections
const sections = document.querySelectorAll('.infocontainer, .about_container, .academics_container, .project_container, .certification_container, .skill_container, .socialmedia_container');

sections.forEach(section => {
    section.classList.add('hidden');
});

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.remove('hidden');
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
            section.classList.add('hidden');
        }
    });
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
