// Custom renderer for special code blocks
const renderer = new marked.Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);

renderer.code = function(code, language) {
    // Handle custom block types
    if (language === 'stats') {
        return renderStatsBlock(code);
    } else if (language === 'movie') {
        return renderMovieBlock(code);
    } else if (language === 'book') {
        return renderBookBlock(code);
    } else if (language === 'rover') {
        return renderRoverBlock(code);
    } else if (language === 'gallery') {
        return renderGalleryBlock(code);
    }

    // Fall back to default code rendering
    return originalCodeRenderer(code, language);
};

// Configure marked to allow HTML in markdown
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false,
    sanitize: false, // Allow HTML in markdown (safe for our controlled content)
    renderer: renderer
});

// Parse key-value pairs from code block content
function parseKeyValues(content) {
    const data = {};
    const lines = content.trim().split('\n');

    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            data[key] = value;
        }
    });

    return data;
}

// Render stats block
function renderStatsBlock(content) {
    const data = parseKeyValues(content);
    let html = '<div style="background: white; border-radius: 12px; padding: 2rem; margin: 2rem 0; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">';

    if (data.title) {
        html += `<h3 style="color: #1a1a2e; font-size: 1.5rem; margin-bottom: 1.5rem; border-bottom: 3px solid #cc2936; padding-bottom: 0.5rem;">${data.title}</h3>`;
    }

    html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem;">';

    // Find all stat items (stat1_value, stat2_value, etc.)
    let i = 1;
    while (data[`stat${i}_value`]) {
        const value = data[`stat${i}_value`];
        const label = data[`stat${i}_label`] || '';

        html += `
            <div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px;">
                <div style="font-size: 2rem; font-weight: 700; color: #cc2936; margin-bottom: 0.5rem;">${value}</div>
                <div style="font-size: 0.9rem; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">${label}</div>
            </div>
        `;
        i++;
    }

    html += '</div></div>';
    return html;
}

// Render movie block
function renderMovieBlock(content) {
    const data = parseKeyValues(content);
    const poster = data.poster || '';

    let html = '<div style="display: flex; align-items: flex-start; margin-bottom: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #cc2936;">';

    if (poster) {
        html += `<img src="${poster}" alt="${data.title} Poster" style="width: 120px; height: 180px; margin-right: 1rem; border-radius: 4px; object-fit: cover;" onerror="this.style.background='#ddd'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='🎬<br>Poster'; this.style.color='#666'; this.style.fontSize='12px'; this.style.textAlign='center';">`;
    }

    html += '<div>';

    if (data.title) {
        html += `<h4 style="margin: 0 0 0.5rem 0; color: #cc2936;">${data.title}${data.year ? ` (${data.year})` : ''}</h4>`;
    }

    html += '<p>';
    if (data.director) html += `<strong>Director:</strong> ${data.director}<br>`;
    if (data.starring) html += `<strong>Starring:</strong> ${data.starring}<br>`;
    if (data.rating) html += `<strong>IMDB Rating:</strong> ⭐ ${data.rating}/10<br>`;
    if (data.imdb) html += `<strong>IMDB Link:</strong> <a href="${data.imdb}" target="_blank">View on IMDB</a>`;
    html += '</p>';

    if (data.description) {
        html += `<p style="margin-top: 0.5rem;">${data.description}</p>`;
    }

    html += '</div></div>';
    return html;
}

// Render book block
function renderBookBlock(content) {
    const data = parseKeyValues(content);
    const cover = data.cover || '';

    // Generate Amazon link from ASIN if not explicitly provided
    const amazonLink = data.amazon || (data.asin ? `https://www.amazon.com/dp/${data.asin}` : '');

    let html = '<div style="display: flex; align-items: flex-start; margin-bottom: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #cc2936;">';

    if (cover) {
        html += `<img src="${cover}" alt="${data.title} Cover" style="width: 120px; height: 180px; margin-right: 1rem; border-radius: 4px; object-fit: cover;" onerror="this.style.background='#ddd'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='📚<br>Cover'; this.style.color='#666'; this.style.fontSize='12px'; this.style.textAlign='center';">`;
    }

    html += '<div>';

    if (data.title) {
        html += `<h4 style="margin: 0 0 0.5rem 0; color: #cc2936;">${data.title}</h4>`;
    }

    html += '<p>';
    if (data.author) html += `<strong>Author:</strong> ${data.author}<br>`;
    if (data.year) html += `<strong>Publication Date:</strong> ${data.year}<br>`;
    if (data.isbn) html += `<strong>ISBN-13:</strong> ${data.isbn}<br>`;
    if (data.asin) html += `<strong>Amazon ASIN:</strong> ${data.asin}<br>`;
    if (amazonLink) html += `<strong>Amazon Link:</strong> <a href="${amazonLink}" target="_blank">View on Amazon</a>`;
    html += '</p>';

    if (data.description) {
        html += `<p style="margin-top: 0.5rem;">${data.description}</p>`;
    }

    html += '</div></div>';
    return html;
}

// Render rover block
function renderRoverBlock(content) {
    const data = parseKeyValues(content);
    const image = data.image || '';

    // Determine base icon from type (for image fallback only)
    const type = (data.type || 'rover').toLowerCase();
    let icon = data.icon;
    if (!icon) {
        if (type === 'helicopter' || type === 'aircraft') {
            icon = '🚁';
        } else if (type === 'mission' || type === 'campaign') {
            icon = '🚀';
        } else {
            icon = '🤖';
        }
    }

    // Determine status icon (for status display only)
    let statusIcon = '';
    const status = (data.status || '').toLowerCase();
    if (status.includes('inactive')) {
        statusIcon = '❌';
    } else if (status.includes('hibernating')) {
        statusIcon = '⚠️';
    } else if (status.includes('future')) {
        statusIcon = '⏳';
    } else if (status.includes('active')) {
        statusIcon = '✅';
    }

    let html = '<div style="display: flex; align-items: flex-start; margin-bottom: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #cc2936;">';

    // Use image if provided, otherwise use gradient background with icon
    if (image) {
        html += `<img src="${image}" alt="${data.name}" style="width: 120px; height: 180px; margin-right: 1rem; border-radius: 4px; object-fit: cover;" onerror="this.style.background='linear-gradient(135deg, #cc2936, #ff6b35)'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='${icon}'; this.style.color='white'; this.style.fontSize='48px'; this.removeAttribute('src');">`;
    } else {
        html += `<div style="width: 120px; height: 180px; margin-right: 1rem; border-radius: 4px; background: linear-gradient(135deg, #cc2936, #ff6b35); display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; flex-shrink: 0;">${icon}</div>`;
    }

    html += '<div>';

    if (data.name) {
        html += `<h4 style="margin: 0 0 0.5rem 0; color: #cc2936;">${data.name}</h4>`;
    }

    // Determine type icon for display (reuse type variable from above)
    let typeIcon = '🤖';
    if (type === 'helicopter' || type === 'aircraft') {
        typeIcon = '🚁';
    } else if (type === 'mission' || type === 'campaign') {
        typeIcon = '🚀';
    }

    html += '<p>';
    if (data.type) html += `<strong>Type:</strong> ${typeIcon} ${data.type.charAt(0).toUpperCase() + data.type.slice(1)}<br>`;
    if (data.landing) html += `<strong>Landing Date:</strong> ${data.landing}<br>`;
    if (data.status) html += `<strong>Status:</strong> ${statusIcon} ${data.status}<br>`;
    if (data.site) html += `<strong>Landing Site:</strong> ${data.site}<br>`;
    if (data.coordinates) html += `<strong>Coordinates:</strong> ${data.coordinates}<br>`;
    if (data.mission) html += `<strong>Mission:</strong> ${data.mission}<br>`;
    if (data.duration) html += `<strong>Duration:</strong> ${data.duration}`;
    html += '</p>';

    if (data.description) {
        html += `<p style="margin-top: 0.5rem;">${data.description}</p>`;
    }

    if (data.link) {
        const linkText = data.link_text || 'More Info';
        html += `<p><strong>🔗 NASA Info:</strong> <a href="${data.link}" target="_blank" rel="noopener">${linkText}</a></p>`;
    }

    html += '</div></div>';
    return html;
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Render gallery block
function renderGalleryBlock(content) {
    // Extract all image and description pairs from bullet list format
    // Format: * imagePath: description
    const images = [];
    const descriptions = [];

    const lines = content.trim().split('\n');
    lines.forEach((line, index) => {
        line = line.trim();

        // Skip empty lines
        if (!line) return;

        // Remove leading bullet (* or -)
        if (line.startsWith('*') || line.startsWith('-')) {
            line = line.substring(1).trim();
        }

        // Split on first colon to get imagePath: description
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const imagePath = line.substring(0, colonIndex).trim();
            const description = line.substring(colonIndex + 1).trim();

            if (!imagePath) {
                console.warn(`Gallery: Line ${index + 1} has no image path`);
                return;
            }

            if (!description) {
                console.warn(`Gallery: Image "${imagePath}" is missing a description`);
                descriptions.push('Image description not provided');
            } else {
                descriptions.push(description);
            }

            images.push(imagePath);
        }
    });

    // Handle edge case: no images
    if (images.length === 0) {
        return `<div style="background: #fff3cd; border: 2px solid #ff6b35; border-radius: 8px; padding: 1.5rem; margin: 2rem 0; color: #856404;">
            <strong>⚠️ Gallery Error:</strong> No images found. Please add at least one image using the format: <code>* path/to/image.jpg: Your description</code>
        </div>`;
    }

    // Generate unique gallery ID
    const galleryId = 'gallery-' + Math.random().toString(36).substr(2, 9);

    // Determine if single image (for button disabling)
    const isSingleImage = images.length === 1;

    // Build HTML with CSS classes (encode JSON to safely store in attributes)
    const encodedImages = encodeURIComponent(JSON.stringify(images));
    const encodedDescriptions = encodeURIComponent(JSON.stringify(descriptions));

    let html = `<div class="mars-gallery" data-gallery-id="${galleryId}" data-current-index="0" data-images="${encodedImages}" data-descriptions="${encodedDescriptions}" data-auto-advance="true">`;

    // Image wrapper with overlaid controls
    html += `<div class="gallery-image-wrapper">`;
    // Escape description for HTML attribute
    const escapedAlt = escapeHtml(descriptions[0]);
    html += `<img class="gallery-current-image" src="${images[0]}" alt="${escapedAlt}" onerror="this.style.background='#ddd'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='🖼️<br>Image failed to load'; this.style.color='#666'; this.style.fontSize='14px'; this.style.textAlign='center'; this.style.padding='2rem';">`;

    // Navigation controls overlaid on image
    html += `<div class="gallery-controls">`;
    html += `<button class="gallery-prev" onclick="navigateGallery('${galleryId}', -1, true)" ${isSingleImage ? 'disabled' : ''} aria-label="Previous image">‹</button>`;
    html += `<button class="gallery-next" onclick="navigateGallery('${galleryId}', 1, true)" ${isSingleImage ? 'disabled' : ''} aria-label="Next image">›</button>`;
    html += `</div>`;

    html += `</div>`;

    // Description below image
    html += `<div class="gallery-description">${escapeHtml(descriptions[0])}</div>`;

    html += `</div>`;

    return html;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    updateFooterTime();
    setupMobileMenu();

    // Handle initial page load from URL hash
    const hash = window.location.hash.slice(1); // Remove '#'
    if (hash && hash !== 'home') {
        loadPageBySlug(hash);
    } else {
        // Load home page by default
        loadHome();
    }
});

// Mobile menu functionality
function setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !sidebar || !overlay) {
        console.error('Mobile menu elements not found');
        return;
    }

    console.log('Mobile menu initialized');

    // Function to close menu
    const closeMenu = () => {
        console.log('Closing menu');
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Function to open menu
    const openMenu = () => {
        console.log('Opening menu');
        sidebar.classList.add('active');
        menuToggle.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Function to toggle menu
    const toggleMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Menu toggle clicked/touched');

        if (sidebar.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    // Use touchend instead of click for better iOS support
    menuToggle.addEventListener('touchend', toggleMenu, { passive: false });

    // Also add click for non-touch devices
    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking overlay
    overlay.addEventListener('touchend', (e) => {
        e.preventDefault();
        closeMenu();
    }, { passive: false });

    overlay.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Update footer with current time
function updateFooterTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    document.getElementById('generation-time').textContent = now.toLocaleString('en-US', options);
    document.getElementById('current-year').textContent = now.getFullYear();
}

// Parse YAML-like frontmatter
function parseFrontmatter(content) {
    // Trim any leading/trailing whitespace
    content = content.trim();

    // Check if content starts with frontmatter (---)
    if (!content.startsWith('---')) {
        // No frontmatter, return content as-is
        return { metadata: {}, content: content };
    }

    const parts = content.split('---');
    if (parts.length < 3) {
        return { metadata: {}, content: content };
    }

    const frontmatter = parts[1].trim();
    const markdownContent = parts.slice(2).join('---').trim();

    // Simple YAML parser for our basic needs
    const metadata = {};
    frontmatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            metadata[key] = value;
        }
    });

    return { metadata, content: markdownContent };
}

// Load home page
async function loadHome(event) {
    if (event) event.preventDefault();

    await loadPageBySlug('home');
}

// Load a markdown page
async function loadPage(event, slug) {
    if (event) event.preventDefault();

    await loadPageBySlug(slug);
}

async function loadPageBySlug(slug) {
    const contentDiv = document.getElementById('page-content');

    // Clean up any existing gallery timers before loading new page
    galleryTimers.forEach((timer, galleryId) => {
        clearInterval(timer);
    });
    galleryTimers.clear();

    // Show loading state
    contentDiv.innerHTML = '<p>Loading...</p>';

    try {
        // Use relative path from index.html location
        const response = await fetch(`./content/pages/${slug}.md`);
        if (!response.ok) {
            throw new Error(`Page not found: ${slug}`);
        }

        const rawContent = await response.text();
        const { metadata, content } = parseFrontmatter(rawContent);

        // Render markdown to HTML
        const html = marked.parse(content);

        // Update page title if metadata has title
        if (metadata.Title) {
            document.title = `${metadata.Title} - Mars Launchpad`;
        }

        // Update content
        contentDiv.innerHTML = html;

        // Initialize galleries after content is loaded
        initializeGalleries();

        // Initialize lightbox for all images
        initializeLightbox();

        // Update active nav link
        setActiveNavLink(slug);

        // Update URL hash
        window.location.hash = slug;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        contentDiv.innerHTML = `
            <h1>Page Not Found</h1>
            <p>Sorry, the page "${slug}" could not be loaded.</p>
            <p>Error: ${error.message}</p>
        `;
    }
}

// Update active navigation link
function setActiveNavLink(slug) {
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to current link
    const activeLink = document.querySelector(`.nav-link[href="#${slug}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Handle browser back/forward buttons
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash && hash !== 'home') {
        loadPageBySlug(hash);
    } else {
        loadHome();
    }
});

// Image Lightbox functionality
function initializeLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.image-lightbox-close');

    if (!lightbox || !lightboxImg) {
        console.warn('Lightbox elements not found');
        return;
    }

    // Find all images in the content area (excluding navigation/header images)
    const contentImages = document.querySelectorAll('#page-content img');

    contentImages.forEach(img => {
        // Make image clickable
        img.style.cursor = 'pointer';

        // Add click handler
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling to lightbox
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Full size image';
            lightbox.classList.add('active');
        });
    });

    // Close lightbox when clicking on the background
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Close lightbox when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            lightbox.classList.remove('active');
        });
    }

    // Close lightbox when clicking on the image itself
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
        lightbox.classList.remove('active');
    });

    // Close lightbox on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
}

// Gallery navigation functions
// Store auto-advance timers for each gallery
const galleryTimers = new Map();

function initializeGalleries() {
    const galleries = document.querySelectorAll('.mars-gallery');
    galleries.forEach(gallery => {
        // Initial state is already set in data attributes by renderGalleryBlock
        const images = JSON.parse(decodeURIComponent(gallery.dataset.images || '[]'));
        if (images.length === 0) {
            console.warn('Gallery found with no images');
            return;
        }

        // Start auto-advance if enabled and more than 1 image
        if (images.length > 1 && gallery.dataset.autoAdvance === 'true') {
            startAutoAdvance(gallery);
        }
    });
}

function startAutoAdvance(gallery) {
    const galleryId = gallery.dataset.galleryId;

    // Clear existing timer if any
    if (galleryTimers.has(galleryId)) {
        clearInterval(galleryTimers.get(galleryId));
    }

    // Set up new timer for 30 seconds
    const timer = setInterval(() => {
        // Only advance if auto-advance is still enabled
        if (gallery.dataset.autoAdvance === 'true') {
            navigateGallery(galleryId, 1, false);
        }
    }, 30000); // 30 seconds

    galleryTimers.set(galleryId, timer);
}

function stopAutoAdvance(gallery) {
    const galleryId = gallery.dataset.galleryId;

    // Mark as disabled
    gallery.dataset.autoAdvance = 'false';

    // Clear timer
    if (galleryTimers.has(galleryId)) {
        clearInterval(galleryTimers.get(galleryId));
        galleryTimers.delete(galleryId);
    }
}

function navigateGallery(galleryId, direction, userInitiated = false) {
    // Find the gallery element
    const gallery = document.querySelector(`[data-gallery-id="${galleryId}"]`);
    if (!gallery) {
        console.error(`Gallery not found: ${galleryId}`);
        return;
    }

    // If user clicked, stop auto-advance
    if (userInitiated) {
        stopAutoAdvance(gallery);
    }

    // Get gallery data (decode from URL encoding)
    const images = JSON.parse(decodeURIComponent(gallery.dataset.images));
    const descriptions = JSON.parse(decodeURIComponent(gallery.dataset.descriptions));
    const currentIndex = parseInt(gallery.dataset.currentIndex);
    const totalImages = images.length;

    // Calculate new index with wraparound
    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
        newIndex = totalImages - 1; // Wrap to last image
    } else if (newIndex >= totalImages) {
        newIndex = 0; // Wrap to first image
    }

    // Update display
    updateGalleryDisplay(gallery, newIndex, images, descriptions);
}

function updateGalleryDisplay(gallery, newIndex, images, descriptions) {
    // Update current index in data attribute
    gallery.dataset.currentIndex = newIndex;

    // Update image
    const imgElement = gallery.querySelector('.gallery-current-image');
    if (imgElement) {
        imgElement.src = images[newIndex];
        imgElement.alt = descriptions[newIndex];
    }

    // Update description (use textContent to safely display text)
    const descElement = gallery.querySelector('.gallery-description');
    if (descElement) {
        descElement.textContent = descriptions[newIndex];
    }
}
