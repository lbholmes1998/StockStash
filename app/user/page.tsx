import { auth } from "@/auth";
import Link from "next/link";


export default async function Page() {

    const session = await auth()
    console.log(session)

    if (!session?.user?.email) {
        return (
            <>
                <p>You must be logged in to see this Page</p>
                <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md text-black bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3">
                    <Link href={"/login"}>Sign In </Link>
                </button>
            </>
        )
    }

}
