import React from "react"
import StockInfo from "@/app/ui/StockInfo"

export default async function Page(props: { params: Promise<{ ticker: string}> }) {

    const params = await props.params
    const ticker = params.ticker

    return (
        <>
            <StockInfo ticker={ticker} />  
        </>
    )
}
