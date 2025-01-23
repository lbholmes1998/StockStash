
export default async function fetchStockData(ticker: string) {
    // TODO - CREATE .env file to hold URLs!
    // next fetch is CACHED BY DEFAULT!!
    const res = await fetch(`http://localhost:3000/api/py/stockData/${ticker}`, {cache: 'no-store'})
    if (!res.ok) {
        throw new Error('Failed to fetch stock data')
    }
    const stockData = await res.json()
    return stockData
}
