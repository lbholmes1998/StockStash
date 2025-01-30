import { sql } from '@vercel/postgres'
import { User } from "./definitions"

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
