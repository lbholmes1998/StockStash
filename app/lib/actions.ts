'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { sql } from '@vercel/postgres'
import {z} from 'zod'
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'
import { redirect } from 'next/navigation'
import { auth } from "@/auth"


const UserSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string()
})

const userFormSchema = z.object({
    username: z.string()
    .min(1, "Username is required")
    .min(4, "Username must be more than 4 characters"),
    email: z.string({required_error: "Email is required"})
    .min(1, "Email is required")
    .email("Invalid Email"),
    password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(24, "Password must be less than 24 characters")
})

export type State = {
    // form action default state, holds error data
    errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
    },
    message?: string | null
}

const CreateUser = userFormSchema

export async function createUser(prevState: State, formData: FormData) {
    const validatedFields = CreateUser.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalidated fields. Unable to add user.'
        }
    }
    
    const {username, email, password} = validatedFields.data

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


const AuthenticateUser = userFormSchema.omit({username: true})
// TODO add field validation as above

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
