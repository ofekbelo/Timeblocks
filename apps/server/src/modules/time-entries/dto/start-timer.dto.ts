import { z } from 'zod';

export const startTimerSchema = z.object({
  projectId: z.string(),
  description: z.string().optional(),
});

export type StartTimerDto = z.infer<typeof startTimerSchema>;
