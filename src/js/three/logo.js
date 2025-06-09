import * as THREE from 'three';
import vertexShader from '../../shaders/vertex.glsl?raw';
import fragmentShader from '../../shaders/fragment.glsl?raw';

export class Logo {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.innerGlow = null;
    this.rotationSpeed = 1.0;
    this.distortion = 1.0;
  }

  init() {
    this.createGeometry();
  }

  createGeometry() {
    // Create icosahedron geometry (or custom logo geometry)
    const geometry = new THREE.IcosahedronGeometry(2, 2);

    // Outer wireframe material with shader
    const outerMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xff4e42) },
        distortion: { value: this.distortion },
        scrollAmount: { value: 0 }
      },
      wireframe: true,
      transparent: true,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(geometry, outerMaterial);
    this.scene.add(this.mesh);

    // Inner glow sphere
    const glowGeometry = new THREE.SphereGeometry(2.4, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;

        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 3.0);
          float pulse = 0.8 + 0.2 * sin(time * 0.5);

          vec3 finalColor = color * fresnel * pulse * 3.0;
          float alpha = fresnel * 0.5;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xff4e42) }
      },
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.innerGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    this.scene.add(this.innerGlow);
  }

  update(time, scrollAmount) {
    if (this.mesh) {
      // Update shader uniforms
      this.mesh.material.uniforms.time.value = time;
      this.mesh.material.uniforms.scrollAmount.value = scrollAmount;

      // Rotation with scroll influence
      const scrollFactor = 1 + scrollAmount * 2;
      this.mesh.rotation.y += 0.005 * this.rotationSpeed * scrollFactor;
      this.mesh.rotation.z += 0.002 * this.rotationSpeed * scrollFactor;
    }

    if (this.innerGlow) {
      // Update glow
      this.innerGlow.material.uniforms.time.value = time;
      this.innerGlow.rotation.y = this.mesh.rotation.y;
      this.innerGlow.rotation.z = this.mesh.rotation.z;
    }
  }

  setRotationSpeed(speed) {
    this.rotationSpeed = speed;
  }

  setDistortion(distortion) {
    this.distortion = distortion;
    if (this.mesh) {
      this.mesh.material.uniforms.distortion.value = distortion;
    }
  }
}
