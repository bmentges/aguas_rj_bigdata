from __future__ import unicode_literals

from django.core.management.base import BaseCommand
from django.conf import settings
from reservatorios.models import Reservatorio


class Command(BaseCommand):
    help = 'Carrega os reservatórios iniciais do projeto (RJ) no banco de dados'

    def handle(self, *args, **options):
        if Reservatorio.objects.all():
            self.stdout.write("Ja existem reservatorios carregados no banco de dados")
            return
        else:
            created = 0
            for (_, nome, codigo_ana) in settings.RESERVATORIOS_RJ:
                repo = Reservatorio()
                repo.codigo_ana = codigo_ana
                repo.estado = 'RJ'
                repo.nome = nome
                repo.save()
                created += 1
            self.stdout.write("Criados {} reservatorios no banco de dados".format(created))
