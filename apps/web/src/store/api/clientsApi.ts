import { baseApi } from './baseApi';

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

export interface CreateClientDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  color?: string;
  notes?: string;
}

export const clientsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => '/clients',
      providesTags: ['Client'],
    }),
    getClient: builder.query<Client, string>({
      query: (id) => `/clients/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Client', id }],
    }),
    createClient: builder.mutation<Client, CreateClientDto>({
      query: (body) => ({
        url: '/clients',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Client'],
    }),
    updateClient: builder.mutation<Client, { id: string; data: Partial<CreateClientDto> }>({
      query: ({ id, data }) => ({
        url: `/clients/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Client', id }],
    }),
    deleteClient: builder.mutation<void, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Client'],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi;
