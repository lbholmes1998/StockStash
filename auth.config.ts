import type { NextAuthConfig, DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
        } & DefaultSession["user"]
    }
}

export const authConfig = {
    pages: {
        // Custom page
        signIn: '/login',
    },
    // Protect routes
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnUserPage = nextUrl.pathname.startsWith('/user')

            if (isOnUserPage) {
                if (isLoggedIn) {
                    return true
                }
                return false // redirect unauthenticated users to login page
            } 

            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session({ session, token}) {
            session.user.id = token.id
            return session
        }
    },
    providers: []
} satisfies NextAuthConfig
