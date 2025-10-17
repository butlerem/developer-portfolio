uniform float time;
uniform vec3 color;
uniform float scrollAmount;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Fresnel effect
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

  // Pulsing
  float pulse = 0.8 + 0.2 * sin(time * 0.5);

  // Color with fresnel glow
  vec3 finalColor = color * (1.0 + fresnel * 2.0) * pulse;

  // Slight scroll-based brightness
  finalColor *= (1.0 + scrollAmount * 0.2);

  // Alpha with fresnel
  float alpha = 0.7 + fresnel * 0.3;

  gl_FragColor = vec4(finalColor, alpha);
}
