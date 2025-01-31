'use client'

import React, { useState, FormEvent } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function StockSearch() {

    const [query, setQuery] = useState('');

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams)
        if (query) {
            params.set('ticker', query)
        } else {
            params.delete('ticker')
        }

        replace(`/tickerInfo/?${params.toString()}`)
        setQuery('')
    }

    return (
        <>
            <form className='flex justify-center md:justify-between' 
            onSubmit={handleSearch}>
                <input
                    className="bg-white p-2 w-[260px] border border-blue-400 sm:w-80 text-xl rounded-xl text-black m-auto"
                    type="text"
                    placeholder="Search a ticker..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value.toUpperCase())}
                />
            </form>
        </>
    );
}
