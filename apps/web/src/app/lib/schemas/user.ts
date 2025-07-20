import { z } from 'zod'
import { email_error, min_length_error, required_error } from '~/app/lib/schemas/messages'

/**
 * Schema for creating a new user.
 *
 * Validates the following fields:
 * - `username`: Required string, must not be empty.
 * - `email`: Required, must be a valid email address.
 * - `password`: Required string, must be at least 6 characters long.
 */
export const createUserSchema = z.object({
  username: z.string({ error: required_error }).min(1, required_error),
  email: z.email(email_error),
  password: z.string({ error: required_error }).min(6, min_length_error(6))
})

/**
 * Schema for updating a user.
 *
 * This schema is derived from `createUserSchema` by making all fields optional
 * and omitting the `password` field to prevent updates to the password.
 */
export const updateUserSchema = createUserSchema.partial().omit({ password: true })
