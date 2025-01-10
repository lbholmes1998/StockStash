'use client'

import React, { useState } from 'react'
import fetchStockData from '../lib/fetchStockData'
// Basic component to display stock information


interface StockData {
    stockData: {
        [ticker: string]: {
            name: string,
            revenue: {
                value: number | string,
                'y/y_change': string
            },
            cash_from_financing: {
                value: number | string,
                'y/y_change': string
            },
            cach_from_operations: {
                value: number | string,
                'y/y_change': string
            },
            eps: {
                value: number | string,
                'y/y_change': string
            },
            net_income: {
                value: number | string,
                'y/y_change': string
            },
            total_assets: {
                value: number | string,
                'y/y_change': string
            },
            total_liabilities: {
                value: number | string,
                'y/y_change': string
            },
            fetched_at: {
                date: string,
                expires: string
            },
        }
    }
}

export default function StockInfo() {

    const [stockData, setStockData] = useState<StockData>()

    const handleDataFetch = async (ticker: string) => {
        // TODO - Move data fetching elsewhere
        // Fetch data for a stock, mostly used for dev purposes
        const data = await fetchStockData(ticker)
        console.log(data)
        setStockData(data)
    }

    return (
        <>
            <button
                type="button"
                className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => { handleDataFetch('MIND') }}
            >
                Fetch GCT Info
            </button>

        </>
    )
}
