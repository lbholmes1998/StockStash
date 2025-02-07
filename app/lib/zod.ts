
import {z} from 'zod'

// Might use is future
export const signInSchema = z.object({
    email: z.string({required_error: "Email is required"})
    .min(1, "Email is required")
    .email("Invalid Email"),
    password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(24, "Password must be less than 24 characters")
})
