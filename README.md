# Portfolio

A modern, responsive personal portfolio website built with **vanilla JavaScript**, HTML, and CSS — no framework or build step required.

## Features

- 🎨 **Light / dark theme** toggle (remembers your choice, respects system preference)
- 📱 **Fully responsive** with a mobile slide-in menu
- 🗂️ **Filterable projects** grid rendered from a JS data array
- 📊 **Animated skill bars** and stat counters on scroll
- ✨ **Scroll-reveal** animations via IntersectionObserver
- ✅ **Contact form** with live client-side validation
- 🧭 Sticky navbar with active-section highlighting and smooth scroll

## Project structure

```
index.html    # Markup and page sections
styles.css    # Design tokens (CSS variables), layout, themes, responsive rules
script.js     # Data, rendering, theme, nav, filters, validation, animations
```

## Run locally

No dependencies needed. Just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customize

- **Your info:** edit the text in `index.html` (name, bio, social links).
- **Projects:** edit the `projects` array in `script.js`.
- **Skills:** edit the `skills` array in `script.js`.
- **Colors/theme:** tweak the CSS variables at the top of `styles.css`.

## Deploy

Since it's static, host it free on GitHub Pages, Netlify, Vercel, or Cloudflare Pages —
just point them at this folder.
