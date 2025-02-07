
import React from "react"
import StockInfo from "@/app/ui/StockInfo"
import { auth } from "@/auth"

export default async function Page(props: {searchParams?: Promise<{ticker: string}> }) {

    const searchParams = await props.searchParams
    const ticker = searchParams?.ticker || ''

    const session = await auth()

    if (ticker && session) {
        return (
            <>
                <StockInfo ticker={ticker} userSession={session} />  
            </>
        )
    }
}
