# 🎨 CineFlex Design System & Style Guide

## Your Complete Design Reference - No Thinking Required

<div align="center">

_A comprehensive, modern design system inspired by Netflix, Disney+, and current 2025 design trends_

**📖 DESIGN SOURCE OF TRUTH**  
**This is the single source of truth for ALL design decisions in CineFlex. Just follow this guide. Every decision has been researched and optimized for you.**

</div>

---

## 📋 Table of Contents

1. [🎯 Design Philosophy](#-design-philosophy)
2. [🌈 Color System](#-color-system)
3. [📝 Typography](#-typography)
4. [📏 Spacing & Layout](#-spacing--layout)
5. [🧩 Component Design](#-component-design)
6. [📱 Responsive System](#-responsive-system)
7. [🎭 Visual Effects](#-visual-effects)
8. [🎨 Implementation Guide](#-implementation-guide)

---

## 🎯 Design Philosophy

### Core Principles

- **Dark-First Design**: Modern streaming aesthetic with optional light mode
- **Content-Centric**: Movie posters and images are the heroes
- **Clean Minimalism**: Inspired by 2025 trends - "beyond flat design"
- **Cinematic Experience**: Immersive, theater-like feel
- **Performance-Driven**: Fast, responsive, accessible

### Visual Direction

- **Netflix-inspired** dark theme with modern touches
- **Bento grid layouts** for organized content
- **Subtle morphism effects** for depth without complexity
- **Strategic color pops** for interactive elements
- **Motion-first** micro-interactions

---

## 🌈 Color System

### 🌙 Primary Palette (Dark Theme Default)

```css
/* CSS Variables - Copy this exactly */
:root {
  /* Background Colors */
  --bg-primary: #0a0a0a; /* Pure dark background */
  --bg-secondary: #141414; /* Card/container background */
  --bg-tertiary: #1e1e1e; /* Elevated surfaces */
  --bg-modal: #252525; /* Modals, dropdowns */

  /* Surface Colors */
  --surface-hover: #2a2a2a; /* Hover states */
  --surface-pressed: #333333; /* Active states */
  --surface-border: #404040; /* Subtle borders */

  /* Text Colors */
  --text-primary: #ffffff; /* Main text */
  --text-secondary: #b3b3b3; /* Secondary text */
  --text-tertiary: #8c8c8c; /* Muted text */
  --text-disabled: #555555; /* Disabled text */

  /* Accent Colors */
  --accent-red: #e50914; /* Netflix red - primary CTA */
  --accent-red-hover: #f40612; /* Red hover state */
  --accent-red-pressed: #c50813; /* Red pressed state */

  /* Status Colors */
  --success: #46d369; /* Success states */
  --warning: #ffb800; /* Warning states */
  --error: #ff4757; /* Error states */
  --info: #3742fa; /* Info states */

  /* Gradient Colors */
  --gradient-hero: linear-gradient(135deg, #0a0a0a 0%, #1e1e1e 100%);
  --gradient-card: linear-gradient(135deg, #141414 0%, #1e1e1e 100%);
  --gradient-accent: linear-gradient(135deg, #e50914 0%, #f40612 100%);
}
```

### ☀️ Light Mode Palette (Optional)

```css
/* Light Mode Override */
[data-theme='light'] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f8f8;
  --bg-tertiary: #f1f1f1;
  --bg-modal: #ffffff;

  --surface-hover: #f5f5f5;
  --surface-pressed: #e8e8e8;
  --surface-border: #e0e0e0;

  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --text-tertiary: #737373;
  --text-disabled: #a1a1a1;

  /* Keep same accent colors */
}
```

### 🎨 Semantic Color Usage

| Color              | Usage                                    | Examples                     |
| ------------------ | ---------------------------------------- | ---------------------------- |
| `--accent-red`     | Primary actions, play buttons, favorites | "Watch Now", Heart icons     |
| `--text-primary`   | Main content, titles                     | Movie titles, navigation     |
| `--text-secondary` | Supporting text                          | Movie descriptions, metadata |
| `--text-tertiary`  | Labels, timestamps                       | "Released in 2023", "2h 15m" |
| `--bg-secondary`   | Cards, containers                        | Movie cards, search bar      |
| `--surface-hover`  | Interactive states                       | Button hovers, card hovers   |

---

## 📝 Typography

### 🔤 Font Stack

```css
/* Primary Font Family */
--font-primary:
  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Alternative Fonts (if Inter is unavailable) */
--font-display: 'Poppins', 'Inter', sans-serif; /* For large headings */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace; /* For code/timestamps */
```

### 📊 Type Scale (Based on 4pt Grid)

```css
/* Font Sizes - Perfect Mathematical Progression */
:root {
  --text-xs: 12px; /* 0.75rem - Small labels */
  --text-sm: 14px; /* 0.875rem - Secondary text */
  --text-base: 16px; /* 1rem - Body text */
  --text-lg: 18px; /* 1.125rem - Emphasized text */
  --text-xl: 20px; /* 1.25rem - Small headings */
  --text-2xl: 24px; /* 1.5rem - Card titles */
  --text-3xl: 32px; /* 2rem - Section headings */
  --text-4xl: 40px; /* 2.5rem - Page headings */
  --text-5xl: 48px; /* 3rem - Hero text */
  --text-6xl: 64px; /* 4rem - Display text */

  /* Line Heights */
  --leading-tight: 1.2; /* For headings */
  --leading-normal: 1.5; /* For body text */
  --leading-relaxed: 1.75; /* For long text */

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### 🎯 Typography Hierarchy

```css
/* Heading Styles - Copy these classes */
.display-1 {
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.heading-1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

.heading-2 {
  font-size: var(--text-4xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

.heading-3 {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

.heading-4 {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

.body-large {
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}

.body-base {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}

.body-small {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-tertiary);
}

.caption {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

## 📏 Spacing & Layout

### 🔢 4-Point Grid System

**Why 4pt?** Perfect for modern interfaces - not too fine, not too coarse.

```css
/* Spacing Scale - Based on 4px increments */
:root {
  --space-1: 4px; /* 0.25rem - Tiny gaps */
  --space-2: 8px; /* 0.5rem - Small gaps */
  --space-3: 12px; /* 0.75rem - Compact spacing */
  --space-4: 16px; /* 1rem - Base spacing */
  --space-5: 20px; /* 1.25rem - Comfortable spacing */
  --space-6: 24px; /* 1.5rem - Section spacing */
  --space-8: 32px; /* 2rem - Large spacing */
  --space-10: 40px; /* 2.5rem - XL spacing */
  --space-12: 48px; /* 3rem - XXL spacing */
  --space-16: 64px; /* 4rem - Hero spacing */
  --space-20: 80px; /* 5rem - Section dividers */
  --space-24: 96px; /* 6rem - Page sections */
}
```

### 🎯 Spacing Usage Rules

| Spacing | Usage                             | Example                       |
| ------- | --------------------------------- | ----------------------------- |
| `4px`   | Icon padding, micro adjustments   | Button icon margins           |
| `8px`   | Tight element spacing             | Text to icon distance         |
| `12px`  | Comfortable content spacing       | Paragraph margins             |
| `16px`  | Standard component spacing        | Card padding, form fields     |
| `24px`  | Section spacing within components | Card header to content        |
| `32px`  | Component separation              | Between different UI sections |
| `48px`  | Major section separation          | Between hero and content      |
| `64px+` | Page-level spacing                | Top/bottom page margins       |

### 📐 Container System

```css
/* Container Widths */
:root {
  --container-sm: 640px; /* Small screens */
  --container-md: 768px; /* Medium screens */
  --container-lg: 1024px; /* Large screens */
  --container-xl: 1280px; /* Extra large screens */
  --container-2xl: 1536px; /* 2X large screens */

  /* Content max-widths */
  --content-width: 1200px; /* Main content area */
  --reading-width: 680px; /* Optimal reading width */
}

/* Container Classes */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

.container-sm {
  max-width: var(--container-sm);
}
.container-md {
  max-width: var(--container-md);
}
.container-lg {
  max-width: var(--container-lg);
}
.container-xl {
  max-width: var(--container-xl);
}
.container-2xl {
  max-width: var(--container-2xl);
}
```

### 🏗️ Grid System (Bento Style)

```css
/* Bento Grid Layout */
.bento-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Movie Card Grid */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
  padding: var(--space-6);
}

/* Hero Section Grid */
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
  min-height: 80vh;
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
    min-height: 60vh;
  }
}
```

---

## 🧩 Component Design

### 🎬 Movie Card Component

```css
.movie-card {
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  aspect-ratio: 2/3; /* Movie poster ratio */
  position: relative;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.movie-card__poster {
  width: 100%;
  height: 70%;
  object-fit: cover;
}

.movie-card__content {
  padding: var(--space-4);
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movie-card__title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  line-height: var(--leading-tight);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.movie-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-2);
}

.movie-card__year {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.movie-card__rating {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  color: var(--warning);
}
```

### 🔘 Button System

```css
/* Primary Button (Netflix Red) */
.btn-primary {
  background: var(--accent-red);
  color: var(--text-primary);
  border: none;
  border-radius: 4px;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.btn-primary:hover {
  background: var(--accent-red-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(229, 9, 20, 0.3);
}

.btn-primary:active {
  background: var(--accent-red-pressed);
  transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--surface-border);
  border-radius: 4px;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--surface-hover);
  border-color: var(--text-secondary);
}

/* Icon Button */
.btn-icon {
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: var(--space-2);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.btn-icon:hover {
  background: var(--surface-hover);
  color: var(--text-primary);
  transform: scale(1.1);
}
```

### 🔍 Search Component

```css
.search-container {
  position: relative;
  max-width: 500px;
  width: 100%;
}

.search-input {
  width: 100%;
  background: var(--bg-secondary);
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  padding: var(--space-4) var(--space-4) var(--space-4) var(--space-12);
  font-size: var(--text-base);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-red);
  box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.1);
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

.search-icon {
  position: absolute;
  left: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  width: 20px;
  height: 20px;
}

.search-input:focus + .search-icon {
  color: var(--accent-red);
}
```

### 🏷️ Genre Tags

```css
.genre-tag {
  display: inline-flex;
  align-items: center;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  padding: var(--space-1) var(--space-3);
  border-radius: 16px;
  border: 1px solid var(--surface-border);
  transition: all 0.2s ease;
  cursor: pointer;
}

.genre-tag:hover {
  background: var(--surface-hover);
  color: var(--text-primary);
  border-color: var(--text-tertiary);
}

.genre-tag.active {
  background: var(--accent-red);
  color: var(--text-primary);
  border-color: var(--accent-red);
}
```

---

## 📱 Responsive System

### 📐 Breakpoints

```css
/* Breakpoint Values */
:root {
  --breakpoint-xs: 475px; /* Extra small devices */
  --breakpoint-sm: 640px; /* Small devices */
  --breakpoint-md: 768px; /* Medium devices */
  --breakpoint-lg: 1024px; /* Large devices */
  --breakpoint-xl: 1280px; /* Extra large devices */
  --breakpoint-2xl: 1536px; /* 2X large devices */
}

/* Media Query Mixins (for CSS-in-JS or Sass) */
@media (min-width: 475px) {
  /* xs */
}
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
@media (min-width: 1536px) {
  /* 2xl */
}
```

### 📱 Mobile-First Responsive Classes

```css
/* Mobile First Approach */
.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

/* Responsive Grid */
@media (min-width: 640px) {
  .sm\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .sm\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .sm\:grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  .md\:grid-cols-5 {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-5 {
    grid-template-columns: repeat(5, 1fr);
  }
  .lg\:grid-cols-6 {
    grid-template-columns: repeat(6, 1fr);
  }
  .lg\:grid-cols-7 {
    grid-template-columns: repeat(7, 1fr);
  }
}
```

### 📺 Responsive Movie Grid

```css
.movies-grid {
  display: grid;
  gap: var(--space-4);
  /* Mobile: 2 columns */
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 640px) {
  .movies-grid {
    /* Tablet: 3-4 columns */
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
  }
}

@media (min-width: 768px) {
  .movies-grid {
    /* Desktop: 4-5 columns */
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .movies-grid {
    /* Large Desktop: 5-6 columns */
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1280px) {
  .movies-grid {
    /* XL Desktop: 6-7 columns */
    grid-template-columns: repeat(6, 1fr);
  }
}
```

---

## 🎭 Visual Effects

### ✨ Shadows & Elevation

```css
/* Shadow System - Inspired by Material Design */
:root {
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);

  /* Colored Shadows for Accent Elements */
  --shadow-red:
    0 10px 15px rgba(229, 9, 20, 0.2), 0 4px 6px rgba(229, 9, 20, 0.1);
}

/* Elevation Classes */
.elevation-0 {
  box-shadow: none;
}
.elevation-1 {
  box-shadow: var(--shadow-sm);
}
.elevation-2 {
  box-shadow: var(--shadow-md);
}
.elevation-3 {
  box-shadow: var(--shadow-lg);
}
.elevation-4 {
  box-shadow: var(--shadow-xl);
}
.elevation-5 {
  box-shadow: var(--shadow-2xl);
}
```

### 🌊 Smooth Animations

```css
/* Animation Easing */
:root {
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-back: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Common Transitions */
.transition-all {
  transition: all 0.3s var(--ease-out);
}

.transition-colors {
  transition:
    color 0.2s var(--ease-out),
    background-color 0.2s var(--ease-out),
    border-color 0.2s var(--ease-out);
}

.transition-transform {
  transition: transform 0.3s var(--ease-out);
}

/* Hover Effects */
.hover-scale:hover {
  transform: scale(1.02);
}

.hover-lift:hover {
  transform: translateY(-4px);
}

.hover-glow:hover {
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.3);
}
```

### 🔍 Loading States

```css
/* Loading Skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 25%,
    var(--bg-tertiary) 50%,
    var(--bg-secondary) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 2s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-text {
  height: 1em;
  border-radius: 4px;
}

.skeleton-title {
  height: 1.5em;
  border-radius: 4px;
  margin-bottom: var(--space-2);
}

.skeleton-card {
  aspect-ratio: 2/3;
  border-radius: 8px;
}
```

---

## 🎨 Implementation Guide

### 🚀 Quick Start CSS

Create a `design-system.css` file and copy this:

```css
/* CineFlex Design System v1.0 */

/* Import Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* CSS Variables - The Foundation */
:root {
  /* Colors */
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --bg-tertiary: #1e1e1e;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --text-tertiary: #8c8c8c;
  --accent-red: #e50914;
  --accent-red-hover: #f40612;

  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 32px;
  --text-4xl: 40px;
  --text-5xl: 48px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* Effects */
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}

/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-primary);
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Utility Classes */
.text-primary {
  color: var(--text-primary);
}
.text-secondary {
  color: var(--text-secondary);
}
.text-tertiary {
  color: var(--text-tertiary);
}

.bg-primary {
  background: var(--bg-primary);
}
.bg-secondary {
  background: var(--bg-secondary);
}
.bg-tertiary {
  background: var(--bg-tertiary);
}

.p-4 {
  padding: var(--space-4);
}
.p-6 {
  padding: var(--space-6);
}
.m-4 {
  margin: var(--space-4);
}
.m-6 {
  margin: var(--space-6);
}

.rounded {
  border-radius: 8px;
}
.rounded-full {
  border-radius: 50%;
}

.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}

.grid {
  display: grid;
}
.gap-4 {
  gap: var(--space-4);
}
.gap-6 {
  gap: var(--space-6);
}

.transition {
  transition: all 0.3s var(--ease-out);
}
```

### 📋 Component Checklist

For each component you build, ensure:

- [ ] Uses design system colors (no hardcoded colors)
- [ ] Follows 4pt spacing system
- [ ] Has hover/focus/active states
- [ ] Is responsive across all breakpoints
- [ ] Has proper semantic HTML
- [ ] Includes loading states where needed
- [ ] Has appropriate ARIA labels
- [ ] Smooth transitions (0.2-0.3s)
- [ ] Proper contrast ratios (4.5:1 minimum)

### 🎯 Page Layout Template

```html
<!-- HTML Structure Template -->
<div class="app">
  <!-- Navigation -->
  <nav class="nav">
    <div class="container">
      <!-- Nav content -->
    </div>
  </nav>

  <!-- Main Content -->
  <main class="main">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-grid">
          <!-- Hero content -->
        </div>
      </div>
    </section>

    <!-- Movies Section -->
    <section class="movies-section">
      <div class="container">
        <h2 class="heading-2">Popular Movies</h2>
        <div class="movies-grid">
          <!-- Movie cards -->
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <!-- Footer content -->
    </div>
  </footer>
</div>
```

### 🎨 CSS Modules Structure

```
src/
  styles/
    design-system.css      # All variables and base styles
    components/
      MovieCard.module.css
      Button.module.css
      SearchBar.module.css
      Navigation.module.css
    pages/
      Home.module.css
      MovieDetails.module.css
    utilities/
      spacing.module.css     # Spacing utilities
      typography.module.css  # Text utilities
      layout.module.css      # Layout utilities
```

### 📚 Component Examples in CSS Modules

```css
/* MovieCard.module.css */
.card {
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s var(--ease-out);
  aspect-ratio: 2/3;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-xl);
}

.poster {
  width: 100%;
  height: 70%;
  object-fit: cover;
}

.content {
  padding: var(--space-4);
}

.title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
}
```

---

## 🏁 Final Notes

### ✅ Do's

- ✅ **Stick to the 4pt grid system religiously**
- ✅ **Use design system colors only**
- ✅ **Test on multiple screen sizes**
- ✅ **Add subtle hover effects to everything interactive**
- ✅ **Use skeleton loading states**
- ✅ **Keep animations under 0.3 seconds**
- ✅ **Follow the Netflix-inspired dark aesthetic**

### ❌ Don'ts

- ❌ **Don't create custom spacing values**
- ❌ **Don't use colors outside the system**
- ❌ **Don't forget hover states**
- ❌ **Don't make text smaller than 14px**
- ❌ **Don't use more than 3 font weights**
- ❌ **Don't animate everything - be selective**
- ❌ **Don't ignore mobile-first approach**

### 🎯 Success Metrics

Your design is successful when:

- Users can easily scan movie content
- Interactive elements feel responsive and smooth
- The interface looks professional on all devices
- Loading states prevent user confusion
- The overall feel matches modern streaming apps

---

<div align="center">

**🎬 You're ready to build something amazing!**

_Just follow this guide step by step. Every decision has been researched and optimized for modern movie discovery experiences._

**Remember: When in doubt, look at Netflix, Disney+, and keep it simple.**

</div>
