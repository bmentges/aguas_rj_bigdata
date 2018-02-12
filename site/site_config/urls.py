from __future__ import unicode_literals

from django.conf.urls import include, url
from django.urls import path
from django.contrib import admin
from rest_framework import routers

from home import views as home_views
from reservatorios.views import ReservatorioViewSet, MedicaoViewSet

admin.autodiscover()

# rest_framework configuration, enabling endpoints
router = routers.DefaultRouter()
router.register(r'reservatorios', ReservatorioViewSet)
router.register(r'medicoes', MedicaoViewSet)

urlpatterns = [
    url(r'^$', home_views.index, name='index'),
    path('admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),  # rest_framework starting endpoint
    url(r'^api/v1/api-auth/', include('rest_framework.urls')),
]
