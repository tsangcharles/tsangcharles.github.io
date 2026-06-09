# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

**Recommended: Docker**
```bash
docker compose up        # runs at http://localhost:8080 with live reload
```

**Without Docker (requires Ruby + Bundler + Python):**
```bash
bundle install
pip install jupyter
bundle exec jekyll serve  # runs at http://localhost:4000
```

Deployment is automatic — pushing to `master` triggers the GitHub Actions deploy workflow, which builds and pushes to the `gh-pages` branch. Never manually edit `gh-pages`.

## Architecture

This is a Jekyll static site based on the [al-folio](https://github.com/alshedivat/al-folio) theme.

**Content lives in:**
- `_pages/about.md` — homepage (the main page, permalink `/`). Uses the `about` layout. Contains inline `<style>` and `<script>` blocks for the interactive skills cloud visualization.
- `_posts/` — blog posts in Markdown, with front matter for tags and categories
- `_data/cv.yml` — CV content (fallback if `assets/json/resume.json` is absent)
- `_bibliography/papers.bib` — publications (auto-rendered by jekyll-scholar)
- `_config.yml` — all site-wide settings: name, social links, theme, plugins

**Layouts and templates:**
- `_layouts/` — Liquid layout files; `about.liquid` wraps the about page content
- `_includes/` — reusable Liquid partials (social icons, news, latest posts, etc.)
- `_sass/` — SCSS source files. Key files:
  - `_themes.scss` — light/dark mode CSS variables; dark mode selector is `html[data-theme="dark"]`
  - `_variables.scss` — colour palette and design tokens
  - `_layout.scss` — page structure

**Dark mode:** The site sets `html[data-theme="dark"]` on the root element when dark mode is active. Use this selector in any inline `<style>` blocks to provide dark mode overrides.

**Posts:** New posts go in `_posts/` with filename format `YYYY-MM-DD-title.md`. Front matter supports `tags`, `categories`, `math: true` (enables MathJax), and `display_tags` for controlling which tags appear in the UI.

**The skills cloud** (on `_pages/about.md`) is a self-contained HTML/CSS/JS block embedded directly in the Markdown file. It uses absolutely-positioned `::before`/`::after` pseudo-elements for cloud bump shapes. Text inside `.small-cloud` elements must be wrapped in `<span>` to avoid being painted over by the bumps (z-index layering issue with `position: absolute` pseudo-elements).
