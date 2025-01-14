'use client'

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'

export default function StockSearch() {

    const [query, setQuery] = useState('');

    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLElement>) => {
        
        e.preventDefault();

        // Route to /tickerInfo/[ticker]
        router.push(`/tickerInfo/${query}`)
        setQuery('')

    }

    return (
        <>
            <form className='flex justify-center md:justify-between' 
            onSubmit={handleSubmit}>
                <input
                    className="bg-white p-2 w-[260px] sm:w-80 text-xl rounded-xl text-black m-auto"
                    type="text"
                    placeholder="Enter a Ticker..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value.toUpperCase())}
                />
            </form>
        </>
    );
}
