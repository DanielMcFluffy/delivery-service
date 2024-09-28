import z from 'zod';


export const loginFormValidation = z.object({
  username: z.string().min(3, {message: 'Username should be at least three characters'}),
  password: z.string()
    .min(6, {message: 'Password requires at least six characters'})
    .regex(/[a-z]/, {message: 'Password requires at least one lowercase character'})
    .regex(/[A-Z]/, {message: 'Password requires at least one uppercase character'})
    .regex(/[0-9]/, {message: 'Password requires at least one number'})
    .regex(/[^A-Za-z0-9]/, {message: 'Password requires at least one special character'})
})

export const registerFormValidation = z.object({
  username: z.string().min(3, {message: 'Username should be at least three characters'}),
  password: z.string()
    .min(6, {message: 'Password requires at least six characters'})
    .regex(/[a-z]/, {message: 'Password requires at least one lowercase character'})
    .regex(/[A-Z]/, {message: 'Password requires at least one uppercase character'})
    .regex(/[0-9]/, {message: 'Password requires at least one number'})
    .regex(/[^A-Za-z0-9]/, {message: 'Password requires at least one special character'}),
  email: z.string().email({message: 'Email not valid'})
})

export type TLoginForm = z.infer<typeof loginFormValidation>;
export type TRegisterForm = z.infer<typeof registerFormValidation>;