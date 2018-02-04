from django.conf.urls import include, url
from django.urls import path

from django.contrib import admin
admin.autodiscover()

from home import views as home_views

urlpatterns = [
    url(r'^$', home_views.index, name='index'),
    path('admin/', admin.site.urls),
]
