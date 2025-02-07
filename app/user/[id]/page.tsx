import { fetchUserById, fetchUserSavedStocks } from "@/app/lib/data"

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const id = params.id

    const { name, email } = await fetchUserById(id)
    const savedStocks = await fetchUserSavedStocks(id)

    savedStocks.map((saved) => console.log(saved.ticker))

    return (

        <div className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile Info</h1>
                <p className="text-1xl font-bold tracking-tight text-gray-900">Hello {name}!</p>
            </div>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-1xl font-bold tracking-tight text-gray-900">Your Info</h1>
                <h2 className="text-1xl tracking-tight text-gray-900">Email: {email}</h2>
            </div>

            <h2 className="font-bold text-lg">Your Saved Stocks</h2>
            <p>MAKE THIS A TABLE!</p>
            {savedStocks.map((saved) => (
                <div key={saved.ticker}>
                    <p>Ticker: {saved.ticker}</p>
                    <p>Saved at {saved.saved_at.toString()}</p>
                </div>
            ))}
        </div>
    )

}
