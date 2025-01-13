from dataclasses import dataclass, field
from typing import Any, Dict, Optional
from time import time
from datetime import datetime as dt


@dataclass
class StockStashCache:
    """
        Class for caching stock data responses from API.
        Data is cached for 1 hour before being deleted. 
    """
    cache: Dict[str, Dict[str, Any]] = field(default_factory=dict)
    default_ttl: int = 3600 # Default ttl (1 hour)

    def get(self, key: str) -> Optional[Any]:
        """Retrieve item from cache"""
        item = self.cache.get(key)
        if item:
            date_now = dt.now().replace(microsecond=0)
            print(date_now)
            # date_now = dt.strptime(str(date_now), "%Y-%m-%d %H:%M:%S")
            
            expires = dt.strptime(item[key]['fetched_at']['expires'], "%Y-%m-%d %H:%M:%S")
            # Compare dates to see if data has exprired
            if date_now < expires:
                print("Valid")
                # Still valid, return date
                return item
            else:
                # Data is not valid, delete
                print("Data expired, deleting!")
                self.delete(key)
        return None
    
    def set(self, key: str, data: Any):
        self.cache[key] = data

    def delete(self, key: str) -> None:
        """ Deletes an item from the cache """
        
        # Check item exits in cache
        if key in self.cache:
            del self.cache[key]


    def clear(self) -> None:
        """Remove all times from the cache"""
        self.cache.clear()
