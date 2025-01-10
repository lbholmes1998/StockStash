
export default async function fetchStockData(ticker: string) {
    // TODO - CREATE .env file to hold URLs!
    const data = await fetch(`http://localhost:3000/api/py/stockData/${ticker}`)
    const stockData = await data.json()
    return stockData
}
