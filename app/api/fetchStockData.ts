
export default async function fetchStockData(ticker: string) {
    // TODO - CREATE .env file to hold URLs!
    // next fetch is CACHED BY DEFAULT!!

    if (process.env.NODE_ENV === "development") {
        const res = await fetch(`http://localhost:3000/api/py/stockData/${ticker}`, {cache: 'no-store'})
        if (!res.ok) {
            throw new Error('Failed to fetch stock data')
        }
        const stockData = await res.json()
        return stockData
    } else {

        const res = await fetch(`/api/py/stockData/${ticker}`, {cache: 'no-store'})
        if (!res.ok) {
            throw new Error('Failed to fetch stock data')
        }
        const stockData = await res.json()
        return stockData
    }
}
