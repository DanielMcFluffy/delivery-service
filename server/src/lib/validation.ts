import z from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "./constant";

export const RegisterRequestSchema = z.object({
  username: z
    .string({ message: "Username cannot be blank" })
    .refine((val) => val.length > 3, {
      message: "Username must be between 3 and 20 characters",
    }),
  password: z
    .string({ message: "Password cannot be blank" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" })
});

export const LoginRequestSchema = z.object({
  username: z
    .string({ message: "Username cannot be blank" })
    .refine((val) => val.length > 3, {
      message: "Username must be between 3 and 20 characters",
    }),
  password: z
    .string({ message: "Password cannot be blank" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export const UserRequestSchema = z.object({
  username: z
    .string({ message: "Username cannot be blank" })
    .refine((val) => val.length > 3, {
      message: "Username must be between 3 and 20 characters",
    })
    .optional(),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" })
    .optional(),
  password: z
    .string({ message: "Password cannot be blank" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .optional(),
  contactNo: z
    .string({ message: "Contact No. is required" })
    .regex(/^[0-9]{10,15}$/, {
      message: "Invalid phone number. It must be between 10 and 15 digits.",
    })
    .optional(),
  avatar: z
    .any()
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max image size is 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
    })
    .optional(),
  country: z.string({ message: "Country is required" }).optional(),
  coordinate: z
    .tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)], {
      message: "Coordinate is invalid",
    })
    .optional(),
  socialScore: z.array(z.string()).optional(),
});

export const JobRequestSchema = z.object({
  title: z.string({ message: "Title cannot be required" }),
  description: z.string({ message: "Description is required" }),
  location: z.string({ message: "Location is required" }),
  coordinate: z.tuple([
    z.number().min(-90).max(90),
    z.number().min(-180).max(180),
  ], { message: "Coordinate is invalid" }),
});

export type TRegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type TLoginRequest = z.infer<typeof LoginRequestSchema>;
