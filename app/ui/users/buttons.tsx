import Link from 'next/link';
import { auth } from '@/auth';

export function UserStocks() {
    // Route user to a page showing their saved stocks

}

export async function UserProfile() {

    const session = await auth()
    if (!session) return null

    return (
        <Link
            href={`/user/${session.user.id}/`}
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">My Profile</span>{' '}
        </Link>
    )
}

export function EditUserDetails() {
    // route user to a page with a form allowing them to edit their details
    // Change email, username, password, etc. 
}
