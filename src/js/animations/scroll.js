// Scroll-triggered animations
export class ScrollAnimations {
  constructor() {
    this.panels = document.querySelectorAll('.panel');
    this.sections = document.querySelectorAll('section');
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollTracking();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Animate skill bars if in skills section
          if (entry.target.id === 'skills') {
            this.animateSkillBars();
          }
        }
      });
    }, observerOptions);

    // Observe all panels and sections
    this.panels.forEach(panel => observer.observe(panel));
    this.sections.forEach(section => observer.observe(section));
  }

  setupScrollTracking() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  handleScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);

    // Dispatch custom event with scroll data
    window.dispatchEvent(new CustomEvent('scrollupdate', {
      detail: { scrollY, scrollProgress }
    }));
  }

  animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const percent = bar.dataset.percent;
        bar.style.width = `${percent}%`;
        bar.classList.add('animated');
      }, index * 100); // Stagger animation
    });
  }
}
