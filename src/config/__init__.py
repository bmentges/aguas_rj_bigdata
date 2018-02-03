"""
Configuration is set up based on the environment command line argument
"""
from .base import *

if ENVIRONMENT == DEVELOPMENT_ENVIRONMENT:
    from .development import *
if ENVIRONMENT == STAGING_ENVIRONMENT:
    from .staging import *
elif ENVIRONMENT == PRODUCTION_ENVIRONMENT:
    from .production import *
