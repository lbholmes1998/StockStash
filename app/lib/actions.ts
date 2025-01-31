'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { sql } from '@vercel/postgres'
import {z} from 'zod'
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'
import { redirect } from 'next/navigation'
import { auth } from "@/auth"

export type UserDetailsState = {
    
}

const UserSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string()
})

const CreateUser = UserSchema
export async function createUser(formData: FormData) {
    const {username, email, password} = CreateUser.parse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    })
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    // Generate ID
    const id = uuidv4()
    try {
        await sql`
            INSERT INTO users (id, name, email, password)
            VALUES (${id}, ${username}, ${email}, ${hashedPassword})
        `
    } catch (error) {
        console.error(error)
        return {
            message: 'Database error, unable to add user'
        }
    }
    redirect('/')
}


export async function saveStock(ticker: string){
    try {
        const session = await auth()
        if (!session?.user) {
            throw new Error("You must be logged in to save a stock")
        }

        const id = uuidv4()
        const user_id = session.user.id

        await sql`
            INSERT INTO saved_stocks (id, user_id, ticker, saved_at)
            VALUES (${id}, ${user_id}, ${ticker}, NOW())
        `
    } catch (error) {
        console.error(error)
        throw new Error('Unable to save stock.')
    }
}


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}
