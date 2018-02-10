from __future__ import unicode_literals

import os

from mrjob.job import MRJob


class GenerateMetricsMapReduce(MRJob):
    """
    Este é um MapReduce para extrair estatísticas dos reservatorios
    """
    def mapper(self, _, line):
        (id, )

    def reducer(self, repositorio, values):
        pass


if __name__ == '__main__':
    GenerateMetricsMapReduce.run()
