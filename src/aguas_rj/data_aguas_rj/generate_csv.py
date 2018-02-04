from __future__ import unicode_literals

import os
import errno
import glob
import logging
import csv
import gzip
import shutil
from functools import reduce

from bs4 import BeautifulSoup

from aguas_rj.config import AGUAS_DATA_INPUT_FOLDER

logger = logging.getLogger(__name__)


def run():
    output_directory = '{}/output/'.format(AGUAS_DATA_INPUT_FOLDER)
    ensure_directory_exists(output_directory)
    files_to_process = glob.glob('{}/*.html'.format(AGUAS_DATA_INPUT_FOLDER))
    files_to_process.sort()
    print('There are {} files to process. Starting...'.format(str(len(files_to_process))))

    write_schema(files_to_process[0])
    write_data(output_directory, files_to_process)

    print("The end. Success.")


def write_data(output_directory, files_to_process):
    output_file = '{}all_data.csv'.format(output_directory)
    output_gz_file = '{}all_data.csv.gz'.format(output_directory)

    with open(output_file, 'w') as f:
        lines_written = list(map(lambda file: process(file, f), files_to_process))
        total = reduce(lambda x, y: x + y, lines_written)
        print('Total lines written: {}'.format(str(total)))
    print('Generated file: {}'.format(output_file))

    with open(output_file, 'rb') as f:
        with gzip.GzipFile(output_gz_file, mode='wb') as f_gz:
            shutil.copyfileobj(f, f_gz)
    print('Generated file: {}'.format(output_gz_file))


def process(file_name, file_to_append_data):

    print('processing file {}'.format(file_name.split("/")[-1]))

    with open(file_name) as f:
        contents = f.read()
        lines_read = process_html(contents, file_to_append_data)

    return lines_read


def write_schema(from_file):

    with open(from_file) as f:
        schema_html_raw = f.read()
        soup = BeautifulSoup(schema_html_raw, "html.parser")
        table = soup.select_one('table')
        schema = [th.text for th in table.select('tr th')]

    schema_file_name = '{}/output/schema.csv'.format(AGUAS_DATA_INPUT_FOLDER)
    schema_gz_file_name = '{}/output/schema.csv.gz'.format(AGUAS_DATA_INPUT_FOLDER)

    with open(schema_file_name, 'w') as f:
        writer = csv.writer(f)
        writer.writerow(schema)
    print('Generated file: {}'.format(schema_file_name))

    with open(schema_file_name, 'rb') as f:
        with gzip.GzipFile(schema_gz_file_name, mode='wb') as f_gz:
            shutil.copyfileobj(f, f_gz)
    print('Generated file: {}'.format(schema_gz_file_name))


def process_html(html_raw, file_to_append_data):
    soup = BeautifulSoup(html_raw, "html.parser")
    table = soup.select_one('table')

    data = [[line_formatter(td.text) for td in row.find_all("td")] for row in table.select("tr + tr")]

    lines = len(data)

    csv_writer = csv.writer(file_to_append_data)
    csv_writer.writerows(data)

    return lines


def line_formatter(line):
    return line.replace(',', '.').strip()


def ensure_directory_exists(directory):
    try:
        os.makedirs(directory)
    except OSError as e:
        if e.errno != errno.EEXIST:
            raise


if __name__ == '__main__':
    run()
