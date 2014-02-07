from django.conf.urls import patterns, url

from foodsharing_webui.list import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
)
