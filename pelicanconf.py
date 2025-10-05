AUTHOR = 'Mars Explorer'
SITENAME = 'Mars Launchpad'
SITEURL = ''
RELATIVE_URLS = True

PATH = 'content'
TIMEZONE = 'America/Los_Angeles'
DEFAULT_DATE_FORMAT = '%B %d, %Y at %I:%M %p'

# Plugin settings
PLUGIN_PATHS = ['plugins']
PLUGINS = ['datetime_plugin']
DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    ('NASA Mars Exploration', 'https://mars.nasa.gov/'),
    ('SpaceX Mars Program', 'https://www.spacex.com/mars/'),
    ('Mars Society', 'https://www.marssociety.org/'),
)

# Social widget
SOCIAL = (
    ('GitHub', 'https://github.com/'),
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

# Theme and appearance
THEME = 'theme'
DIRECT_TEMPLATES = ['index', 'tags', 'categories', 'archives']

# Static files
STATIC_PATHS = ['images', 'extra']
EXTRA_PATH_METADATA = {
    'extra/favicon.ico': {'path': 'favicon.ico'},
}

# Copy static paths properly - remove problematic PATH_METADATA

# URL structure
ARTICLE_URL = '{category}/{slug}/'
ARTICLE_SAVE_AS = '{category}/{slug}/index.html'
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'

# Menu items
MENUITEMS = (
    ('🚀 Mars Missions', '/mars-missions/'),
    ('🤖 Mars Rovers', '/mars-rovers/'),
    ('🛸 Transportation', '/transportation/'),
    ('🏗️ Space Colonies', '/space-colonies/'),
    ('💨 Life Support', '/life-support/'),
    ('⚡ Energy Systems', '/energy-systems/'),
    ('📡 Communication', '/communication/'),
    ('🏥 Health & Medicine', '/health-medicine/'),
    ('🧠 Psychology', '/psychology/'),
    ('🌱 Food Production', '/food-production/'),
    ('⛏️ Resource Mining', '/resource-mining/'),
    ('🏛️ Architecture', '/architecture/'),
    ('📅 Mission Timeline', '/mission-timeline/'),
    ('📚 Bibliography', '/bibliography/'),
    ('🎬 Movies', '/movies/'),
)

# Banner Configuration
BANNER_IMAGE = 'images/mars-rover-banner.jpg'  # Path to banner image
BANNER_TITLE = SITENAME  # Can be different from site name if desired
BANNER_SUBTITLE = 'Your comprehensive guide to Mars exploration, space colonization, and humanity\'s journey to the Red Planet'

# Plugin settings (disabled for now - can be enabled later)
# PLUGIN_PATHS = ['plugins']
# PLUGINS = ['sitemap']

# SEO (disabled for now - can be enabled later)
# SITEMAP = {
#     'format': 'xml',
#     'priorities': {
#         'articles': 0.8,
#         'indexes': 0.5,
#         'pages': 1.0,
#     },
#     'changefreqs': {
#         'articles': 'monthly',
#         'indexes': 'daily',
#         'pages': 'monthly',
#     }
# }