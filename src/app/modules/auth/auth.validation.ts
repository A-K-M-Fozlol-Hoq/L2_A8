import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.string().refine(val => val === 'admin' || val === 'customer', {
      message: 'Invalid role value',
    }),
    contactNo: z.string(),
    address: z.string(),
    profileImg: z.string(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const AuthValidation = {
  createUser,
  loginZodSchema,
};
