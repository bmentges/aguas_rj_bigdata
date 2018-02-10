from __future__ import unicode_literals

from decimal import *

from django.db import models
from django.utils import timezone


class Repositorio(models.Model):
    '''
    Classe que representa um repositório de agua
    '''
    nome = models.CharField(max_length=200)
    estado = models.CharField(max_length=2, default='RJ')
    codigo_ana = models.IntegerField(default=0)

    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        verbose_name = 'repositório'
        verbose_name_plural = 'repositórios'
        indexes = [
            models.Index(fields=['codigo_ana']),
            ]

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        return super(Repositorio, self).save(*args, **kwargs)


class Medicao(models.Model):
    '''
    Classe que representa uma medição de um repositório. É esperado milhões de registros aqui.
    '''
    repositorio = models.ForeignKey(Repositorio, on_delete=models.CASCADE)
    cota = models.DecimalField('Cota (m)', max_digits=10, decimal_places=2, default=Decimal(0.0))
    afluencia = models.DecimalField('Afluência (m³/s)', max_digits=10, decimal_places=2, default=Decimal(0.0))
    defluencia = models.DecimalField('Defluência (m³/s)', max_digits=10, decimal_places=2, default=Decimal(0.0))
    vazao_vertida = models.DecimalField('Vazão Vertida (m³/s)', max_digits=10, decimal_places=2, default=Decimal(0.0))
    vazao_turbinada = models.DecimalField('Vazão Turbinada (m³/s)', max_digits=10, decimal_places=2,
                                          default=Decimal(0.0))
    vazao_natural = models.DecimalField('Vazão Natural (m³/s)', max_digits=10, decimal_places=2, default=Decimal(0.0))
    volume_util = models.DecimalField('Volume Útil (%)', max_digits=7, decimal_places=2, default=Decimal(0.0))
    vazao_incremental = models.DecimalField('Vazão Incremental (m³/s)', max_digits=10, decimal_places=2, default=Decimal(0.0))
    data_da_medicao = models.DateField('Data da medição')

    class Meta:
        verbose_name = 'medição'
        verbose_name_plural = 'medições'
        indexes = [
            models.Index(fields=['data_da_medicao']),
            ]