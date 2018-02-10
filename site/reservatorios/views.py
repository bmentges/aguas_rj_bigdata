from __future__ import unicode_literals

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers import ReservatorioSerializer, MedicaoSerializer
from .models import Reservatorio, Medicao


class ReservatorioViewSet(viewsets.ModelViewSet):
    """
    rest_framework ViewSet pro Reservatorio
    """
    queryset = Reservatorio.objects.all()
    serializer_class = ReservatorioSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_fields = ('nome', 'codigo_ana')


class MedicaoViewSet(viewsets.ModelViewSet):
    """
    rest_framework ViewSet pro Reservatorio
    """
    queryset = Medicao.objects.all()
    serializer_class = MedicaoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_fields = ('data_da_medicao',)
