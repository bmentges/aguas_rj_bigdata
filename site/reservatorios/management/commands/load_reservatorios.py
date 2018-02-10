from __future__ import unicode_literals

from django.core.management.base import BaseCommand
from django.conf import settings
from repositorios.models import Repositorio


class Command(BaseCommand):
    help = 'Carrega os repositórios iniciais do projeto no banco de dados'

    def handle(self, *args, **options):
        if Repositorio.objects.all():
            self.stdout.write("Ja existem repositorios carregados no banco de dados")
            return
        else:
            created = 0
            for (_, nome, codigo_ana) in settings.RESERVATORIOS_RJ:
                repo = Repositorio()
                repo.codigo_ana = codigo_ana
                repo.estado = 'RJ'
                repo.nome = nome
                repo.save()
                created += 1
            self.stdout.write("Criados {} repositorios no banco de dados".format(created))
