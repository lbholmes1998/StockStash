import { fetchUserById } from "@/app/lib/data"


export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const id = params.id

    const { name, email } = await fetchUserById(id)

    return (

        <div className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile Info</h1>
                <h2 className="text-1xl font-bold tracking-tight text-gray-900">Hello {name}!</h2>
            </div>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h2 className="text-1xl font-bold tracking-tight text-gray-900">Current email: {email}</h2>
            </div>
        </div>
    )

}
