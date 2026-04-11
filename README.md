# 🌌 Portfolio — Juan David Martinez Medina

> *"Un desarrollador, guiado por la Fuerza."*

Portafolio personal construido con **Astro**, con animaciones premium usando **Anime.js**, sistema de internacionalización dinámico (ES/EN), y un diseño tipo "slide" donde cada sección ocupa exactamente una pantalla completa.

---

## ✨ Características

- **Scroll-Snap cinematográfico** — cada sección encaja perfectamente en pantalla
- **Navbar inteligente** — desaparece al bajar, reaparece al subir, con efecto glassmorphism
- **Animaciones Enter/Leave** — cada sección re-anima al volver a ella
- **Parallax en el Hero** — el contenido reacciona al scroll con profundidad
- **Rayo animado** (Welcome) — efecto SVG con Anime.js en bucle
- **ID Card 3D** — tarjeta de presentación con tilt interactivo al mouse y animación de péndulo
- **Sable de luz Jedi** (Proyectos) — easter egg Star Wars que se enciende al llegar a la sección
- **Proyectos Destacados** — tarjetas con imágenes reales, tech stack y links a GitHub
- **Tech Stack visual** — íconos de Devicon + SVGs propios con pop-in animado
- **i18n dinámico** — cambio instantáneo Español / Inglés sin recargar la página
- **Tipado animado** — efecto typewriter en el título del Hero
- **Favicon personalizado** — logo de Darth Vader 🎭

---

## 🛠️ Tech Stack

| Categoría | Tecnologías |
|-----------|------------|
| **Framework** | Astro |
| **Animaciones** | Anime.js |
| **Íconos** | Devicon CDN |
| **Fuentes** | Google Fonts — Inter |
| **Estilos** | Vanilla CSS (modular) |
| **Lenguaje** | JavaScript (ES Modules) |

---

## 📁 Estructura del Proyecto

```
src/
├── assets/           # Imágenes de proyectos y logos
├── components/
│   ├── Welcome.astro         # Sección Hero (pantalla 1)
│   ├── Navbar.astro          # Navegación fija
│   ├── FeaturedProjects.astro # Proyectos destacados (pantalla 2)
│   └── TechStack.astro       # Stack tecnológico (pantalla 3)
├── layouts/
│   └── Layout.astro          # Layout base con CDNs
├── logic/            # Toda la lógica JS modularizada
│   ├── welcome.js    # Animaciones Hero + i18n + typewriter
│   ├── navbar.js     # Scroll hide/show + glassmorphism
│   └── projects.js   # Animaciones Enter/Leave por sección
├── pages/
│   └── index.astro   # Página principal
└── styles/
    ├── global.css    # Estilos globales + diseño de cada sección
    └── navbar.css    # Estilos específicos del navbar
```

---

## 🚀 Instalación y uso local

```bash
# Clonar el repositorio
git clone https://github.com/Juandamm01/PortfolioJDMM.git

# Entrar al directorio
cd PortfolioJDMM

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

---

## 🌐 Secciones

### 1. 🏠 Welcome — Hero Section
Presentación principal con animación de rayo tipo Star Wars, tarjeta de identificación 3D interactiva con efecto tilt, efecto de escritura animado y parallax al hacer scroll.

### 2. 💼 Proyectos Destacados
- **Dra. Camila Henao Odontología** — Web clínica dental con Next.js, Framer Motion y GSAP *(En desarrollo)*
- **Bioconstructores Asociados SAS** — Plataforma empresarial Fullstack con React, Next.js, TypeScript y AWS S3

### 3. ⚙️ Mi Stack
Visualización categorizada de todas mis tecnologías con íconos, animaciones escalonadas y efecto hover neon.

---

## 📐 Principios de código aplicados

- **Clean Code** — Cero JavaScript inline en los `.astro`. Toda la lógica vive en `src/logic/`
- **Separación de responsabilidades** — HTML, CSS y JS en archivos independientes
- **CSS centralizado** — Todos los estilos en `global.css` y `navbar.css`, nunca inline
- **Modularidad** — Cada componente es autocontenido y reutilizable

---

## 📱 Compatibilidad

| Dispositivo | Estado |
|-------------|--------|
| Desktop | ✅ Óptimo |
| Tablet | ✅ Responsive |
| Móvil | ✅ Adaptado |

---

## 🌍 Idiomas soportados

| Idioma | Código |
|--------|--------|
| 🇨🇴 Español | `es` (por defecto) |
| 🇺🇸 Inglés | `en` |

El cambio de idioma es instantáneo y sin recarga de página, usando un sistema i18n propio basado en atributos `data-i18n`.

---

## 👨‍💻 Autor

**Juan David Martinez Medina**  
Estudiante de 5º semestre de Desarrollo de Software  
Apasionado por el Frontend avanzado, las interfaces interactivas y las experiencias de usuario de alto nivel.

[![GitHub](https://img.shields.io/badge/GitHub-Juandamm01-181717?style=for-the-badge&logo=github)](https://github.com/Juandamm01)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-juan--david19-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/juan-david19)

---

<div align="center">
  <sub>Construido con 💙 y la Fuerza · © 2026 Juan David Martinez Medina</sub>
</div>
