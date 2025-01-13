'use client'

import React, { useState } from 'react'
import fetchStockData from '../api/fetchStockData'
// Basic component to display stock information


interface StockData {
    stockData: {
        [ticker: string]: {
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

export default function StockInfo({stockData}: StockData) {

    const ticker = Object.keys(stockData['data'])[0]

    return (
        <>
            <div>
                <h2>Stock Data for {ticker}</h2>
                <pre>{JSON.stringify(stockData, null, 2)}</pre>
            </div>
        </>
    )
}
