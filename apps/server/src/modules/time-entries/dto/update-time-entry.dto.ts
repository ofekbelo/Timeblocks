import { z } from 'zod';
import { createTimeEntrySchema } from './create-time-entry.dto';

export const updateTimeEntrySchema = createTimeEntrySchema.partial();

export type UpdateTimeEntryDto = z.infer<typeof updateTimeEntrySchema>;
