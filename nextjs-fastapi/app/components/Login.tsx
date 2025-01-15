'use client'

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLElement>) => {

        e.preventDefault();

        router.push(`/`)
        setUsername('')
        setPassword('')

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Log In</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Enter a Username..."
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    password
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password..."
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </>
    );
}
