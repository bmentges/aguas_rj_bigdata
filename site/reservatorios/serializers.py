from __future__ import unicode_literals

from rest_framework import serializers

from .models import Reservatorio, Medicao


class ReservatorioSerializer(serializers.ModelSerializer):
    """
    rest_framework serializer pro Reservatorio
    """
    class Meta:
        model = Reservatorio
        fields = ('id', 'codigo_ana', 'nome', 'estado')


class MedicaoSerializer(serializers.ModelSerializer):
    """
    rest_framework serializer pro Reservatorio
    """

    class Meta:
        model = Medicao
        fields = ('reservatorio',
                  'cota',
                  'afluencia',
                  'defluencia',
                  'vazao_vertida',
                  'vazao_turbinada',
                  'vazao_natural',
                  'volume_util',
                  'vazao_incremental',
                  'data_da_medicao')
