"""
Configuration is set up based on the environment command line argument
"""
import os
os.environ.setdefault("ENVIRONMENT", "dev")

from .base import *

if ENVIRONMENT == DEVELOPMENT_ENVIRONMENT:
    from .dev import *
if ENVIRONMENT == STAGING_ENVIRONMENT:
    from .staging import *
elif ENVIRONMENT == PRODUCTION_ENVIRONMENT:
    from .prod import *
