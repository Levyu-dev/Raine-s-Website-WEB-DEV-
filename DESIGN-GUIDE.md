# Raine's Cakes and Pastries — Design Guide

## Design direction

Redesign Raine's Cakes and Pastries as a **Modern Playful Editorial Bakery**, inspired by colorful, magazine-style boutique websites. The experience should feel creative, expressive, visually rich, feminine and playful without looking childish, warm, welcoming, and professionally designed.

## Visual system

- **Palette:** Pink `#F599C6` is the primary brand color. Pair it with warm cream `#FFEED6`, charcoal `#4A4A4A`, deep rose `#B9477D`, mocha `#795548`, and soft blush `#FCE0EC` for contrast and variety.
- **Typography:** Use an elegant serif for major headings and a clean sans-serif for body and interface text. Decorative typography is occasional. Keep the site to no more than three font families; prefer existing font choices and avoid adding font dependencies unnecessarily.
- **Scalloped dividers:** Use decorative scalloped edges and curved section transitions selectively.
- **Organic accents:** Use irregular shapes, soft curves, decorative illustrations, and playful details in moderation.
- **Editorial imagery:** Favor asymmetrical photo groupings, overlapping images, rounded frames, and varied image proportions.
- **Color and composition:** Alternate warm cream, pink, soft blush, and other palette colors to distinguish sections. Give sections varied compositions instead of repeating cards or identical structures.
- **Effects:** Use subtle CSS transitions, hover effects, and simple animations selectively. Avoid excessive decoration and unnecessary gradients.
- **Accessibility and responsiveness:** Prioritize readability, accessible interactions, and layouts that work across screen sizes.

## Navigation

- Keep the main navigation fixed.
- Provide a refined, collapsible sidebar consistently across pages.
- Keep the Products category navigation sticky directly below the main navigation.
- Use the existing SVG icons in `Raine-s-Website-WEB-DEV-/assets/sidebar/` instead of emoji.

## Page direction

- **Home:** An organized editorial layout with engaging hero imagery, playful transitions, and structured sections.
- **Products:** Clear category organization, varied product cards, featured products, and attractive image presentations.
- **About:** Magazine-inspired storytelling with asymmetric image arrangements and expressive headings.
- **Gallery:** Creative masonry-style image arrangements with varied sizes and rounded frames.
- **Contact:** A clean, welcoming layout with subtle decorative elements and clear content hierarchy.

## Technical limits

- Use HTML and CSS only. Do not write, create, import, or modify JavaScript files.
- Do not introduce frameworks or unnecessary dependencies.
- Use CSS-only techniques for visual effects and interactions.
- If an interaction cannot be implemented properly without JavaScript, explain the limitation instead of adding JavaScript.
- Preserve existing content, images, links, and functionality wherever possible.
- Do not copy another website's exact layout, colors, branding, or content.

## Project structure and working rules

The existing static site is organized under `Raine-s-Website-WEB-DEV-/`, with pages in `html/`, styles in `css/`, and photos and icons in `assets/`.

1. Redesign incrementally; do not redo every page at once.
2. Preserve the existing project structure; do not introduce a framework.
3. Reuse existing code, branding, content, images, and assets where possible.
4. Preserve working links and functionality.
5. Keep CSS organized and avoid duplicate rules.
6. Do not use every decorative element in every section; keep pages visually cohesive while allowing each to have a distinct layout.
7. Modify only files relevant to the current task; avoid unnecessary rewrites.
