from rest_framework import viewsets
from .models import Feed, FeedItem
from .serializers import FeedSerializer, FeedItemSerializer
from .utils import fetch_and_store_feed
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

"""
class FeedViewSet(viewsets.ModelViewSet):
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer

    def perform_create(self, serializer):
        feed = serializer.save()
        fetch_and_store_feed(feed)
"""

class FeedItemViewSet(viewsets.ModelViewSet):
    queryset = FeedItem.objects.all() 
    serializer_class = FeedItemSerializer

    def get_queryset(self):
        queryset = FeedItem.objects.all()
        feed_id = self.request.query_params.get('feed')
        if feed_id is not None:
            queryset = queryset.filter(feed_id=feed_id)
        return queryset
    
    serializer_class = FeedItemSerializer


class FeedViewSet(viewsets.ModelViewSet):
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer

    def perform_create(self, serializer):
        feed = serializer.save()
        fetch_and_store_feed(feed)
        self.created_feed = feed  # Store feed for use in custom response

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({"feed": FeedSerializer(self.created_feed).data}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def refresh(self, request, pk=None):
        feed = self.get_object()
        fetch_and_store_feed(feed)
        return Response({"message": "Feed refreshed."}, status=status.HTTP_200_OK)