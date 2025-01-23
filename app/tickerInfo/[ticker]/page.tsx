import React from "react"
import StockInfo from "@/app/components/StockInfo"
import fetchStockData from "@/app/api/fetchStockData"


export default async function Page({ params }: { params: { ticker: string} }) {

    // Fetch stock data then pass to stock info component.
    const stockData = await fetchStockData(params.ticker)

    return (
        <>
            <StockInfo stockData={stockData} />  
        </>
    )
}
