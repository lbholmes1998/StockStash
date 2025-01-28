import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    // Protect routes
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnUserPage = nextUrl.pathname.startsWith('/user')

            if (isOnUserPage) {
                if (isLoggedIn) return true
                return false // redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/user', nextUrl))
            }

            return true
        }
    },
    providers: []
} satisfies NextAuthConfig
