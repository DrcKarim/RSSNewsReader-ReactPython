from rest_framework import serializers
from .models import Feed, FeedItem

class FeedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedItem
        fields = '__all__'

class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = ['id', 'url', 'title', 'description', 'last_fetched']  # Only require URL when creating