# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a client-side JavaScript single-page application (SPA) for a Mars exploration and space colonization educational website. The site dynamically loads and renders markdown content using marked.js, and is configured for deployment to GitHub Pages.

## Common Commands

### Development
Simply open `index.html` in a web browser or use a local HTTP server:

```bash
# Using Python's built-in HTTP server
python3 -m http.server 8000

# Using Node's http-server (if installed)
npx http-server -p 8000

# Using PHP's built-in server
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

### Deployment
The site is deployed to GitHub Pages. Simply push changes to the repository:
```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Pages will automatically serve the site from the root directory.

## Architecture

### Core Files
- **index.html**: Main HTML file containing the site structure, banner, navigation sidebar, and footer
  - Site title "Mars Launchpad" defined in multiple locations (see line 7, 34, 90)
  - Navigation menu hardcoded in sidebar (lines 45-62)
  - Loads marked.js from CDN for markdown parsing
- **app.js**: Client-side JavaScript that handles:
  - Dynamic page loading from markdown files
  - Custom markdown renderer with special code block types
  - URL routing via hash-based navigation
  - Mobile menu functionality
  - Footer time updates
- **css/main.css**: Custom styling with dark theme, Inter font, responsive layout

### Content Structure
- **content/pages/**: Markdown files for site pages
  - Each page has frontmatter with metadata: `Title`, `Date`, `Slug`
  - Frontmatter format:
    ```markdown
    ---
    Title: Page Title
    Date: 2024-01-01
    Slug: page-slug
    ---

    Page content here...
    ```
  - Pages cover topics like missions, rovers, life support, colonies, transportation, etc.
  - Files are loaded via `fetch()` at `./content/pages/{slug}.md`

### URL Routing
- Hash-based client-side routing: `index.html#mars-missions`
- Handled by `loadPageBySlug()` function in app.js
- Browser back/forward buttons supported via `hashchange` event listener
- Default loads `home.md` when no hash or `#home` is present

### Navigation
- Navigation menu is hardcoded in index.html sidebar (lines 45-62)
- Each menu item uses `onclick` handlers: `loadPage(event, 'slug')`
- Active link highlighting handled by `setActiveNavLink()` in app.js
- Responsive mobile menu with hamburger toggle and overlay

## Research Methodology

**Amazon ASIN Verification**: Each Amazon Standard Identification Number (ASIN) has been researched to ensure direct links to the correct book editions. ASINs are Amazon's unique product identifiers that provide reliable linking.

**ISBN Cross-Reference**: All ISBN-13 numbers have been verified against multiple book databases to ensure accuracy.

**Link Reliability**: All Amazon links use the format `amazon.com/dp/[ASIN]` which provides the most stable linking method.

## Content Styling System

This site uses a custom content styling system for creating rich, styled content blocks without writing HTML. See `CONTENT-STYLES.md` for complete documentation.

### Available Custom Blocks

The site supports special fenced code-block languages that render as styled cards. Each block uses `key: value` lines.

#### `stats` — statistics card grid
```stats
title: Quick Mars Facts
stat1_value: 687
stat1_label: Earth days per Mars year
stat2_value: -63°C
stat2_label: Average surface temp
```
Numbered pairs `statN_value` / `statN_label` build a responsive grid of stat tiles.

#### `movie` — movie info card
```movie
title: The Martian
year: 2015
director: Ridley Scott
starring: Matt Damon
rating: 8.0
imdb: https://www.imdb.com/title/tt3659388/
poster: images/martian.jpg
description: Stranded astronaut survives on Mars.
```

#### `book` — book info card
```book
title: The Martian
author: Andy Weir
year: February 2014
isbn: 978-0-553-41802-6
asin: B00EMXBDMA           # auto-generates Amazon link if `amazon:` omitted
cover: images/martian.jpg
description: ...
```

#### `rover` — rover / mission info card
```rover
name: Perseverance
type: rover                 # rover | helicopter | aircraft | mission | campaign
landing: Feb 18, 2021
status: Active
site: Jezero Crater
coordinates: 18.4°N 77.5°E
mission: Astrobiology
duration: Ongoing
image: images/perseverance.jpg
description: ...
link: https://mars.nasa.gov/...
link_text: NASA mission page
```
Note: rover cards render as plain text — no emojis on Type/Status.

#### `gallery` — auto-advancing image carousel
````markdown
```gallery
* images/photo1.jpg: First photo description
* images/photo2.jpg: Second photo description
```
````
- Bullet list of `path: description` pairs
- Auto-advances every 30s; stops when user clicks prev/next
- Single-image galleries disable the navigation buttons

### Image syntax extensions

Standard markdown images (`![alt](src)`) work, plus optional modifiers in the alt text after `|` (any order, separated by `|`):

| Syntax | Effect |
|---|---|
| `![alt\|50%](src)` | 50% of the image's **natural** size (not container width) |
| `![alt\|300px](src)` or `![alt\|300](src)` | Explicit pixel width |
| `![alt\|300x200](src)` | Explicit width × height |
| `![alt\|left](src)` | Float left, text wraps |
| `![alt\|right](src)` | Float right, text wraps |
| `![alt\|center](src)` | Centered block |
| `![alt\|border](src)` | White photo-style border (12px) with soft drop shadow |
| `![alt\|polaroid](src)` | Polaroid frame: thick white border, taller bottom edge, slight tilt, deeper shadow |
| `![alt\|50%\|right\|border](src)` | Combine modifiers in any order |

`border` and `polaroid` are mutually exclusive (only one frame style applies).

Filenames with `+` characters must be URL-encoded as `%2B` (e.g. `mission%2B4%2Bpatch.webp`).

All content images are clickable and open in a fullscreen lightbox (handled by `initializeLightbox`).

### Implementation Location

- Parser logic: `app.js` — custom marked.js renderer (`renderer.code` for blocks, `renderer.image` for image modifiers)
- Styles: Inline styles in generated HTML; gallery and lightbox styles in `css/main.css`
- Documentation: `CONTENT-STYLES.md` — complete syntax reference and examples
