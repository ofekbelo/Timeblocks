import { z } from 'zod';

export const updateUserSchema = z.object({
  fullName: z.string().min(2).optional(),
  avatarUrl: z.string().url().optional(),
  timezone: z.string().optional(),
  currency: z.string().length(3).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
