# Content Styles Guide

This document describes custom markdown extensions for creating styled content blocks in the Mars Launchpad site.

## Overview

Instead of writing HTML directly in markdown files, you can use special code block syntax to create styled content. The JavaScript will automatically convert these blocks into properly styled HTML.

## Available Styles

### 1. Stats Card

Create statistics display cards (like the Quick Mars Facts).

**Syntax:**
````markdown
```stats
title: Quick Mars Facts
stat1_value: 225M km
stat1_label: Distance to Mars
stat2_value: 687 days
stat2_label: Mars Year
stat3_value: -63°C
stat3_label: Avg Temperature
stat4_value: 38%
stat4_label: of Earth's Gravity
```
````

**Output:** A responsive grid of stat cards with gradient backgrounds.

---

### 2. Movie Card

Create a movie information card with poster, details, and description.

**Syntax:**
````markdown
```movie
title: The Martian
year: 2015
director: Ridley Scott
starring: Matt Damon, Jessica Chastain, Kristen Wiig
rating: 8.0
imdb: https://www.imdb.com/title/tt3659388/
poster: https://image.tmdb.org/t/p/w300/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg
description: Based on Andy Weir's novel, this film showcases realistic Mars survival using actual science and technology. NASA consulted extensively on the production, making it one of the most scientifically accurate space films ever made.
```
````

**Output:** A flexbox card with movie poster on left, title and metadata in the center.

---

### 3. Book Card

Create a book information card with cover, bibliographic details, and description.

**Syntax:**
````markdown
```book
title: The Martian
author: Andy Weir
year: February 2014
isbn: 978-0-553-41802-6
asin: B00EMXBDMA
cover: https://images-na.ssl-images-amazon.com/images/P/B00EMXBDMA.01._SCLZZZZZZZ_SX500_.jpg
description: The survival thriller that became a cultural phenomenon. Botanist Mark Watney's fight for survival on Mars using real science and engineering has inspired a generation of Mars enthusiasts.
```
````

**Output:** A flexbox card with book cover on left, title and metadata in the center.

**Note:** The `amazon` field is optional. If you provide an `asin`, the Amazon link will be automatically generated as `https://www.amazon.com/dp/{asin}`. You can still override this by providing a custom `amazon` URL if needed.

---

### 4. Rover/Mission Card

Create information cards for Mars rovers or missions.

**Syntax:**
````markdown
```rover
name: Perseverance (Mars 2020)
type: rover
landing: February 18, 2021
status: ✅ Active
site: Jezero Crater
coordinates: 18.4447°N, 77.4508°E
mission: NASA Mars 2020
duration: 1000+ sols (Martian days) and counting
image: https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/PIA23764-MarsPerseveranceRover-ArtistConcept-20200305.jpg/640px-PIA23764-MarsPerseveranceRover-ArtistConcept-20200305.jpg
link: https://mars.nasa.gov/mars2020/
link_text: Mars 2020 Mission
description: The most advanced Mars rover ever built, equipped with a helicopter companion (Ingenuity) and designed to search for signs of ancient microbial life while collecting samples for future return to Earth.
```
````

**Output:** A card with an image (or auto-generated icon fallback), mission details, and description.

**Icon Auto-Generation:**
- The `icon` field is optional and automatically generated based on `type` and `status`:
  - **Type-based icons:**
    - `rover` → 🤖 (robot)
    - `helicopter` or `aircraft` → 🚁 (helicopter)
    - `mission` or `campaign` → 🚀 (rocket)
  - **Status-based overrides:**
    - Active (✅) → Uses type icon
    - Inactive (❌) → 🔴 (red circle)
    - Hibernating (⚠️) → 💤 (sleep)
    - Future (⏳) → ⏳ (hourglass)
- You can still manually override with `icon: 🔥` if needed

**Note:** The `image` field is optional. If provided, it will display the image; if the image fails to load, it will fall back to showing the auto-generated icon on a gradient background.

---

## Implementation Notes

### How It Works

1. The markdown parser detects code blocks with special language identifiers (`stats`, `movie`, `book`, `rover`)
2. JavaScript parses the key-value pairs inside the code block
3. Generates appropriate HTML with inline styles matching the site's design
4. Renders the styled content in place of the code block

### Key-Value Format

- Each line should be: `key: value`
- Keys are case-insensitive
- Multi-word keys use underscores (e.g., `stat1_value`)
- Values can contain spaces and special characters
- Empty lines are ignored

### Fallback Behavior

If an image fails to load (cover, poster, etc.), a styled placeholder with an emoji is displayed instead.

### Color Scheme

All cards use the site's standard color palette:
- Primary red: `#cc2936`
- Gradients: `#f8f9fa` to `#e9ecef`
- Text: `#666` for labels, `#1a1a2e` for headings

### Responsive Design

All cards are responsive and will adapt to mobile screens:
- Flexbox layouts stack vertically on narrow screens
- Grid layouts use `auto-fit` to adjust columns
- Font sizes scale appropriately

## Future Extensions

Potential additional styles to implement:
- `timeline` - Event timeline visualization
- `comparison` - Side-by-side comparison tables
- `gallery` - Image gallery grid
- `quote` - Stylized quote blocks
- `callout` - Highlighted information boxes

## Migration Guide

To convert existing HTML cards to the new format:

1. Find the HTML card in your markdown file
2. Extract the data (title, author, description, etc.)
3. Replace with the appropriate code block syntax
4. Test by reloading the page

**Example Migration:**

Before (HTML):
```html
<div style="display: flex; ...">
    <img src="..." alt="Book Cover" style="...">
    <div>
        <h4>The Martian</h4>
        <p><strong>Author:</strong> Andy Weir<br>
        ...
    </div>
</div>
```

After (Simple Syntax):
````markdown
```book
title: The Martian
author: Andy Weir
year: February 2014
...
```
````

Much cleaner and easier to maintain!
