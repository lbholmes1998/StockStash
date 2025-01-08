from fastapi import FastAPI, BackgroundTasks
from .web_scraper import scrape_stock_page_async
from .cache import get_cache, set_cache

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.get("/api/py/stockData/{ticker}")
async def fetch_stock_data(ticker: str, background_tasks: BackgroundTasks):
    """
        Fetch stock data. Use cache if available else scrape in background.
    """
    cached_data = get_cache(ticker)
    if cached_data:
        return {"data": cached_data, "from_cache": True}
    
    # If data isnt cached, scrape the page, cache it, and return data
    stock_data = await scrape_stock_page_async(ticker)

    set_cache(ticker, stock_data)

    return {"data": stock_data, "from_cache": False}
