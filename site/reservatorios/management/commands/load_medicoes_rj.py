from __future__ import unicode_literals

import csv
from decimal import Decimal
from dateutil.parser import parse

from django.core.management.base import BaseCommand
from django.conf import settings

from reservatorios.models import Medicao, Reservatorio

RESERVATORIOS = dict()


class Command(BaseCommand):
    help = 'Carrega os reservatórios iniciais do projeto (RJ) no banco de dados'

    ALL_DATA_FILE_PATH = '{}/../data/aguas-reservatorios-rj/output/all_data.csv'.format(settings.BASE_DIR)

    def handle(self, *args, **options):
        self.stdout.write("Iniciando job para adicionar as medicoes no banco")
        self.stdout.write("\tArquivo:{}".format(self.ALL_DATA_FILE_PATH))

        self._pull_in_reservatorios()
        with open(self.ALL_DATA_FILE_PATH) as f:
            reader = csv.reader(f)

            line_count = 0
            for line in reader:
                self._process_line(line)
                line_count += 1
                if line_count % 100 == 0:
                    self.stdout.write("\t{} linhas ja escritas".format(line_count))

            self.stdout.write("\t{} linhas escritas no total.".format(line_count))

    def _process_line(self, line):
        codigo_ana, nome, cota, afluencia, \
        defluencia, vazao_vertida, vazao_turbinada, \
        vazao_natural, vol_util, vazao_incremental, data_medicao = line

        reservatorio = self._get_reservatorio(codigo_ana)

        medicao = Medicao()
        medicao.reservatorio = reservatorio
        medicao.cota = Decimal(cota) if cota else None
        medicao.afluencia = Decimal(afluencia) if afluencia else None
        medicao.defluencia = Decimal(defluencia) if defluencia else None
        medicao.vazao_vertida = Decimal(vazao_vertida) if vazao_vertida else None
        medicao.vazao_turbinada = Decimal(vazao_turbinada) if vazao_turbinada else None
        medicao.vazao_natural = Decimal(vazao_natural) if vazao_natural else None
        medicao.volume_util = Decimal(vol_util) if vol_util else None
        medicao.vazao_incremental = Decimal(vazao_incremental) if vazao_incremental else None
        medicao.data_da_medicao = parse(data_medicao)
        medicao.save()

    def _pull_in_reservatorios(self):
        reservatorios = Reservatorio.objects.all()
        for r in reservatorios:
            RESERVATORIOS[int(r.codigo_ana)] = r

    def _get_reservatorio(self, codigo_ana):
        return RESERVATORIOS.get(int(codigo_ana))
