# Mars Launchpad 🚀

A modern, client-side static website about Mars exploration, space colonization, and the technologies that will take humanity to the Red Planet.

**✨ Zero build step required** - Just edit markdown files and refresh your browser!

## Features

- **🚀 Pure Client-Side Rendering**: No build tools, no dependencies, just HTML/CSS/JavaScript
- **📝 Custom Content Blocks**: Easy-to-use markdown extensions for movies, books, rovers, and stats
- **📱 Responsive Design**: Dark-themed interface optimized for all devices
- **🎨 Auto-Generated Icons**: Type and status-based icons automatically added to content
- **🔗 Smart Link Generation**: Amazon links auto-generated from ASIN numbers
- **🌐 GitHub Pages Ready**: Deploy instantly to GitHub Pages - just push and go!

## Quick Start

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd mars-exploration-site

# Start the development server
make serve

# Open http://localhost:8910 in your browser
```

That's it! No installation, no build step, no dependencies (besides Python for the local server).

### Makefile Commands

```bash
make serve       # Start development server on port 8910
make stop        # Stop the development server
make clean       # Clean up temporary files
make help        # Show all available commands
```

**Custom port:**
```bash
make serve PORT=3000
```

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Push your repository to GitHub**
2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / root
   - Click Save
3. **Done!** Your site will be available at:
   - `https://yourusername.github.io/repository-name`

No GitHub Actions needed - GitHub Pages serves the files directly!

## Content Management

### Editing Content

All content is in markdown files in `content/pages/`:

- `home.md` - Home page with Quick Mars Facts
- `mars-rovers.md` - Mars rover information
- `mars-missions.md` - Mission history and timeline
- `movies.md` - Space exploration films
- `bibliography.md` - Essential Mars reading
- And more...

### Custom Content Blocks

This site uses special markdown syntax for rich content. See `CONTENT-STYLES.md` for complete documentation.

#### Stats Block

```markdown
\`\`\`stats
title: Quick Mars Facts
stat1_value: 225M km
stat1_label: Distance to Mars
stat2_value: 687 days
stat2_label: Mars Year
\`\`\`
```

#### Rover Block

```markdown
\`\`\`rover
name: Perseverance (Mars 2020)
type: rover
landing: February 18, 2021
status: Active
site: Jezero Crater
image: https://upload.wikimedia.org/wikipedia/commons/...
link: https://mars.nasa.gov/mars2020/
link_text: Mars 2020 Mission
description: The most advanced Mars rover ever built...
\`\`\`
```

Icons are automatically generated based on:
- **Type**: rover (🤖), helicopter (🚁), mission (🚀)
- **Status**: Active (✅), Inactive (❌), Hibernating (⚠️), Future (⏳)

#### Movie Block

```markdown
\`\`\`movie
title: The Martian
year: 2015
director: Ridley Scott
rating: 8.0
imdb: https://www.imdb.com/title/tt3659388/
poster: https://image.tmdb.org/t/p/w300/...
description: Based on Andy Weir's novel...
\`\`\`
```

Rating formatting (⭐ and /10) is added automatically.

#### Book Block

```markdown
\`\`\`book
title: The Martian
author: Andy Weir
year: February 2014
isbn: 978-0-553-41802-6
asin: B00EMXBDMA
cover: https://images-na.ssl-images-amazon.com/...
description: The survival thriller...
\`\`\`
```

Amazon link is auto-generated from ASIN if not provided.

## Project Structure

```
mars-exploration-site/
├── index.html              # Main HTML file (entry point)
├── app.js                  # Client-side rendering logic
├── css/
│   └── main.css           # Styles
├── content/pages/         # Markdown content files
│   ├── home.md
│   ├── mars-rovers.md
│   ├── mars-missions.md
│   ├── movies.md
│   ├── bibliography.md
│   └── ...
├── images/                # Site images
│   └── mars-rover-banner.jpg
├── Makefile              # Development server commands
├── CLAUDE.md             # AI assistant documentation
├── CONTENT-STYLES.md     # Content styling guide
└── README.md             # This file
```

## How It Works

1. **Client-Side Rendering**: Uses `marked.js` to parse markdown in the browser
2. **Custom Renderer**: Extends marked.js to handle special code blocks
3. **Dynamic Loading**: Fetches markdown files via JavaScript and renders them
4. **No Build Step**: Everything happens in the browser - just refresh to see changes

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

All modern browsers with ES6+ support.

## Adding Content

### New Page

1. Create a new markdown file in `content/pages/`:
   ```bash
   echo "# My New Page\n\nContent here..." > content/pages/my-page.md
   ```

2. Add navigation link in `index.html`:
   ```html
   <li><a href="#my-page" class="nav-link" onclick="loadPage(event, 'my-page')">🆕 My Page</a></li>
   ```

3. Refresh your browser - that's it!

### Adding Images

1. Add images to the `images/` directory
2. Reference them in markdown:
   ```markdown
   ![Mars Surface](images/mars-surface.jpg)
   ```

**Recommended free image sources:**
- [NASA Image Gallery](https://www.nasa.gov/multimedia/imagegallery/)
- [ESA Images](https://www.esa.int/ESA_Multimedia/Images)
- [Unsplash Space Collection](https://unsplash.com/s/photos/space)
- [Wikimedia Commons](https://commons.wikimedia.org/)

## Customization

### Styling

Edit `css/main.css` to customize:
- Colors and themes
- Typography
- Layout and spacing
- Component styles

### Site Metadata

Edit `index.html` to change:
- Site title and description
- Banner text
- Navigation menu
- Footer links

### Custom Blocks

Add new content block types in `app.js`:

```javascript
renderer.code = function(code, language) {
    if (language === 'myblock') {
        return renderMyBlock(code);
    }
    // ...
};
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `make serve`
5. Submit a pull request

## Migration Notes

This site was migrated from Pelican (Python static site generator) to pure client-side rendering:

- ✅ **Before**: Python + Pelican + Build step
- ✅ **After**: Pure HTML/CSS/JavaScript + No build step
- ✅ **Result**: Simpler, faster, easier to maintain

See `README-CLIENT-SIDE.md` for the original migration documentation.

## Troubleshooting

**Server won't start:**
```bash
make stop  # Kill any existing server
make serve # Start fresh
```

**Port already in use:**
```bash
make serve PORT=3000  # Use different port
```

**Content not loading:**
- Check browser console for errors
- Verify markdown file exists in `content/pages/`
- Ensure filename matches the slug used in navigation

**CORS errors when opening directly:**
- Don't open `index.html` directly as `file://`
- Always use `make serve` to run a local server
- This is a browser security requirement for fetch()

## License

This project is open source. Content should use properly licensed images and respect copyright.

---

**Ready to explore Mars?** Start the server and begin your journey to the Red Planet! 🚀

**No build step. No dependencies. Just pure Mars exploration.** 🔴
