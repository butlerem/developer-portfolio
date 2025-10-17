# Portfolio Project - AI Agent Instructions

## Project Overview

Modern sci-fi themed portfolio website built with vanilla JavaScript, Three.js, and WebGL shaders. Features immersive 3D graphics, dual particle systems, and glass morphism UI.

## Architecture Patterns

### Application Structure

- **Main Entry**: `src/main.js` - Central `PortfolioApp` class orchestrates all components
- **Component Isolation**: Each feature is a separate ES6 class with `init()` method
- **Scene Management**: Three.js scene lives in separate module (`src/js/three/scene.js`)
- **Event-Driven**: Custom events for scroll tracking (`scrollupdate`) and component communication

### Key Initialization Flow

```javascript
// Standard pattern in main.js
this.loadingScreen = new LoadingScreen();
this.loadingScreen.init();
// Then: navigation, Three.js scene, particles, scroll animations, form handler
```

### Three.js Architecture

- **Scene Setup**: Camera positioned at `(0, 0, 10)` with exponential fog
- **Central Object**: Icosahedron with noise-displaced vertices (see `src/js/three/logo.js`)
- **Dual Particles**: 3000 WebGL particles + 1000 DOM particles for performance
- **Custom Shaders**: Fresnel glow effect with scroll-responsive brightness (`src/shaders/`)

## Critical Development Workflows

### Build System (Vite)

```bash
npm run dev      # Development server at localhost:5173
npm run build    # Production build
npm run preview  # Preview production build
```

### Shader Development

- Vertex shader: Simplex noise displacement with time uniform
- Fragment shader: Fresnel effect + pulsing + scroll-responsive brightness
- Edit `.glsl` files directly; Vite handles them as string imports

### Animation System

- **Scroll Animations**: Intersection Observer in `src/js/animations/scroll.js`
- **Three.js Updates**: Animation loop in scene.js calls update methods
- **CSS Animations**: Keyframes in `src/css/animations.css` triggered by `.visible` class

## Project-Specific Conventions

### CSS Architecture

- **Custom Properties**: All colors defined in `:root` of `src/css/main.css`
- **Section-Based Styles**: Each section has dedicated stylesheet in `src/css/sections/`
- **Glass Morphism**: `backdrop-filter: blur(10px)` with `rgba()` backgrounds
- **Responsive**: Breakpoints at 768px and 480px, optimized for desktop-first

### JavaScript Patterns

- **ES6 Modules**: All files use `export class` pattern
- **Constructor + Init**: Class constructors set properties, `init()` method handles DOM/events
- **Event Cleanup**: Classes store references for proper event listener removal
- **Scroll Integration**: Components listen for custom `scrollupdate` event

### UI Component Structure

```javascript
export class ComponentName {
  constructor() {
    this.element = document.querySelector(".selector");
  }

  init() {
    // Setup event listeners and initial state
  }
}
```

## Critical Files to Understand

### Core Architecture

- `src/main.js` - Application orchestrator and initialization sequence
- `src/js/three/scene.js` - WebGL setup, camera controls, animation loop
- `index.html` - HTML structure with inline section content

### Styling System

- `src/css/main.css` - Color palette, base styles, space background
- `src/css/panels.css` - Glass morphism panel components
- `src/css/animations.css` - Keyframe animations and transitions

### Performance-Critical

- `src/js/three/particles.js` - Dual particle system (WebGL + DOM)
- `src/shaders/vertex.glsl` - Vertex displacement with Simplex noise
- `src/js/animations/scroll.js` - Throttled scroll tracking and Intersection Observer

## Integration Points

### Three.js ↔ Scroll System

- `ThreeScene.updateScrollAmount()` receives scroll progress (0-1)
- Camera zoom changes based on scroll: `targetZ = 10 + scrollProgress * 5`
- Logo shader receives scroll uniform for brightness modulation

### Form ↔ Terminal UI

- Contact form outputs to terminal-style display in real-time
- Validation messages use monospace font and tech aesthetic
- Success/error states match overall color scheme

### Loading ↔ Main App

- 3-second loading screen with expanding circles animation
- Callback-based transition: `loadingScreen.hide(() => this.initializeApp())`
- Hero section fade-in delayed 500ms after loading screen

## Performance Considerations

- Target 60fps on modern hardware
- Particle counts: 3000 Three.js + 1000 DOM (optimized with BufferGeometry)
- Pixel ratio clamped to 2: `Math.min(window.devicePixelRatio, 2)`
- Scroll events throttled with `requestAnimationFrame`
- WebGL renderer uses `powerPreference: 'high-performance'`

## Common Gotchas

- Shaders require time uniform for animations - don't forget to update in animation loop
- Panel visibility controlled by `.visible` class added via Intersection Observer
- Three.js imports use `/examples/jsm/` path structure
- Font loading from CDN may cause flash of unstyled text
- Scroll tracking events are custom - listen for `scrollupdate`, not native `scroll`
