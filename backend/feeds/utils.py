import feedparser
from .models import Feed, FeedItem
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware
from datetime import datetime
from django.utils.timezone import now

def fetch_and_store_feed(feed: Feed):
    parsed_feed = feedparser.parse(feed.url)

    if parsed_feed.bozo:
        print(f"Failed to parse feed: {feed.url}")
        return

    feed.title = parsed_feed.feed.get("title", feed.title)
    feed.description = parsed_feed.feed.get("description", "")
 #   feed.last_fetched = datetime.now()
    feed.last_fetched = now()
    feed.save()

    for entry in parsed_feed.entries:
        guid = entry.get("id") or entry.get("link")

        if not FeedItem.objects.filter(guid=guid).exists():
            FeedItem.objects.create(
                feed=feed,
                title=entry.get("title", ""),
                link=entry.get("link", ""),
                description=entry.get("summary", ""),
                published_date=make_aware(parse_datetime(entry.get("published", "")) or datetime.now()),
                guid=guid,
            )