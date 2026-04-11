# 🌌 Portfolio — Juan David Martinez Medina

> *"A developer, guided by the Force."*

Personal portfolio built with **Astro**, featuring premium animations powered by **Anime.js**, a dynamic internationalization system (ES/EN), and a cinematic "slide" design where each section fills exactly one full screen.

---

## ✨ Features

- **Cinematic Scroll-Snap** — each section locks perfectly into view
- **Smart Navbar** — hides on scroll down, reappears on scroll up, with glassmorphism effect
- **Enter/Leave Animations** — every section re-animates each time you return to it
- **Hero Parallax** — content reacts to scroll with depth effect
- **Animated Lightning** (Welcome) — SVG effect with looping Anime.js animation
- **3D ID Card** — interactive business card with mouse tilt and pendulum swing
- **Jedi Lightsaber** (Projects) — Star Wars easter egg that ignites when you arrive at the section
- **Featured Projects** — cards with real screenshots, tech stack and GitHub links
- **Visual Tech Stack** — Devicon icons + custom SVGs with staggered pop-in animation
- **Dynamic i18n** — instant Spanish / English toggle without page reload
- **Typewriter Effect** — animated typing in the Hero title
- **Custom Favicon** — Darth Vader logo 🎭

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Astro |
| **Animations** | Anime.js |
| **Icons** | Devicon CDN |
| **Fonts** | Google Fonts — Inter |
| **Styles** | Vanilla CSS (modular) |
| **Language** | JavaScript (ES Modules) |

---

## 📁 Project Structure

```
src/
├── assets/           # Project images and logos
├── components/
│   ├── Welcome.astro          # Hero section (screen 1)
│   ├── Navbar.astro           # Fixed navigation bar
│   ├── FeaturedProjects.astro # Featured projects (screen 2)
│   └── TechStack.astro        # Technology stack (screen 3)
├── layouts/
│   └── Layout.astro           # Base layout with CDN links
├── logic/            # All JS logic — fully modularized
│   ├── welcome.js    # Hero animations + i18n + typewriter
│   ├── navbar.js     # Scroll hide/show + glassmorphism
│   └── projects.js   # Section Enter/Leave animations
├── pages/
│   └── index.astro   # Main page
└── styles/
    ├── global.css    # Global styles + per-section design
    └── navbar.css    # Navbar-specific styles
```

---

## 🚀 Local Setup

```bash
# Clone the repository
git clone https://github.com/Juandamm01/PortfolioJDMM.git

# Navigate to the directory
cd PortfolioJDMM

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

---

## 🌐 Sections

### 1. 🏠 Welcome — Hero Section
Main presentation with a Star Wars-style lightning animation, an interactive 3D ID card with mouse tilt, an animated typewriter effect, and scroll parallax depth.

### 2. 💼 Featured Projects
- **Dra. Camila Henao Odontología** — Dental clinic website with Next.js, Framer Motion and GSAP *(In Development)*
- **Bioconstructores Asociados SAS** — Fullstack enterprise platform with React, Next.js, TypeScript and AWS S3

### 3. ⚙️ My Stack
Categorized visualization of all technologies with icons, staggered animations, and neon hover effects.

---

## 📐 Code Principles Applied

- **Clean Code** — Zero inline JavaScript in `.astro` files. All logic lives in `src/logic/`
- **Separation of Concerns** — HTML, CSS and JS in independent, focused files
- **Centralized CSS** — All styles in `global.css` and `navbar.css`, never inline
- **Modularity** — Each component is self-contained and reusable

---

## 📱 Compatibility

| Device | Status |
|--------|--------|
| Desktop | ✅ Optimized |
| Tablet | ✅ Responsive |
| Mobile | ✅ Adapted |

---

## 🌍 Supported Languages

| Language | Code |
|----------|------|
| 🇨🇴 Spanish | `es` (default) |
| 🇺🇸 English | `en` |

Language switching is instant and requires no page reload, powered by a custom i18n system based on `data-i18n` attributes.

---

## 👨‍💻 Author

**Juan David Martinez Medina**  
5th-semester Software Development student  
Passionate about advanced Frontend, interactive interfaces, and high-level user experiences.

[![GitHub](https://img.shields.io/badge/GitHub-Juandamm01-181717?style=for-the-badge&logo=github)](https://github.com/Juandamm01)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-juan--david19-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/juan-david19)

---

<div align="center">
  <sub>"Do or do not. There is no try." · © 2026 Juan David Martinez Medina</sub>
</div>
