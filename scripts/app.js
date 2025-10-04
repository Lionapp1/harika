document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  // Intersection Observer for fade-in effect
  const sections = document.querySelectorAll('section, footer');
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach((section) => {
    section.classList.add('opacity-0'); // Add initial opacity for animation
    observer.observe(section);
  });

  // Hero title text reveal animation
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.setProperty('--delay', `${index * 0.05}s`);
      heroTitle.appendChild(span);
    });
  }

  // Simple page transition effect
  document.querySelectorAll('a').forEach((link) => {
    if (link.hostname === window.location.hostname && !link.getAttribute('href').startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.add('page-transition-leave-active');
        setTimeout(() => {
          window.location.href = link.href;
        }, 500); // Match the transition duration in CSS
      });
    }
  });

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      document.body.classList.remove('page-transition-leave-active');
      document.body.classList.add('page-transition-enter-active');
      setTimeout(() => {
        document.body.classList.remove('page-transition-enter-active');
      }, 500);
    }
  });
});