import { z } from 'zod';

export const createTimeEntrySchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  description: z.string().max(500, 'Description is too long').optional(),
  startTime: z.string().datetime('Invalid start time'),
  endTime: z.string().datetime('Invalid end time').optional(),
  tags: z.array(z.string()).optional(),
});

export const updateTimeEntrySchema = createTimeEntrySchema.partial();

export const startTimerSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  description: z.string().max(500, 'Description is too long').optional(),
});

export type CreateTimeEntryInput = z.infer<typeof createTimeEntrySchema>;
export type UpdateTimeEntryInput = z.infer<typeof updateTimeEntrySchema>;
export type StartTimerInput = z.infer<typeof startTimerSchema>;
