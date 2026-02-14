import { ProjectStatus } from '../types';

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: 'Active',
  [ProjectStatus.ON_HOLD]: 'On Hold',
  [ProjectStatus.COMPLETED]: 'Completed',
  [ProjectStatus.ARCHIVED]: 'Archived',
};

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: '#7ED321',
  [ProjectStatus.ON_HOLD]: '#F5A623',
  [ProjectStatus.COMPLETED]: '#4A90E2',
  [ProjectStatus.ARCHIVED]: '#9CA3AF',
};

export const DEFAULT_PROJECT_STATUS = ProjectStatus.ACTIVE;
