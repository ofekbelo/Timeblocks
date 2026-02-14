export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export interface Project {
  id: string;
  userId: string;
  clientId?: string;
  name: string;
  hourlyRate?: number;
  estimatedBudget?: number;
  startDate?: string;
  endDate?: string;
  status: ProjectStatus;
  color: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithClient extends Project {
  client?: {
    id: string;
    name: string;
  };
}

export interface ProjectStats {
  totalHours: number;
  totalRevenue: number;
  totalEntries: number;
}

export interface ProjectWithStats extends Project {
  stats: ProjectStats;
}

export interface CreateProjectDto {
  name: string;
  clientId?: string;
  hourlyRate?: number;
  estimatedBudget?: number;
  startDate?: string;
  endDate?: string;
  color?: string;
  status?: ProjectStatus;
}

export type UpdateProjectDto = Partial<CreateProjectDto>;
