document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            } else {
                mobileMenu.style.maxHeight = '0';
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.maxHeight = '0';
            });
        });
    }

    // Intersection Observer for scroll animations
    const animateElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Apply delay if specified
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.classList.add(`delay-${delay}`);
                }
                observer.unobserve(entry.target); // Unobserve once animated
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the item is visible
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add active class to current nav link
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        let linkPath = link.getAttribute('href').replace(/^\.\.\//, '').replace(/^\.\//, '');
        let currentPathClean = currentPath.replace(/^\//, '').replace(/^pages\//, '');

        if (linkPath === 'index.html' && (currentPathClean === '' || currentPathClean === 'index.html')) {
            link.classList.add('active');
        } else if (linkPath !== 'index.html' && currentPathClean.includes(linkPath)) {
            link.classList.add('active');
        }
    });

});
