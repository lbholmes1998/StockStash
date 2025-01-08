# In memory cache for page scraping requests

cache_store = {}

def get_cache(key: str):
    # Key = stock ticker
    return cache_store.get(key)

def set_cache(key: str, value: dict, ttl: int = 3600):
    cache_store[key] = value
    # TODO - wipe cache entry after ttl has expired.
