import os

ENVIRONMENT = os.environ.get('ENVIRONMENT')
if not ENVIRONMENT:
    raise RuntimeError('Unable to figure out ENVIRONMENT')

DEVELOPMENT_ENVIRONMENT = 'dev'
STAGING_ENVIRONMENT = 'staging'
PRODUCTION_ENVIRONMENT = 'prod'

current_dir = os.path.dirname(os.path.abspath(__file__))

AGUAS_RJ_DATA_INPUT_FOLDER = '{}/../../../data/aguas-reservatorios-rj'.format(current_dir)
AGUAS_RJ_DATA_OUTPUT_FOLDER = '{}/../../../data/aguas-reservatorios-rj/output'.format(current_dir)

SCHEMA_OUTPUT_FILE = '{}/schema.csv'.format(AGUAS_RJ_DATA_OUTPUT_FOLDER)
DATA_OUTPUT_FILE = '{}/all_data.csv'.format(AGUAS_RJ_DATA_OUTPUT_FOLDER)