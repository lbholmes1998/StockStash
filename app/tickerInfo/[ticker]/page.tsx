import React from "react"
import StockInfo from "@/app/components/StockInfo"
import fetchStockData from "@/app/api/fetchStockData"


export default async function Page(props: { params: Promise<{ ticker: string}> }) {

    const params = await props.params
    const ticker = params.ticker

    // Fetch stock data then pass to stock info component.
    const stockData = await fetchStockData(ticker)

    return (
        <>
            <StockInfo stockData={stockData} />  
        </>
    )
}
