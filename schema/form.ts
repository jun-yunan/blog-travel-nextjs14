import { z } from 'zod';

export const formEditProfile = z.object({
  name: z.string().max(50).optional(),
  location: z.string().max(300).optional(),
  bio: z
    .string()
    .max(300, {
      message: 'Bio must be less than 300 characters',
    })
    .optional(),
  personalWebsite: z.string().url().optional(),
  dateOfBirth: z.date().optional(),
});

export const formPassword = z.object({
  oldPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(50, { message: 'Password must not exceed 50 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&#^()-_=+]/, {
      message: 'Password must contain at least one special character',
    }),
  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(50, { message: 'Password must not exceed 50 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&#^()-_=+]/, {
      message: 'Password must contain at least one special character',
    }),
});

export const formCreateBlog = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string(),
  tags: z.string().optional(),
});

export const formEditBlog = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string(),
  tags: z.string().optional(),
});

export const formUpdateUsernameAndPassword = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .max(30, { message: 'Username cannot be longer than 30 characters.' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'Username can only contain letters, numbers, underscores (_), and hyphens (-).',
    }),
  email: z.string().email({ message: 'Invalid email address.' }),
});
