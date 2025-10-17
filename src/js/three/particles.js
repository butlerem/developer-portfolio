import * as THREE from 'three';

export class Particles {
  constructor(scene) {
    this.scene = scene;
    this.points = null;
    this.domParticles = [];
    // Mobile detection for performance optimization
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  }

  init() {
    this.createThreeJSParticles();
    this.createDOMParticles();
  }

  // Three.js background particles
  createThreeJSParticles() {
    // Reduce particle count by 50% on mobile for better performance
    const particleCount = this.isMobile ? 1500 : 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xff4e42);
    const color2 = new THREE.Color(0xc2362f);
    const color3 = new THREE.Color(0xffb3ab);

    for (let i = 0; i < particleCount; i++) {
      // Random position in a cube
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Random color from palette
      const colorChoice = Math.floor(Math.random() * 3);
      const chosenColor = colorChoice === 0 ? color1 : colorChoice === 1 ? color2 : color3;

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float time;
        attribute vec3 color;
        varying vec3 vColor;

        void main() {
          vColor = color;

          vec3 pos = position;
          pos.x += sin(time + position.y * 0.1) * 0.05;
          pos.y += cos(time + position.z * 0.1) * 0.05;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 300.0 / -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = pow(1.0 - dist * 2.0, 2.0);
          gl_FragColor = vec4(vColor, alpha * 0.6);
        }
      `,
      uniforms: {
        time: { value: 0 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);
  }

  // DOM-based floating particles
  createDOMParticles() {
    const container = document.getElementById('particles-container');
    // Reduce DOM particles by 70% on mobile for better performance
    const particleCount = this.isMobile ? 300 : 1000;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const minDistance = 200; // Hollow center

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Polar coordinates for even distribution
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * Math.min(centerX, centerY) * 1.2;

      // Ensure minimum distance from center
      const actualRadius = Math.max(radius, minDistance);

      const x = centerX + Math.cos(angle) * actualRadius;
      const y = centerY + Math.sin(angle) * actualRadius;

      // Random color variation
      const colorValue = Math.floor(Math.random() * 100) + 78; // 78-178
      const opacity = Math.random() * 0.5 + 0.2; // 0.2-0.7

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.background = `rgba(255, ${colorValue}, ${colorValue - 12}, ${opacity})`;

      // Store initial position and animation data
      particle.dataset.x = x;
      particle.dataset.y = y;
      particle.dataset.angle = angle;
      particle.dataset.radius = actualRadius;
      particle.dataset.speed = Math.random() * 0.0005 + 0.0002;
      particle.dataset.phase = Math.random() * Math.PI * 2;

      container.appendChild(particle);
      this.domParticles.push(particle);
    }
  }

  update(time) {
    // Update Three.js particles
    if (this.points) {
      this.points.material.uniforms.time.value = time;
    }

    // Update DOM particles
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    this.domParticles.forEach((particle) => {
      const angle = parseFloat(particle.dataset.angle);
      const radius = parseFloat(particle.dataset.radius);
      const speed = parseFloat(particle.dataset.speed);
      const phase = parseFloat(particle.dataset.phase);

      // Orbital movement with noise
      const newAngle = angle + speed * time;
      const noise = Math.sin(time + phase) * 10;

      const x = centerX + Math.cos(newAngle) * (radius + noise);
      const y = centerY + Math.sin(newAngle) * (radius + noise);

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      // Opacity pulse
      const baseOpacity = Math.random() * 0.5 + 0.2;
      const opacity = baseOpacity + Math.sin(time * 2 + phase) * 0.2;
      particle.style.opacity = Math.max(0.1, Math.min(1, opacity));
    });
  }

  resize() {
    // Reposition DOM particles on resize
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    this.domParticles.forEach((particle) => {
      const angle = parseFloat(particle.dataset.angle);
      const radius = parseFloat(particle.dataset.radius);

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      particle.dataset.x = x;
      particle.dataset.y = y;
    });
  }
}
