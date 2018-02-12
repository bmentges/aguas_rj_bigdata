from __future__ import unicode_literals

from datetime import date
from dateutil.relativedelta import *

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from .serializers import ReservatorioSerializer, MedicaoSerializer
from .models import Reservatorio, Medicao


class ReservatorioViewSet(viewsets.ModelViewSet):
    """
    <h1>API Reservatórios</h1>
    <p>Aqui você irá encontrar as informações dos reservatórios do Estado do Rio de Janeiro.</p>
    """
    queryset = Reservatorio.objects.all()
    serializer_class = ReservatorioSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @detail_route(methods=['get'])
    def medicoes(self, request, pk=None):
        """
        Este método serializa as medições do último ano de um reservatório.
        Url: <site>/api/v1/reservatorios/{id}/medicoes

        TODO: Aceitar período de início e fim.

        :param request:
        :param pk:
        :return:
        """
        today = date.today()
        last_year = today + relativedelta(months=-12)

        objetos = list(Medicao.objects.filter(reservatorio__pk=pk,
                                      data_da_medicao__range=(last_year, today)))

        serializer = MedicaoSerializer(objetos, many=True)

        return Response(serializer.data)


class MedicaoViewSet(viewsets.ModelViewSet):
    """
    <h1>API Medições</h1>
    <p>Aqui você irá encontrar as mediçoes diárias dos reservatórios do Estado do Rio de Janeiro.</p>
    """
    queryset = Medicao.objects.all()
    serializer_class = MedicaoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
