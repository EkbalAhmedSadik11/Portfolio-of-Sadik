# Sadik Ekbal — Portfolio

A fully responsive one-page portfolio. No frameworks, no build step — open `index.html` and it runs.

## Structure

```
index.html          all page content
css/styles.css      theme + layout (black #000 / blue #2196F3)
js/main.js          projects data, typing effect, nav, reveals, contact form
assets/profile.jpg  portrait used in the hero
assets/Profile.pdf  CV linked from the "Résumé" / "Download CV" buttons
```

## Running it

Just double-click `index.html`, or serve the folder:

```bash
python -m http.server 5510
```

## What to edit

| Change | Where |
| --- | --- |
| **Projects** (currently placeholders) | `PROJECTS` array at the top of `js/main.js` |
| Rotating job titles in the hero | `words` array in `initTyping()`, `js/main.js` |
| Skills / tags | `#skills` section in `index.html` |
| Experience, education, contact details | matching sections in `index.html` |
| Dark colours | `:root { … }` at the top of `css/styles.css` |
| Light colours | `:root[data-theme="light"] { … }`, right below it |

> **Note:** the four projects are sample entries so the section isn't empty.
> Replace them with your real work before publishing.

## Deploying

Any static host works. Push the folder to a GitHub repo, then either:

- **GitHub Pages** — repo Settings → Pages → deploy from `main` / root
- **Netlify / Vercel** — drag the folder in, no configuration needed

## Dark / light mode

The switch sits at the right of the nav bar, beside the menu button. Behaviour:

1. Returning visitor → their saved choice (`localStorage`, key `theme`)
2. First visit → follows the OS setting (`prefers-color-scheme`)
3. Neither available → dark

An inline script in `<head>` stamps `data-theme` on `<html>` *before* the first paint,
so the page never flashes the wrong mode. Every colour is a CSS variable, so adding a
third theme means adding one `:root[data-theme="…"]` block — no rule changes.

## Details worth keeping

- Responsive from 320px up; no horizontal overflow at any width
- Mobile drawer nav with scrim, Esc to close, and body scroll lock
- Scroll-spy nav, reading-progress bar, reveal-on-scroll, count-up stats
- Respects `prefers-reduced-motion`; has a print stylesheet
- Contact form validates, then opens the visitor's mail client to `md460911@gmail.com`
  (swap in [Formspree](https://formspree.io) or similar if you want messages delivered server-side)
