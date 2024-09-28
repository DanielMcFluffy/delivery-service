import z from 'zod';

export const registerRequestSchema = z.object({
  username: z.string({message: 'Username cannot be blank'}).refine((val) => val.length > 3 , {message: 'Username must be between 3 and 20 characters'}),
  password: z.string({message: 'Password cannot be blank'})
      .min(6, {message: 'Password must be at least 6 characters long'})
      .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase letter'})
      .regex(/[a-z]/, {message: 'Password must contain at least one lowercase letter'})
      .regex(/[0-9]/, {message: 'Password must contain at least one number'})
      .regex(/[^A-Za-z0-9]/, {message: 'Password must contain at least one special character'}),
  email: z.string({message: 'Email is required'})
    .email({message: 'Invalid email'})
})

export const loginRequestSchema = z.object({
  username: z.string({message: 'Username cannot be blank'}).refine((val) => val.length > 3 , {message: 'Username must be between 3 and 20 characters'}),
  password: z.string({message: 'Password cannot be blank'})
      .min(6, {message: 'Password must be at least 6 characters long'})
      .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase letter'})
      .regex(/[a-z]/, {message: 'Password must contain at least one lowercase letter'})
      .regex(/[0-9]/, {message: 'Password must contain at least one number'})
      .regex(/[^A-Za-z0-9]/, {message: 'Password must contain at least one special character'}),
})

export type TRegisterRequest = z.infer<typeof registerRequestSchema>;
export type TLoginRequest = z.infer<typeof loginRequestSchema>;