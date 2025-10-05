# Mars Exploration Hub

A modern static website about Mars exploration, space colonization, and the technologies that will take humanity to the Red Planet.

## Features

- **Modern Design**: Responsive, dark-themed interface optimized for readability
- **Comprehensive Content**: Covers all aspects of Mars exploration and space colonization
- **Cross-Platform**: Builds on macOS, Windows, and Linux
- **GitHub Pages Ready**: Automated deployment with GitHub Actions
- **Free Images**: Uses only properly licensed, free images

## Content Areas

- **Mars Missions**: Past, present, and future robotic and human missions
- **Space Colonies**: Design and planning for permanent space settlements
- **Life Support Systems**: Air, water, and environmental control technologies
- **Space Psychology**: Mental health and human factors for space exploration
- **Food Production**: Growing food in space and on other planets
- **3D Printing**: Manufacturing tools and structures using space resources
- **Space Architecture**: Designing habitats for extreme environments

## Quick Start

### Prerequisites

- Python 3.8 or higher
- Git (for version control and deployment)

### Installation

#### macOS

```bash
# Clone the repository
git clone <your-repo-url>
cd mars-exploration-site

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Build the site
make html

# Serve locally (optional)
make serve
```

#### Windows (PowerShell)

```powershell
# Clone the repository
git clone <your-repo-url>
cd mars-exploration-site

# Create virtual environment
python -m venv venv
venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Build the site
pelican content -o output -s pelicanconf.py

# Serve locally (optional - requires pelican[markdown])
pelican --listen --autoreload content
```

#### Linux (Ubuntu/Debian)

```bash
# Install Python and pip if not already installed
sudo apt update
sudo apt install python3 python3-pip python3-venv git

# Clone the repository
git clone <your-repo-url>
cd mars-exploration-site

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Build the site
make html

# Serve locally (optional)
make serve
```

## Build Commands

### Using Make (macOS/Linux)

```bash
make html          # Build the site
make clean         # Remove generated files
make serve         # Serve locally at http://localhost:8000
make devserver     # Serve with auto-reload
make publish       # Build for production
```

### Using Pelican Directly (All Platforms)

```bash
# Development build
pelican content -o output -s pelicanconf.py

# Production build
pelican content -o output -s publishconf.py

# Serve locally
pelican --listen --autoreload content -o output -s pelicanconf.py
```

## GitHub Pages Deployment

### Automatic Deployment

This site includes GitHub Actions workflow for automatic deployment:

1. **Fork or clone this repository**
2. **Enable GitHub Pages** in repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions
3. **Push to main branch** - site builds and deploys automatically
4. **Access your site** at `https://yourusername.github.io/repository-name`

### Manual Deployment

```bash
# Build for production
make publish

# Deploy using ghp-import (install with: pip install ghp-import)
ghp-import -m "Generate Pelican site" -b gh-pages output
git push origin gh-pages
```

## Customization

### Adding Images

Replace placeholder images in the `/images` directory with free Mars and space exploration images:

**Recommended Sources:**
- [NASA Image Gallery](https://www.nasa.gov/multimedia/imagegallery/)
- [ESA Images](https://www.esa.int/ESA_Multimedia/Images)
- [Unsplash Space Collection](https://unsplash.com/s/photos/space)
- [Pixabay Space Images](https://pixabay.com/images/search/space/)
- [Wikimedia Commons](https://commons.wikimedia.org/)

### Site Configuration

Edit `pelicanconf.py` to customize:
- Site name and description
- Navigation menu items
- Social links
- Author information

### Content Management

- **Pages**: Edit files in `/content/pages/` for main site sections
- **Articles**: Add blog posts to `/content/` directory
- **Theme**: Modify templates in `/theme/templates/` and styles in `/theme/static/css/`

### Production Settings

Update `publishconf.py`:
- Set your actual site URL
- Configure analytics (Google Analytics, etc.)
- Enable RSS feeds if desired

## Project Structure

```
mars-exploration-site/
├── content/                 # Site content
│   └── pages/              # Main pages
├── theme/                  # Custom theme
│   ├── templates/          # HTML templates
│   └── static/            # CSS, JS, images
├── images/                # Site images
├── extra/                 # Static files (favicon, etc.)
├── output/                # Generated site (created during build)
├── venv/                  # Python virtual environment
├── .github/workflows/     # GitHub Actions
├── requirements.txt       # Python dependencies
├── pelicanconf.py        # Development settings
├── publishconf.py        # Production settings
├── Makefile              # Build commands (macOS/Linux)
└── README.md             # This file
```

## Dependencies

- **Pelican**: Static site generator
- **Markdown**: Content formatting
- **Typogrify**: Typography enhancement

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is open source. Content should use properly licensed images and respect copyright.

## Troubleshooting

### Common Issues

**Build Errors:**
- Ensure Python 3.8+ is installed
- Verify virtual environment is activated
- Check that all dependencies are installed

**Image Issues:**
- Replace placeholder images with actual images
- Ensure image paths are correct in content files
- Verify image file formats (JPG, PNG, WebP supported)

**Deployment Issues:**
- Check GitHub Actions logs for deployment errors
- Verify GitHub Pages is enabled in repository settings
- Ensure `publishconf.py` has correct SITEURL

**Local Development:**
- If `make` commands don't work on Windows, use `pelican` commands directly
- For permission issues, check virtual environment activation
- If serving fails, try different port: `pelican --listen --port 8080`

### Platform-Specific Notes

**Windows:**
- Use PowerShell or Command Prompt
- Make commands may not work - use pelican commands directly
- Path separators use backslashes in Windows

**macOS:**
- Xcode command line tools may be required for some dependencies
- Use Terminal or iTerm2

**Linux:**
- Install python3-dev if encountering compilation issues
- Some distributions require python3-venv package

## Support

For issues and questions:
1. Check this README
2. Review Pelican documentation
3. Open an issue in the repository

---

**Ready to explore Mars?** Build the site and start your journey to the Red Planet! 🚀