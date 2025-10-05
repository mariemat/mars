# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Pelican-based static site generator project for a Mars exploration and space colonization educational website. The site is configured for deployment to GitHub Pages with automated builds.

## Common Commands

### Development Build and Serve
```bash
# Build the site for development
make html

# Serve with live reload on http://localhost:8000
make devserver

# Or use Pelican directly (cross-platform)
pelican content -o output -s pelicanconf.py
pelican --listen --autoreload content -o output -s pelicanconf.py
```

### Production Build
```bash
# Build for production deployment
make publish

# Or use Pelican directly
pelican content -o output -s publishconf.py
```

### Clean Generated Files
```bash
make clean
```

### Virtual Environment
The project uses a Python virtual environment in `venv/`. Activate before running commands:
```bash
# macOS/Linux
source venv/bin/activate

# Windows PowerShell
venv\Scripts\Activate.ps1
```

## Architecture

### Configuration Files
- **pelicanconf.py**: Development settings with `RELATIVE_URLS = True` for local testing
- **publishconf.py**: Production settings, imports pelicanconf.py and overrides `SITEURL` and `RELATIVE_URLS = False`

### Content Structure
- **content/pages/**: Markdown files for main site pages (not blog posts)
  - Each page has metadata: `Title`, `Date`, `Slug`
  - Slug determines URL path (e.g., `Slug: mars-missions` → `/mars-missions/`)
  - Pages cover topics like missions, rovers, life support, colonies, transportation, etc.

### Theme Architecture
Located in `theme/` directory with custom templates:
- **templates/base.html**: Base template with banner, sidebar navigation, and footer
  - Banner uses `BANNER_IMAGE`, `BANNER_TITLE`, `BANNER_SUBTITLE` from config
  - Sidebar renders navigation from `MENUITEMS` in pelicanconf.py
  - Footer displays generation time from datetime plugin
- **templates/page.html**: Page content template (extends base.html)
- **templates/index.html**: Homepage template
- **templates/article.html**: Article/blog post template
- **static/css/main.css**: Custom styling with dark theme, Inter font, responsive layout

### Plugin System
- **plugins/datetime_plugin.py**: Custom Pelican plugin that adds `GENERATION_TIME` to template context
- Plugin registered in pelicanconf.py: `PLUGIN_PATHS = ['plugins']`, `PLUGINS = ['datetime_plugin']`

### URL Structure
Configured in pelicanconf.py:
- Pages: `/{slug}/` (e.g., `/mars-missions/`)
- Articles: `/{category}/{slug}/`
- Output saved as `index.html` in respective directories for clean URLs

### Menu Configuration
Navigation menu defined in `MENUITEMS` tuple in pelicanconf.py. Each entry is `(label, url)`. Labels include emoji prefixes for visual distinction.

## Important Notes

- The site uses relative URLs in development but absolute URLs in production
- Custom plugins are loaded from the `plugins/` directory
- Static files (images, favicon) are defined in `STATIC_PATHS` and `EXTRA_PATH_METADATA`
- The theme expects specific config variables: `BANNER_IMAGE`, `BANNER_TITLE`, `BANNER_SUBTITLE`, `MENUITEMS`
- Production builds should update `SITEURL` in publishconf.py to match actual deployment URL

## Dependencies

Core dependencies in requirements.txt:
- pelican[markdown]>=4.8.0
- markdown>=3.4.0
- typogrify>=2.0.7
