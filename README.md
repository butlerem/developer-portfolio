# Developer Portfolio

A modern, sci-fi themed portfolio website built with Three.js, featuring immersive 3D graphics, custom shaders, and smooth animations.

## Features

- **3D Visualization**: Central Three.js logo with custom vertex/fragment shaders
- **Particle Systems**: 3000 WebGL particles + 1000 DOM particles for atmospheric effects
- **Glass Morphism UI**: Semi-transparent panels with backdrop blur
- **Smooth Animations**: Scroll-triggered animations and transitions
- **Responsive Design**: Optimized for desktop and tablet viewing
- **Interactive Elements**: Draggable panels, form validation, and navigation
- **Sci-Fi Aesthetic**: Dark theme with red-orange accents and technical typography

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **3D Graphics**: Three.js v0.175.0, WebGL, GLSL Shaders
- **Animations**: GSAP v3.13.0, Intersection Observer API
- **Build Tool**: Vite v5.0.0
- **Styling**: CSS3 (Custom Properties, Flexbox, Grid)

## Project Structure

```
portfolio/
├── index.html                  # Main HTML file
├── package.json                # Dependencies and scripts
├── src/
│   ├── main.js                # Entry point
│   ├── css/                   # Stylesheets
│   │   ├── main.css           # Base styles and color palette
│   │   ├── panels.css         # Panel components
│   │   ├── animations.css     # Keyframe animations
│   │   ├── navigation.css     # Header and navigation
│   │   └── sections/          # Section-specific styles
│   ├── js/
│   │   ├── three/             # Three.js components
│   │   │   ├── scene.js       # Scene setup
│   │   │   ├── logo.js        # Central 3D object
│   │   │   └── particles.js   # Particle systems
│   │   ├── ui/                # UI components
│   │   │   ├── loading.js     # Loading screen
│   │   │   ├── navigation.js  # Navigation and timestamp
│   │   │   └── notification.js # Toast notifications
│   │   ├── animations/        # Animation controllers
│   │   │   └── scroll.js      # Scroll-triggered animations
│   │   └── utils/             # Utility functions
│   │       ├── helpers.js     # Helper functions
│   │       └── form.js        # Form handling
│   └── shaders/
│       ├── vertex.glsl        # Vertex shader
│       └── fragment.glsl      # Fragment shader
└── public/
    └── assets/                # Static assets
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

## Development

The portfolio uses Vite for fast development and optimized builds. The dev server runs at `http://localhost:5173`.

### Key Components

- **Loading Screen**: Expanding circles animation with 3-second display
- **Three.js Scene**: Full-screen WebGL canvas with fog and custom lighting
- **Central Logo**: Icosahedron with noise-displaced vertices and fresnel glow
- **Particles**: Dual particle system (Three.js Points + DOM elements)
- **Navigation**: Fixed header with smooth scrolling and active section tracking
- **Sections**: Hero, About, Skills, Projects, Contact
- **Form**: Contact form with validation and terminal-style output

### Customization

1. **Colors**: Edit CSS custom properties in `src/css/main.css`
2. **Content**: Update HTML in `index.html`
3. **3D Object**: Modify geometry in `src/js/three/logo.js`
4. **Shaders**: Edit GLSL code in `src/shaders/`
5. **Animations**: Adjust timing in `src/css/animations.css`

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari (14+)
- Requires WebGL support

## Performance

- Target: 60fps on modern hardware
- Three.js particles: 3000 (optimized with BufferGeometry)
- DOM particles: 1000 (CSS transforms, GPU-accelerated)
- Shader complexity: Medium (simple noise + fresnel)

## License

MIT License - feel free to use this template for your own portfolio.

## Credits

- Font: TheGoodMonolith (monospace)
- Space background: assets.codepen.io
