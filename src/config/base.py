import os

ENVIRONMENT = os.environ.get('ENVIRONMENT')
if not ENVIRONMENT:
    raise RuntimeError('Unable to figure out ENVIRONMENT')

DEVELOPMENT_ENVIRONMENT = 'dev'
STAGING_ENVIRONMENT = 'staging'
PRODUCTION_ENVIRONMENT = 'prod'

