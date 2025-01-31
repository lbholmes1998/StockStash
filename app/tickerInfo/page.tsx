
import React from "react"
import StockInfo from "@/app/ui/StockInfo"

export default async function Page(props: {searchParams?: Promise<{ticker: string}> }) {

    const searchParams = await props.searchParams
    const ticker = searchParams?.ticker || ''

    if (ticker) {
        return (
            <>
                <StockInfo ticker={ticker} />  
            </>
        )
    }
}
