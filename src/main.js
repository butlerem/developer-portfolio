// Main entry point
import { LoadingScreen } from './js/ui/loading.js';
import { Navigation } from './js/ui/navigation.js';
import { Notification } from './js/ui/notification.js';
import { ThreeScene } from './js/three/scene.js';
import { Logo } from './js/three/logo.js';
import { Particles } from './js/three/particles.js';
import { ScrollAnimations } from './js/animations/scroll.js';
import { FormHandler } from './js/utils/form.js';

class PortfolioApp {
  constructor() {
    this.loadingScreen = null;
    this.navigation = null;
    this.notification = null;
    this.threeScene = null;
    this.logo = null;
    this.particles = null;
    this.scrollAnimations = null;
    this.formHandler = null;
    this.scrollAmount = 0;
  }

  async init() {
    // Initialize loading screen
    this.loadingScreen = new LoadingScreen();
    this.loadingScreen.init();

    // Hide loading screen after 3 seconds and initialize app
    this.loadingScreen.hide(() => {
      this.initializeApp();
    });
  }

  initializeApp() {
    // Initialize UI components
    this.navigation = new Navigation();
    this.navigation.init();

    this.notification = new Notification();

    // Initialize Three.js scene
    this.initThreeJS();

    // Initialize scroll animations
    this.scrollAnimations = new ScrollAnimations();
    this.scrollAnimations.init();

    // Initialize form handler
    this.formHandler = new FormHandler();
    this.formHandler.init();

    // Setup scroll tracking for Three.js
    this.setupScrollTracking();

    // Setup resize handler
    this.setupResizeHandler();

    // Add initial fade-in for hero section
    setTimeout(() => {
      const heroPanel = document.querySelector('.hero-panel');
      const scannerFrame = document.querySelector('.scanner-frame');
      if (heroPanel) heroPanel.classList.add('visible');
      if (scannerFrame) scannerFrame.style.opacity = '1';
    }, 500);

    console.log('Portfolio initialized successfully');
  }

  initThreeJS() {
    // Create scene
    this.threeScene = new ThreeScene();
    const { scene } = this.threeScene.init();

    // Create logo
    this.logo = new Logo(scene);
    this.logo.init();

    // Create particles
    this.particles = new Particles(scene);
    this.particles.init();

    // Start animation loop
    this.threeScene.animate((time, delta, scrollAmount) => {
      this.logo.update(time, scrollAmount);
      this.particles.update(time);
    });
  }

  setupScrollTracking() {
    let lastScrollY = 0;

    window.addEventListener('scrollupdate', (e) => {
      const { scrollY, scrollProgress } = e.detail;

      // Update Three.js scene with scroll data
      this.threeScene.updateScrollAmount(scrollProgress);

      // Camera position based on scroll
      this.updateCameraPosition(scrollProgress);

      lastScrollY = scrollY;
    });
  }

  updateCameraPosition(scrollProgress) {
    // Adjust camera zoom based on scroll
    const camera = this.threeScene.camera;
    const targetZ = 10 + scrollProgress * 5; // Zoom out as you scroll

    // Smooth camera movement
    camera.position.z += (targetZ - camera.position.z) * 0.05;
  }

  setupResizeHandler() {
    window.addEventListener('resize', () => {
      if (this.particles) {
        this.particles.resize();
      }
    });
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.init();
  });
} else {
  const app = new PortfolioApp();
  app.init();
}

export default PortfolioApp;
