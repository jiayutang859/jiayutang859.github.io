# Jiayu Tang — Studio

Photography site. Vanilla HTML/CSS/JS, no build toolchain, no dependencies.
Lives at `/studio/` inside the main site (`jiayutang859.github.io`), alongside
the research pages at the root.

## Layout

```
index.html          2026 gallery — the landing page
2025/index.html     2025 gallery
archive/index.html  earlier work
assets/studio.css   all styling
assets/studio.js    justified-row layout + lightbox
build.py            scans img/, reads EXIF, writes data/frames.js
captions.json       hand-written captions — edit this, not frames.js
data/frames.js      generated; do not edit
img/<gallery>/      the photographs
```

The three gallery pages are near-identical shells. They differ only in the
`data-gallery` attribute on `<body>`, the `<h1>`, and which nav link carries
`aria-current`. Everything else lives in the two shared asset files.

## Adding photos

1. Drop the files into `img/2026/` (or `img/2025/`, `img/archive/`). Export
   size doesn't matter — step 2 handles it.
2. Shrink them for the web:

   ```
   python3 resize.py --check   # see what would change
   python3 resize.py           # do it
   ```

   Anything over 2400px on the long edge (or over ~1.8 MB) gets moved to
   `_originals/<gallery>/` and replaced by a 2400px, quality-80 copy under the
   same filename. EXIF survives; orientation is baked in. Originals are never
   deleted and `_originals/` is gitignored, so they stay on your Mac only.
   Running it twice is safe — already-processed files are skipped.

3. Run the build:

   ```
   python3 build.py
   ```

   It reads true pixel dimensions and EXIF from each file, then rewrites
   `data/frames.js`. It also adds an empty entry to `captions.json` for any
   photo it hasn't seen before, and prints which ones still need one.

4. Write the captions in `captions.json`, then run `build.py` again.
5. Reload. Order within a gallery is filename order — rename to re-sequence.

To add a whole new gallery, make a folder under `img/`, add it to
`GALLERY_ORDER` in `build.py`, and copy one of the existing gallery pages,
changing `data-gallery`, the `<h1>`, and the nav.

## How the layout works

`assets/studio.js` packs frames into justified rows: it adds images to a row
until their combined aspect ratio reaches a target, then lets flexbox size
them to a shared height. Wide photos take more width, tall ones less, and
every row ends flush at both edges. Nothing is hand-placed and no crop is
applied — the ratio in `frames.js` is the real ratio of the file.

Under 760px the rows stack to one image per line, since justified rows get
too thin to read on a phone.

## Captions

Two lines can sit under each frame:

- **Description** — whatever you write in `captions.json`. Optional; omitted
  entirely when blank.
- **Specs** — built automatically from EXIF, e.g.
  `Sony ILCE-7M4, FE 35mm F1.8, f/3.2 at 1/125, ISO 250`. Any field the file
  doesn't carry is left out, so a photo with no lens data still reads cleanly.

The spec line is assembled in `specLine()` in `assets/studio.js` — change the
order or drop a field there. On desktop it truncates with an ellipsis rather
than wrapping, so a narrow tile can't push its row taller than its neighbours;
on mobile it wraps normally.

## Lightbox

Click any frame. `←` `→` move, `Esc` closes, `i` toggles the camera details.
Swipe works on touch. Each frame has a permalink — `/studio/#2026-03` opens
the third frame of 2026 directly, and the URL updates as you move through.

The info strip shows whatever EXIF the file actually carries: camera, lens,
focal length, aperture, shutter, ISO, date. The Info button disables itself if
a photo has no EXIF at all.

## Deploying

This folder is part of the main `jiayutang859.github.io` repo and deploys
with it — nothing separate to push. The nav links (`/studio/`, `/studio/2025/`,
`/studio/archive/`) are absolute paths under the main site's domain, so this
only works served from `/studio/`, not as its own site root.

## Keeping originals out of git

Full-resolution exports will blow past GitHub's file size limits. `.gitignore`
excludes `_originals/`, so you can keep camera files there locally without
committing them.
