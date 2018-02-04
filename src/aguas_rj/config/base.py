import os

ENVIRONMENT = os.environ.get('ENVIRONMENT')
if not ENVIRONMENT:
    raise RuntimeError('Unable to figure out ENVIRONMENT')

DEVELOPMENT_ENVIRONMENT = 'dev'
STAGING_ENVIRONMENT = 'staging'
PRODUCTION_ENVIRONMENT = 'prod'

AGUAS_DATA_INPUT_FOLDER = '/Users/bruno.carvalho/projects/personal/data-aguas-rj/data/aguas-reservatorios-rj'

