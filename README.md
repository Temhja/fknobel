# FK Nobel — Catalog Viewer

Presentation-mode digital catalog. Two volumes (Melamine, Accessories), 14 A4 portrait pages each, served as JPGs with vertical scroll navigation.

## Structure

```
fk-nobel/
├── index.html                      # Splash — 2 choices (ميلامين / إكسسوارات)
├── pages/
│   ├── melamine.html               # Reader — loads 14 JPGs from melamine/
│   ├── accessories.html            # Reader — loads 14 JPGs from accessories/
│   ├── melamine/
│   │   ├── 01.jpg ... 14.jpg       # ← REPLACE with your real catalog pages
│   └── accessories/
│       └── 01.jpg ... 14.jpg       # ← REPLACE with your real catalog pages
├── css/style.css                   # All styles
├── js/reader.js                    # Page navigation logic
└── assets/
    └── logo.svg                    # ← REPLACE with your real logo
```

## How to use

### 1. Replace the catalog pages
Drop your real A4 JPGs into the page folders, named `01.jpg` through `14.jpg`. The current files are placeholders showing where each page goes.

**Recommended specs:**
- Format: JPG, sRGB color
- Dimensions: 1240 × 1754 px (A4 at 150 DPI), or up to 2480 × 3508 px (300 DPI) if you want print-quality zoom
- File size target: 200–500 KB per page (use TinyJPG or `cjpegli` to compress)
- Aspect ratio: must be 210:297 (A4 portrait). The viewer assumes this — non-A4 images will distort.

### 2. Replace the logo
Save your logo as `assets/logo.svg`. Recommended viewBox: `0 0 120 40`. CSS sizes it to 36px tall.

### 3. Splash background images
The splash uses two Unsplash placeholders for the choice cards. Edit `index.html` and replace the `background-image: url(...)` values inside the two `.choice` blocks with your own product photography (1400px wide, JPG).

## Running

The viewer needs a local server (file:// works for the splash but not for cross-folder navigation reliably):

```bash
cd fk-nobel
python3 -m http.server 8080
# open http://localhost:8080
```

Or deploy as static files to: Netlify, Vercel, GitHub Pages, Cloudflare Pages — all zero-config.

## Navigation

Inside the reader:
- **Side arrows** (large floating circles) — prev/next page
- **Top bar arrows** — also prev/next
- **Keyboard** — ↑/↓, PageUp/PageDown, Home/End
- **Page counter** — current/total in top bar
- **Back button** — returns to the splash

## Adding more pages

Currently each catalog has 14 pages. To extend:

1. Add more JPG files to the folder (`15.jpg`, `16.jpg`, etc.)
2. Open `pages/melamine.html` (or `accessories.html`)
3. Find the `<div class="pages-stack">` block
4. Copy the last `<section class="page">...</section>` and update the page number + filename

Or change `data-page-total` and the loop count if you want the counter to update automatically — easier just to copy/paste sections for now since you said you'll edit by hand.

## Print to PDF

Browser-print any reader page (Cmd/Ctrl+P) and the print stylesheet outputs proper A4 pages with no chrome.

## Notes

- Default language: Arabic, RTL layout
- Display font: Cairo Black 900 weight (modern, geometric, Arabic-optimized)
- Body font: Tajawal
- The placeholder JPGs currently show "REPLACE: pages/.../NN.jpg" instructions — they'll disappear when you swap in real artwork.
