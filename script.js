console.log("Running........");

// Hide the cross icon initially
document.querySelector('.cross').style.display = 'none';

// Add event listener to the hamburger icon for sidebar toggle
document.querySelector('.hamburger').addEventListener("click", () => {
    document.querySelector('.sidebar').classList.toggle('sidebargo');
    
    // Toggle visibility of hamburger and cross icons
    if (document.querySelector('.sidebar').classList.contains('sidebargo')) {
        setTimeout(() => {
            document.querySelector('.ham').style.display = 'inline';
        }, 350);
        document.querySelector('.cross').style.display = 'none';
    } else {
        document.querySelector('.ham').style.display = 'none';
        setTimeout(() => {
            document.querySelector('.cross').style.display = 'inline';
        }, 350);
    }
});

// Smooth scrolling effect for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
