import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import type { User } from '@/app/lib/definitions'
import bcrypt from 'bcrypt'


async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
        return user.rows[0]
    } catch(error) {
        console.error('Failed to fetch user: ', error)
        throw new Error('Failed to fetch user.')
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string() })
                    .safeParse(credentials)

                if (parsedCredentials.success === true) {
                    const {email, password} = parsedCredentials.data

                    // Verify user exists
                    const user = await getUser(email);

                    if (!user) {
                        throw new Error("Unable to find user.")
                    };

                    // User exists, check passwords match
                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if (passwordMatch) return user
                }

                console.log("Invalid Credentials!")
                return null
            },
        }),
    ],
})
