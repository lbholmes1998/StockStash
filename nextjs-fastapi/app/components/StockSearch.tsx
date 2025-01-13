'use client'

import React, { useState, FormEvent } from 'react';
import StockInfo from './StockInfo';

import fetchStockData from '../api/fetchStockData';

export default function StockSearch() {

    const [query, setQuery] = useState('');
    const [stockData, setStockData] = useState(null)

    const handleSubmit = async (e: FormEvent<HTMLElement>) => {
        
        e.preventDefault();
        try {
            const data = await fetchStockData(query)
            setStockData(data)
            setQuery('')
        } catch (error) {
            console.error(error)
        }
        
    }

    return (
        <>
            <form className='flex justify-center md:justify-between' 
            onSubmit={handleSubmit}>
                <input
                    className="bg-white p-2 w-[260px] sm:w-80 text-xl rounded-xl text-black m-auto"
                    type="text"
                    placeholder="Enter a stock ticker ..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
            {stockData && (
                <StockInfo stockData={stockData}/>
            )}
        </>
    );
}
