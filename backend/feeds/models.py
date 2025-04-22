from django.db import models

# Create your models here.
class Feed(models.Model):
    url = models.URLField(unique=True)
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    last_fetched = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title


class FeedItem(models.Model):
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE, related_name='items')
    title = models.CharField(max_length=255)
    link = models.URLField()
    description = models.TextField(blank=True)
    published_date = models.DateTimeField()
    guid = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.title