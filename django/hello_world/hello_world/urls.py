from django.conf.urls import patterns, include, url
from hello_world.views import hello, current_datetime

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
		('^hello/$', hello),
		('^time/$', current_datetime),
)
