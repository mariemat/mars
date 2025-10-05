# Client-Side Mars Exploration Site

This is a **fully client-side** static website with NO build step required. The site uses JavaScript to dynamically load and render Markdown files in the browser.

## Key Features

✅ **No Build Step** - Just edit markdown files and reload the page
✅ **No Server Required** - Runs entirely in the browser
✅ **Rich Formatting Preserved** - All inline HTML and CSS in markdown files work perfectly
✅ **Easy Updates** - Anyone can edit `.md` files without knowing Pelican or Python

## How It Works

1. **index.html** - Single HTML file that serves the entire site
2. **app.js** - JavaScript that loads `.md` files and renders them with `marked.js`
3. **content/pages/*.md** - All your content files (bibliography, movies, etc.)
4. **theme/static/css/main.css** - All the styling

## Running Locally

You need a simple local server because browsers block `file://` requests for security.

### Option 1: Python (Recommended)

```bash
# From the project directory
python3 -m http.server 8000
```

Then visit: `http://localhost:8000`

### Option 2: Node.js

```bash
# Install http-server globally (one time only)
npm install -g http-server

# Run server
http-server -p 8000
```

Then visit: `http://localhost:8000`

### Option 3: PHP

```bash
php -S localhost:8000
```

Then visit: `http://localhost:8000`

### Option 4: VS Code Extension

Install "Live Server" extension and click "Go Live" button.

## Editing Content

### To Update Existing Pages

1. Open any `.md` file in `content/pages/`
2. Edit the content (markdown + inline HTML works!)
3. Save the file
4. Refresh your browser

That's it! No build, no deploy, no commands to run.

### To Add a New Page

1. Create a new `.md` file in `content/pages/` (e.g., `new-topic.md`)
2. Add frontmatter at the top:
   ```
   Title: New Topic
   Date: 2024-01-01
   Slug: new-topic
   ```
3. Add your content below the frontmatter
4. Add a menu item in `index.html`:
   ```html
   <li><a href="#new-topic" class="nav-link" onclick="loadPage(event, 'new-topic')">📘 New Topic</a></li>
   ```

## How Markdown + HTML Works

Your bibliography and movies pages use **inline HTML** in the markdown files. This works perfectly with client-side rendering!

Example from bibliography.md:
```html
<div style="display: flex; align-items: flex-start; margin-bottom: 2rem;">
  <img src="https://..." alt="Book Cover" style="...">
  <div>
    <h4>Book Title</h4>
    <p>Description...</p>
  </div>
</div>
```

The `marked.js` library renders the markdown AND preserves all your HTML/CSS, so your rich book and movie cards display perfectly.

## Deployment

### GitHub Pages

1. Create a repository
2. Push all files
3. Go to Settings → Pages
4. Set source to "main branch"
5. Your site is live at `https://yourusername.github.io/repository-name`

### Any Static Host

Just upload all files to:
- Netlify
- Vercel
- Cloudflare Pages
- Any web server

No build configuration needed!

## What Changed from Pelican?

### Removed
- ❌ Python virtual environment
- ❌ Pelican build step
- ❌ `make html` commands
- ❌ Output directory generation
- ❌ Template processing

### Added
- ✅ Single `index.html` file
- ✅ `app.js` for dynamic page loading
- ✅ `marked.js` CDN library (11KB)

### Kept Exactly the Same
- ✅ All markdown content files
- ✅ All CSS styling
- ✅ All images
- ✅ Site structure and navigation
- ✅ Rich HTML formatting in bibliography/movies

## Browser Requirements

- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Works offline after first load (can be enhanced with Service Worker)

## Performance

- **First Load**: ~50KB (HTML + CSS + JS)
- **Page Switch**: 5-20KB (just the markdown file)
- **External Images**: Loaded on-demand from Amazon/IMDB

Much faster than a full Pelican build!

## Troubleshooting

### Pages don't load
- Make sure you're running a local server (not opening `file://` directly)
- Check browser console for errors

### Images don't show
- External images (Amazon, IMDB) require internet connection
- Local images should be in the correct path

### Styling looks wrong
- Make sure `theme/static/css/main.css` is loaded
- Check browser console for 404 errors

## Advanced: Adding Features

### Search Functionality
Could be added with a simple JavaScript search of all loaded pages.

### Table of Contents
Could generate from markdown headings automatically.

### Dark Mode Toggle
Add a toggle button that switches CSS variables.

All possible with pure JavaScript - no build step needed!
