import { sql } from '@vercel/postgres'
import { User, SavedStock } from "./definitions"

export async function fetchUserById(id: string) {
    try {
        const data = await sql<User>`
            SELECT
                users.id,
                users.name,
                users.email
            FROM users
            WHERE users.id = ${id}
        `

        const userData = data.rows[0]
        return userData

    } catch (error) {
        console.error('Error fetching user details', error)
        throw new Error('Failed to fetch user details.')
    }
}

export async function fetchUserSavedStocks(id: string) {
    try {
        const data = await sql<SavedStock>`
            SELECT
                saved_stocks.id,
                saved_stocks.ticker,
                saved_stocks.user_id,
                saved_stocks.saved_at
            FROM saved_stocks
            WHERE saved_stocks.user_id = ${id}
        `

        const userSavedStocks = data.rows
        return userSavedStocks

    } catch (error) {
        console.error("Error fetching saved stocks")
        throw new Error("Unable to fetch saved stocks")
    }
}
