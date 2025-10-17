// Navigation and Timestamp
export class Navigation {
  constructor() {
    this.header = document.getElementById('main-header');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.timestampElement = document.getElementById('timestamp');
  }

  init() {
    this.initSmoothScroll();
    this.initScrollSpy();
    this.startTimestamp();
  }

  // Smooth scroll to sections
  initSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Update active nav link based on scroll position
  initScrollSpy() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // Real-time timestamp
  startTimestamp() {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      this.timestampElement.textContent = `${hours}:${minutes}:${seconds}`;
    };

    updateTime();
    setInterval(updateTime, 1000);
  }
}
