from __future__ import unicode_literals

import csv

import pandas

from aguas_rj.config import AGUAS_RJ_DATA_OUTPUT_FOLDER

SCHEMA_FILE = '{}/schema.csv'.format(AGUAS_RJ_DATA_OUTPUT_FOLDER)
DATA_FILE = '{}/all_data.csv'.format(AGUAS_RJ_DATA_OUTPUT_FOLDER)


def run():
    with open(SCHEMA_FILE) as f:
        reader = csv.reader(f)
        for row in reader:
            schema = row

    dataframes = pandas.read_csv(DATA_FILE, header=None, names=schema)
    print(dataframes)


if __name__ == '__main__':
    run()