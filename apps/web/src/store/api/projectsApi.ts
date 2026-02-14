import { baseApi } from './baseApi';

export interface Project {
  id: string;
  userId: string;
  clientId?: string;
  name: string;
  hourlyRate?: number;
  estimatedBudget?: number;
  startDate?: string;
  endDate?: string;
  status: 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'ARCHIVED';
  color: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  name: string;
  clientId?: string;
  hourlyRate?: number;
  estimatedBudget?: number;
  startDate?: string;
  endDate?: string;
  color?: string;
  status?: 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'ARCHIVED';
}

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    getProject: builder.query<Project, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<Project, CreateProjectDto>({
      query: (body) => ({
        url: '/projects',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<Project, { id: string; data: Partial<CreateProjectDto> }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Project', id }],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
    getProjectStats: builder.query<any, string>({
      query: (id) => `/projects/${id}/stats`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectStatsQuery,
} = projectsApi;
