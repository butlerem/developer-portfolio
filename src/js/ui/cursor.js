// Custom sci-fi cursor system
export class CustomCursor {
  constructor() {
    this.cursor = null;
    this.cursorDot = null;
    this.cursorRing = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.isHovering = false;
    this.isClicking = false;
  }

  init() {
    this.createCursor();
    this.setupEventListeners();
    this.startAnimation();
  }

  createCursor() {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Create cursor container
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    
    // Create cursor dot (center)
    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'cursor-dot';
    
    // Create cursor ring (outer circle)
    this.cursorRing = document.createElement('div');
    this.cursorRing.className = 'cursor-ring';
    
    // Create scan lines effect
    const scanLines = document.createElement('div');
    scanLines.className = 'cursor-scan-lines';
    
    // Create trailing particles
    const trailParticles = document.createElement('div');
    trailParticles.className = 'cursor-trail';
    
    // Assemble cursor
    this.cursor.appendChild(this.cursorDot);
    this.cursor.appendChild(this.cursorRing);
    this.cursor.appendChild(scanLines);
    this.cursor.appendChild(trailParticles);
    
    document.body.appendChild(this.cursor);
  }

  setupEventListeners() {
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Handle mouse leave/enter
    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
    });

    // Handle click states
    document.addEventListener('mousedown', () => {
      this.isClicking = true;
      this.cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
      this.isClicking = false;
      this.cursor.classList.remove('clicking');
    });

    // Handle hover states for interactive elements
    const interactiveElements = [
      'a', 'button', '.project-button', '.social-button', 
      '.nav-link', '.skill-bar', '.drag-handle', '.tech-pill',
      '.project-screenshot', 'input', 'textarea', 'select'
    ].join(', ');

    document.addEventListener('mouseover', (e) => {
      if (e.target.matches(interactiveElements) || e.target.closest(interactiveElements)) {
        this.isHovering = true;
        this.cursor.classList.add('hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.matches(interactiveElements) || e.target.closest(interactiveElements)) {
        this.isHovering = false;
        this.cursor.classList.remove('hovering');
      }
    });
  }

  startAnimation() {
    const animate = () => {
      // Direct cursor movement - no lag
      this.cursorX = this.mouseX;
      this.cursorY = this.mouseY;
      
      // Update cursor position immediately
      this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
      
      requestAnimationFrame(animate);
    };
    animate();
  }
}