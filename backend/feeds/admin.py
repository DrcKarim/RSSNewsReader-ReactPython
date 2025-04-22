from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Feed, FeedItem

admin.site.register(Feed)
admin.site.register(FeedItem)