import Link from 'next/link';
import type { Session } from 'next-auth';
import { signOut } from "@/auth";


export function UserSignOutButton() {
    // Sign user out.
    return (
        <form
        action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
        }}
    >
        <button className="flex h-[48px] w-24 grow items-center justify-center gap-2 rounded-md text-black bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
        </button>
    </form>
    )

}

export async function UserProfileButton(props: { userSession: Session }) {

    const session = props.userSession
    if (session === undefined) return null

    return (
        <Link
            href={`/user/${session.user.id}/`}
            className="flex h-[48px] w-24 grow items-center justify-center gap-2 rounded-md text-black bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"
        >
            <span className="hidden md:block">My Profile</span>{' '}
        </Link>
    )
}

export function UserStocksButton() {
    // Route user to a page showing their saved stocks

}

export function EditUserDetails() {
    // route user to a page with a form allowing them to edit their details
    // Change email, username, password, etc. 
}
