// Loading Screen Animation
export class LoadingScreen {
  constructor() {
    this.overlay = document.getElementById('loading-overlay');
    this.canvas = document.getElementById('preloader');
    this.ctx = this.canvas.getContext('2d');
    this.animationId = null;
    this.startTime = Date.now();
  }

  init() {
    this.animate();
  }

  animate() {
    const time = (Date.now() - this.startTime) / 1000;

    // Clear canvas
    this.ctx.clearRect(0, 0, 180, 180);

    // Draw expanding circles
    const centerX = 90;
    const centerY = 90;
    const maxRadius = 80;
    const circleCount = 5;
    const dotCount = 24;

    for (let i = 0; i < circleCount; i++) {
      const circlePhase = (time * 0.3 + i / circleCount) % 1;
      const radius = circlePhase * maxRadius;
      const opacity = 1 - circlePhase;

      // Draw circle outline
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(255, 78, 66, ${opacity * 0.2})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // Draw dots
      for (let j = 0; j < dotCount; j++) {
        const angle = (j / dotCount) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const dotSize = 2 * (1 - circlePhase * 0.5);

        // Draw radial line
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = `rgba(255, 78, 66, ${opacity * 0.1})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // Draw dot
        this.ctx.beginPath();
        this.ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 78, 66, ${opacity * 0.9})`;
        this.ctx.fill();
      }
    }

    // Draw center dot
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(255, 78, 66, 0.9)';
    this.ctx.fill();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  hide(callback) {
    // Stop animation after 3 seconds
    setTimeout(() => {
      cancelAnimationFrame(this.animationId);

      // Fade out
      this.overlay.classList.add('fade-out');

      // Remove from DOM after fade
      setTimeout(() => {
        this.overlay.style.display = 'none';
        if (callback) callback();
      }, 500);
    }, 3000);
  }
}
