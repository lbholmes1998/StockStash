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
            cash_from_operations: {
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

    const ticker = Object.keys(stockData)[0]

    return (
        <>
            <div>
                <h2>Stock Data for {ticker}</h2>
                <p>Revenue: {stockData[ticker].revenue.value}</p>
                <p>Revenue Y/Y Change: {stockData[ticker].revenue['y/y_change']}</p>
                <p>Cash from Financing: {stockData[ticker].cash_from_financing.value}</p>
                <p>Cash from Financing Y/Y Change: {stockData[ticker].cash_from_financing['y/y_change']}</p>
                <p>Cash from Operations: {stockData[ticker].cash_from_operations.value}</p>
                <p>Cash from Operations Y/Y Change: {stockData[ticker].cash_from_operations['y/y_change']}</p>
                <p>Earnings per Share: {stockData[ticker].eps.value}</p>
                <p>Earnings per Share Y/Y Change: {stockData[ticker].eps['y/y_change']}</p>
                <p>Net Income: {stockData[ticker].net_income.value}</p>
                <p>Net Income Y/Y Change: {stockData[ticker].net_income['y/y_change']}</p>
                <p>Total Assets: {stockData[ticker].total_assets.value}</p>
                <p>Total Assets Y/Y Change: {stockData[ticker].total_assets['y/y_change']}</p>
                <p>Total Liabilities: {stockData[ticker].total_liabilities.value}</p>
                <p>Total Liabilities Y/Y Change: {stockData[ticker].total_liabilities['y/y_change']}</p>

                {/* <pre>{JSON.stringify(stockData, null, 2)}</pre> */}
            </div>
        </>
    )
}
