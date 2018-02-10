from __future__ import unicode_literals

from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    """
    Comando para subir a lista de reservatorios pro banco de dados
    """
    help = 'Carrega os repositórios iniciais do projeto no banco de dados'

    def add_arguments(self, parser):
        parser.add_argument('poll_id', nargs='+', type=int)

    def handle(self, *args, **options):
        #TODO
        pass