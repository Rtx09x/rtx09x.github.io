/**
 * Navigation Logic
 * Handles active state mapping between scroll position and rail items.
 */

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-destination');
    const sections = document.querySelectorAll('section');

    const updateActiveNav = () => {
        let currentSectionId = '';

        // Find the section currently in view (approx middle of screen)
        const scrollPosition = window.scrollY + (window.innerHeight / 2);

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            // Check if href matches #sectionId
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    // Initial call
    updateActiveNav();
});
