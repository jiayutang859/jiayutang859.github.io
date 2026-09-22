# Jiayu Tang – Personal Website

A personal research website: narrative first, CV second. Plain HTML, CSS, and
JavaScript with no build step, served by GitHub Pages from the `main` branch.

Live at <https://jiayutang859.github.io>.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home: identity, short story, what I'm exploring, who I'd like to meet, featured projects, notes preview |
| `about.html` | The longer story: food science → nutrition → gut microbiome → clinical trials → AI for science → antibody engineering |
| `research.html` | Projects framed as question / why it matters / approach / tools / status / what I'm learning |
| `notes.html` | Essays and research notes (currently draft titles) |
| `cv.html` | Full CV: education, research, publications, presentations, awards, skills, teaching, service, certifications |
| `contact.html` | Email, LinkedIn, GitHub, publications, resume |
| `studio/` | Photography site (separate design, see `studio/README.md`) |

## Shared files

| File | Purpose |
|------|---------|
| `style.css` | All styles. Colours and fonts are CSS variables at the top (`--accent`, `--warm`, `--paper`, …) |
| `script.js` | Mobile menu, scroll reveal, CV section highlighting, back-to-top, the 3D antibody on Home, and redirects from old single-page links (`/#publications` → `cv.html#publications`) |
| `Resume_Jiayu_Tang.pdf` / `CV_Jiayu_Tang.pdf` | Downloadable resume and full CV |
| `headshot.jpg` | Portrait (About page, social previews) |
| `assets/logos/` | Institution, journal, and tool logos (Wikimedia Commons, Simple Icons, official sites) |
| `assets/data/1hzh-backbone.pdb` | Backbone-only human IgG1 structure (PDB 1HZH) rendered with 3Dmol.js |

The header and footer are repeated in every page. If you change the navigation,
change it in all six pages (and `notes/_template.html`).

---

## Publishing a note

1. Copy `notes/_template.html` to `notes/<slug>.html` (drop the leading underscore:
   GitHub Pages does not publish files that start with `_`).
2. Fill in the `[BRACKETED]` placeholders.
3. In `notes.html`, change the matching `<article class="card note" …>` to
   `<a class="card note" href="notes/<slug>.html">` (and its closing tag to `</a>`),
   and replace the "In draft" label with the date.
4. Optionally do the same for the two note cards on `index.html`.

## Previewing locally

```bash
python3 -m http.server 8765
```

Then open <http://localhost:8765>. Opening the files directly (`file://`) mostly
works, but the 3D antibody needs a local server to load its structure file.

## Preview mode (hidden from search engines)

Every page currently carries `<meta name="robots" content="noindex, nofollow">`,
so search engines won't list the site. Anyone with the link can still open it,
and this repository is public. To go public, change that tag to
`index, follow` in all six pages (and `notes/_template.html`).

## Deploying

Commit and push to `main`; GitHub Pages republishes within a minute or two.
