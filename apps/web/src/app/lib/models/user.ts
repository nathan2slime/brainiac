import z from 'zod'

import { createUserSchema, updateUserSchema } from '~/app/lib/schemas/user'

/**
 * Represents the data transfer object (DTO) for creating a user.
 * The type is inferred from the `createUserDto` Zod schema.
 */
export type CreateUserDto = z.infer<typeof createUserSchema>

/**
 * Represents a user entity without the password field.
 * Combines properties from `CreateUserDto` and adds `id`, `createdAt`, and `updatedAt`.
 *
 * @property {string} id - Unique identifier for the user.
 * @property {Date} createdAt - Timestamp when the user was created.
 * @property {Date} updatedAt - Timestamp when the user was last updated.
 * @remarks
 * The `password` property from `CreateUserDto` is omitted for security reasons.
 */
export type User = Omit<
  CreateUserDto & {
    id: string
    createdAt: Date
    updatedAt: Date
  },
  'password'
>

/**
 * Data Transfer Object (DTO) type for updating a user.
 *
 * This type is inferred from the `updateUserSchema` Zod schema,
 * ensuring that the shape of the update payload matches the schema's validation rules.
 */
export type UpdateUserDto = z.infer<typeof updateUserSchema>
