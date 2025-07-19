import { z } from 'zod'

/**
 * Schema for creating a new user.
 *
 * Validates the following fields:
 * - `username`: Required string, must not be empty.
 * - `email`: Required, must be a valid email address.
 * - `password`: Required string, must be at least 6 characters long.
 */
export const createUserSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.email(),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

/**
 * Schema for updating a user.
 *
 * This schema is derived from `createUserSchema` by making all fields optional
 * and omitting the `password` field to prevent updates to the password.
 */
export const updateUserSchema = createUserSchema.partial().omit({ password: true })
