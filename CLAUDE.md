# sfarrens.github.io — context for change requests

Personal academic website of Samuel Farrens (Research Director, CosmoStat, CEA Paris-Saclay).
Jekyll 3 site served by GitHub Pages from `master` → https://sfarrens.github.io.
Custom theme (`sf_theme.gemspec`); no remote theme.

## Build & preview

- Local: `./serve.sh` (uses `Gemfile.dev` — bypasses `github-pages` because of Ruby 4.0; livereload on).
- Production build is GitHub Pages' own (`Gemfile` → `github-pages`). Only whitelisted plugins work
  there; currently just `jekyll-target-blank`.
- There is no CI; GitHub Pages builds on push.
- Verify changes by building and checking the page at phone (≤600px), tablet (601–960px) and desktop widths,
  in both light and dark mode.

## Site map

| Page | Source | Content comes from |
|---|---|---|
| Home | `index.html` → `_layouts/home.html` | `homeimage.png`, `_data/icons.yml` (social icons) |
| About | `about.md` | page front matter (`myname`, `tagline`, `position`) + `_includes/about_hero.html` |
| CV | `cv.md` | front-matter lists `cv_info`, `cv_experience`, `cv_education`, `cv_talks`, `cv_supervision`, `cv_teaching`, `cv_events`, `cv_community`, `cv_skills`, `cv_observing`, `cv_outreach`, rendered by `_includes/cv_*.html` |
| Publications | `publications.md` | `_data/papers.yml` → `_includes/paper_card.html` |
| Software | `software.md` | `_data/software.yml` → `_includes/software_card.html` |
| Tutorials | `tutorials.md` | `_posts/*` with `category: tutor` → `_includes/tutorial_card.html` |
| Presentations | external: `https://sfarrens.github.io/presentations/` (separate repo) | — |
| Travel | `travel.md` → `_layouts/travel.html` | front matter `visited_countries` / `visited_territories`, `_data/country_flags.yml`, `assets/countries.geojson` (Leaflet map) |
| Blog | `blog.md` | `_posts/*` with `category: blog` → `_includes/blog_card.html` |

Navigation is **hard-coded** in `_includes/navigation.html` — add/rename menu items there.

## Common edits — where to make them

- **Add a paper**: prepend to `_data/papers.yml` (newest first). Fields: `title, image, year, journal, authors,
  arxiv, ads, pdf, bibtex, doi, excerpt`. Card links to arxiv → doi → ads. "First-author only" filter
  matches when the first entry of `authors` is exactly `S. Farrens`. Thumbnail goes in `assets/images/`
  (naming: `<firstauthor><year>_<topic>.png`); missing image falls back to `default.svg`.
- **Add software**: `_data/software.yml`. Fields: `title, image, language, github, docs, pypi, description`.
  Language filter buttons are generated from `language`.
- **Add a blog post**: `_posts/YYYY-MM-DD-slug.md` with `category: blog`, `tag`, `visibility: public`
  (anything else hides it from the listing), optional `image` (header + card + Twitter card), `excerpt`.
  Tag filter buttons are generated from tags.
- **Scrollytelling post**: `layout: scrollytelling`; `---` separates scenes; per-scene options via an HTML
  comment `<!-- cell: layout=overlay|split-left|..., graphic=state(N)|image(URL), size=50% -->`;
  optional `graphic_script:` front matter for a local JS file (e.g. `assets/js/graphics/magnitude-scale.js`).
  See `assets/js/scrollytelling.js`.
- **Add a tutorial**: `_posts/…` with `category: tutor`, `layout: post-tutor`, `tag`, `image`, `github`, optional `binder`.
- **Add a country**: add the name to `travel.md` (must match the feature's `name` property in `assets/countries.geojson`,
  e.g. "Republic of Serbia", "The Bahamas", "South Korea"), keeping the list alphabetical; the flag emoji
  comes from `_data/country_flags.yml` (keyed by the same name). The PNG flags in `assets/images/` are for
  the CV timeline and blog posts, not the Travel page.
- **Add a flag image**: `python3 scripts/add_flag.py jp:japan` renders the Twemoji flag at 240px — the
  same source as all existing flags (needs `playwright`). Files are named by country (`japan.png`).
- **Add images**: keep them ≤1600px on the long side and JPEG (quality ~80) for photos; strip EXIF
  (phone photos can carry GPS). Anything in `assets/` is published.
- **New top-level files/folders** are published unless added to `exclude:` in `_config.yml` (that list
  replaces Jekyll's defaults).
- **Unlisted drafts**: `published: false` in front matter keeps a post off the live site entirely
  (`visibility: private` only hides it from the blog listing).
- **CV**: edit front-matter lists in `cv.md`. The downloadable PDF is `assets/files/farrens_cv.pdf`; the
  LaTeX source lives in `CV 2026/` — rebuild there and copy the PDF across.
- **Social icons**: `_data/icons.yml`.
- **Footer**: `_includes/footer.html`.

## Styling

- Entry: `assets/css/style.scss` → `_sass/_my_style.scss`, which imports the partials.
- All colours/fonts/sizes are variables in `_sass/variables.scss` (light palette + `$dm-*` dark palette).
  Accent is terracotta `#c0584e` (dark mode `#e0705a`). System font stack, no web fonts.
- Breakpoint mixins in `_sass/size.scss`: `mobile` (≤600), `tablet` (601–960), `desktop` (≥961),
  `desktoptab`, `tabletmobile`. The JS in `_includes/scripts.html` also hard-codes 960.
- Dark mode = `body.dark-mode` (toggle stored in `localStorage`, defaults to OS preference); every new
  component needs a dark-mode rule.
- Shared card grid: `_sass/cards.scss` (`.data-cards-grid`, `--list` variant). Filter pills reuse `.pub-filter-*`.

## Client-side features (`_includes/scripts.html`)

Copy blocks (`<div class="copy-block" data-copy-label="…" markdown="1">…</div>` — framed text with a
visible Copy button; used for the About-page bio; styles in `_sass/markdown.scss`),
sticky TOC with active-section highlighting (`* TOC\n{:toc}` in markdown), hide-on-scroll nav, dark mode,
reading mode, GitHub-style alerts (`> [!NOTE|TIP|IMPORTANT|WARNING|CAUTION|DISCLAIMER]`), code-block
language labels and copy buttons, table wrapping, external links in new tab, back-to-top button.
MathJax 3 and Google Analytics load in `_includes/head.html`. External scripts use SRI hashes — keep that
when adding or upgrading any CDN dependency.

## Remaining notes

- `.sass-cache/` and `_site/` exist locally but are git-ignored.
- `assets/countries.geojson` was simplified (Sept 2026) to ~2 MB with only the `name` property kept;
  if it is ever replaced, simplify again and keep `name` (the map and `travel.md` depend on it).
- The magnitude blog post (2026-05-15) is marked work in progress.

## Conventions

- Commit directly to `master` only when asked; commit messages are short imperative summaries
  (e.g. "Add two 2026 papers: …", "Fix … link URL").
- Keep content changes data-driven (YAML / front matter) rather than hard-coding HTML in pages.
- Match the existing style: 2-space YAML, vanilla ES5-style IIFEs for JS, SCSS variables instead of literal colours.
