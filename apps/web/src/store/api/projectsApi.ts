import { baseApi } from './baseApi';
import type {
  Project,
  ProjectWithClient,
} from '@timeblocks/shared/types';
import type { CreateProjectInput } from '@timeblocks/shared/schemas';

export type { Project, ProjectWithClient, CreateProjectInput };

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectWithClient[], void>({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    getProject: builder.query<ProjectWithClient, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<ProjectWithClient, CreateProjectInput>({
      query: (body) => ({
        url: '/projects',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<ProjectWithClient, { id: string; data: Partial<CreateProjectInput> }>({
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
