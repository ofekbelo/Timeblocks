export interface Client {
  id: string;
  userId: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  color: string;
  notes?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientWithProjects extends Client {
  projects?: Project[];
}

export interface CreateClientDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  color?: string;
  notes?: string;
}

export type UpdateClientDto = Partial<CreateClientDto>;

// Forward declaration (will be defined in project.types.ts)
interface Project {
  id: string;
  name: string;
}
