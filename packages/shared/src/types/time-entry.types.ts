export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  description?: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in seconds
  isManual: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TimeEntryWithProject extends TimeEntry {
  project: {
    id: string;
    name: string;
    color: string;
    client?: {
      id: string;
      name: string;
    };
  };
}

export interface CreateTimeEntryDto {
  projectId: string;
  description?: string;
  startTime: string;
  endTime?: string;
  tags?: string[];
}

export type UpdateTimeEntryDto = Partial<CreateTimeEntryDto>;

export interface StartTimerDto {
  projectId: string;
  description?: string;
}

export interface ActiveTimer extends TimeEntry {
  elapsedSeconds: number;
}
