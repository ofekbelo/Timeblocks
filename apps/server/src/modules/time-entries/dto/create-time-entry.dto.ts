import { z } from 'zod';

export const createTimeEntrySchema = z.object({
  projectId: z.string(),
  description: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  duration: z.number().int().positive().optional(),
  isManual: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export type CreateTimeEntryDto = z.infer<typeof createTimeEntrySchema>;
