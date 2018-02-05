from __future__ import unicode_literals

import os
import re
import errno
import shutil
import logging
import datetime
from time import sleep
from tempfile import TemporaryDirectory
from urllib.parse import quote_plus as querystring_parser

from unidecode import unidecode
from selenium import webdriver

from reservatorios import RESERVATORIOS

logger = logging.getLogger(__name__)


class ANACrawler():

    BASE_URL = 'http://sar.ana.gov.br/MedicaoSin?dropDownListEstados=20&dropDownListReservatorios={}&dataInicial={}&dataFinal={}&button=Buscar'
    BASE_FILE_NAME = 'Histórico_{}.xls'
    DATA_OUTPUT_FOLDER_BASE = '{}/../../aguas-reservatorios-rj/input'.format(os.path.dirname(os.path.realpath(__file__)))

    def __init__(self, data_inicio, data_fim):
        self.tmp_dir = TemporaryDirectory()
        self.data_inicio = data_inicio
        self.data_fim = data_fim
        self._setup_folders()
        self.downloaded = []
        print(self.DATA_OUTPUT_FOLDER_BASE)

    def run(self):
        for reservatorio, nome in RESERVATORIOS:
            try:
                self.download_file(reservatorio, nome)
            except RuntimeError as e:
                print('error downloading {}, try again later'.format(reservatorio))
                print('continuing with the next one...')

        self.post_process()

    def _setup_folders(self):
        prefs = {
            'profile.default_content_settings.popups': 0,
            'download.default_directory': self.tmp_dir.name
        }
        self.chrome_options = webdriver.ChromeOptions()
        self.chrome_options.add_experimental_option('prefs', prefs)
        self.output_folder = '{}/{}-TO-{}'.format(self.DATA_OUTPUT_FOLDER_BASE, self.data_inicio, self.data_fim)
        self.ensure_directory_exists(self.output_folder)

    def ensure_directory_exists(self, directory):
        try:
            os.makedirs(directory)
        except OSError as e:
            if e.errno != errno.EEXIST:
                raise

    def download_file(self, reservatorio_id, reservatorio_nome):
        arquivo_full_path = '{}/{}'.format(self.tmp_dir.name, self.BASE_FILE_NAME.format(reservatorio_nome))
        nome_tratado = unidecode(re.sub('\s+', '_', reservatorio_nome.strip())).lower()
        output_file_name = '{}_{}_crawler_data.html'.format(reservatorio_id, nome_tratado)
        output_file = '{}/{}'.format(self.output_folder, output_file_name)

        if self._file_does_not_exist(output_file):
            print('downloading: {} - {}'.format(reservatorio_id, reservatorio_nome))

            url = self.BASE_URL.format(reservatorio_id,
                                       self._convert_date_to_querystring(self.data_inicio),
                                       self._convert_date_to_querystring(self.data_fim))

            print(url)

            driver = webdriver.Chrome(chrome_options=self.chrome_options)
            driver.get(url)
            button_xpath = '//*[@id="form-result"]/section/header/div/div/button'
            download_xpath = '/html/body/section/section/section/section/section/section/section/section/div/div[2]/div/div[2]/div/form/section/header/div/div/ul/li/a'

            button_dropdown = driver.find_element_by_xpath(button_xpath)
            button_dropdown.click()

            element = driver.find_element_by_xpath(download_xpath)
            element.click()

            finished = False

            while not finished:
                if os.path.isfile(arquivo_full_path):
                    driver.close()
                    finished = True
                    print('download completed: {}'.format(arquivo_full_path))
                else:
                    print('waiting download...')
                    sleep(1)

            self.downloaded.append(output_file)
            shutil.move(arquivo_full_path, output_file)
        else:
            print('ignoring {} - {}, already downloaded.'.format(reservatorio_id, reservatorio_nome))

    def post_process(self):
        self.tmp_dir.cleanup()

    def _convert_date_to_querystring(self, date):
        return querystring_parser(date)

    def _file_does_not_exist(self, output_file):
        return not os.path.isfile(output_file)


if __name__ == '__main__':
    today = datetime.date.today()
    DATE_RANGES = (
        ('01-01-2010', today.strftime('%d-%m-%Y')),
        ('01-01-2000', '31-12-2009'),
        ('01-01-1993', '31-12-1999')
    )
    for data_inicio, data_fim in DATE_RANGES:
        print("processando inicio={} e fim={}".format(data_inicio, data_fim))
        ANACrawler(data_inicio, data_fim).run()

    print("fim.")

