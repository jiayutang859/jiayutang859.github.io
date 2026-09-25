# Jiayu Tang – Personal Website

A personal research website. Home has exactly four sections (Who I am ·
Selected Work · My Research Philosophy · Contact); About carries the short bio,
the four-stage trajectory, and the closing statement of the research mindset.
All diagrams are inline SVG animated with CSS and respect `prefers-reduced-motion`. Plain HTML, CSS, and
JavaScript with no build step, served by GitHub Pages from the `main` branch.
The positioning and page-by-page rationale are in `WEBSITE_REDESIGN_PLAN.md`.

Live at <https://jiayutang859.github.io>.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home: two-column hero with portrait; Selected Work split into Current (wide 3D-antibody card) and Previous (animated crossover-trial diagram, systematic-review diagram, both "Manuscript in prep"); five-stage research-philosophy workflow (observe → understand → model & predict → validate → modulate/engineer); contact actions |
| `about.html` | Short "In brief" bio with photo, one Trajectory section (four stage cards, each with field chips and a three-sentence note on what it taught), and a closing "Where it converges" paragraph with the mini loop (non-research interests live on Collections) |
| `research.html` | Current research (question / why / approach / tools / status / learning), research questions (now vs growing toward), methods with proficiency labels, research foundations (project anchors used by the Home cards), output counts |
| `notes.html` | Collections (nav label "Collections"; the URL stays notes.html): a bookshelf, a cinema shelf, thoughts (short fragments + longer notes in draft), and a photo gallery, all rendered from `assets/notes/collections.js` |
| `cv.html` | Full CV: education, research, publications, presentations, awards, layered skills with proficiency labels, teaching, service, certifications |
| `contact.html` | Email, LinkedIn, GitHub, publications, resume |
| `studio/` | Photography site (separate design, see `studio/README.md`) |

## Shared files

| File | Purpose |
|------|---------|
| `style.css` | All styles. Colours and fonts are CSS variables at the top (`--accent`, `--warm`, `--paper`, …) |
| `script.js` | Mobile menu, scroll reveal, CV section highlighting, back-to-top, the 3D antibody inside any `.mol-panel`, and redirects from old single-page links (`/#publications` → `cv.html#publications`) |
| `Resume_Jiayu_Tang.pdf` / `CV_Jiayu_Tang.pdf` | Downloadable resume and full CV |
| `headshot.jpg` | Portrait (Home hero, social previews) |
| `assets/graduation-ms.jpg` | Graduation portrait (About page); the full-resolution `Graduation_MS.JPG` is gitignored |
| `assets/logos/` | Institution, journal, and tool logos (Wikimedia Commons, Simple Icons, official sites) |
| `assets/data/1hzh-backbone.pdb` | Backbone-only human IgG1 structure (PDB 1HZH) rendered with 3Dmol.js |
| `assets/notes/collections.js` | Content for the Notes page: `books[]`, `films[]`, `thoughts[]`, `longer[]`, `photos[]`. Edit this to add items |
| `assets/notes/notes.js` | Renders the collections into `notes.html` (shelves, note cards, gallery, lightbox) |
| `assets/notes/books/`, `films/`, `photos/` | Book covers and posters (identification use; rights stay with publishers and studios) and web-sized copies of selected studio photographs |

The header and footer are repeated in every page. If you change the navigation,
change it in all six pages (and `notes/_template.html`). The photography site is
linked from the footer and the About page, not the main nav.

---

## Adding to the Notes page

Everything on Notes comes from `assets/notes/collections.js`:

- **A book or film:** add an object to `books[]` or `films[]`; drop the cover or
  poster into `assets/notes/books/` or `assets/notes/films/` (portrait, ~600–700 px
  wide is plenty). Fill in `note` only with your own words; it shows under the item.
- **A short thought:** add `{ "date": "YYYY-MM-DD", "text": "…", "tags": [...] }`
  to `thoughts[]`, newest first.
- **A longer note:** copy `notes/_template.html` to `notes/<slug>.html` (drop the
  leading underscore: GitHub Pages does not publish files that start with `_`),
  write it, then set that entry's `link` and change `status` from "In draft" to a date.
- **A photograph:** put a web-sized copy in `assets/notes/photos/` and add
  `{ src, w, h, date, camera, lens, caption, place }` to `photos[]`. Leave `caption`
  and `place` empty rather than guessing.

## Previewing locally

```bash
python3 -m http.server 8767
```

Then open <http://localhost:8767>. Opening the files directly (`file://`) mostly
works, but the 3D antibody needs a local server to load its structure file.

## Search engines

Every page carries `<meta name="robots" content="index, follow">`, so the site is
public and indexable. To hide it again, change that tag to `noindex, nofollow`
in all six pages (and `notes/_template.html`).

## Deploying

Commit and push to `main`; GitHub Pages republishes within a minute or two.
