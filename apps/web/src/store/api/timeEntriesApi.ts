import { baseApi } from './baseApi';

export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  description?: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  isManual: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTimeEntryDto {
  projectId: string;
  description?: string;
  startTime: string;
  endTime?: string;
  tags?: string[];
}

export const timeEntriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTimeEntries: builder.query<TimeEntry[], void>({
      query: () => '/time-entries',
      providesTags: ['TimeEntry'],
    }),
    getTimeEntry: builder.query<TimeEntry, string>({
      query: (id) => `/time-entries/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'TimeEntry', id }],
    }),
    createTimeEntry: builder.mutation<TimeEntry, CreateTimeEntryDto>({
      query: (body) => ({
        url: '/time-entries',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TimeEntry'],
    }),
    updateTimeEntry: builder.mutation<TimeEntry, { id: string; data: Partial<CreateTimeEntryDto> }>({
      query: ({ id, data }) => ({
        url: `/time-entries/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'TimeEntry', id }],
    }),
    deleteTimeEntry: builder.mutation<void, string>({
      query: (id) => ({
        url: `/time-entries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TimeEntry'],
    }),
    startTimer: builder.mutation<TimeEntry, { projectId: string; description?: string }>({
      query: (body) => ({
        url: '/time-entries/start-timer',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TimeEntry'],
    }),
    stopTimer: builder.mutation<TimeEntry, void>({
      query: () => ({
        url: '/time-entries/stop-timer',
        method: 'POST',
      }),
      invalidatesTags: ['TimeEntry'],
    }),
    getActiveTimer: builder.query<TimeEntry | null, void>({
      query: () => '/time-entries/active-timer',
      providesTags: ['TimeEntry'],
    }),
  }),
});

export const {
  useGetTimeEntriesQuery,
  useGetTimeEntryQuery,
  useCreateTimeEntryMutation,
  useUpdateTimeEntryMutation,
  useDeleteTimeEntryMutation,
  useStartTimerMutation,
  useStopTimerMutation,
  useGetActiveTimerQuery,
} = timeEntriesApi;
