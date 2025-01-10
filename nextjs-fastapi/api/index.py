from fastapi import FastAPI
from .stock_scraper import scrape_stock_page_async
from .cache import StockStashCache

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")
cache = StockStashCache()

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.get("/api/py/stockData/{ticker}")
async def fetch_stock_data(ticker: str):
    """
        Fetch stock data. Use cache if available else scrape in background.
    """

    # TODO - Convert ticker str to upper case before calling scrape function

    print(f"Request data for: {ticker}")

    # cached_data = get_cache(ticker)
    cached_data = cache.get(ticker)
    if cached_data:
        return {"data": cached_data, "from_cache": True}
    
    # If data isnt cached, scrape the page, cache it, and return data
    print("Requesting new data from Google Finance")
    stock_data = await scrape_stock_page_async(ticker)

    cache.set(ticker, stock_data)

    return {"data": stock_data, "from_cache": False}
