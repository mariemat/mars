import datetime
from pelican import signals

def add_generation_time(generator):
    """Add current datetime to the template context"""
    generator.context['GENERATION_TIME'] = datetime.datetime.now().strftime('%B %d, %Y at %I:%M %p')

def register():
    signals.generator_init.connect(add_generation_time)