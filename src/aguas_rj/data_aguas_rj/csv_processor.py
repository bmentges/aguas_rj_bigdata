from __future__ import unicode_literals

import csv

import pandas

from aguas_rj.config import SCHEMA_OUTPUT_FILE, DATA_OUTPUT_FILE


def run():
    with open(SCHEMA_OUTPUT_FILE) as f:
        reader = csv.reader(f)
        for row in reader:
            schema = row

    dataframes = pandas.read_csv(DATA_OUTPUT_FILE, header=None, names=schema)
    print(dataframes)


if __name__ == '__main__':
    run()