import { baseApi } from './baseApi';
import type {
  TimeEntry,
  TimeEntryWithProject,
  CreateTimeEntryDto,
  StartTimerDto,
} from '@timeblocks/shared/types';

export type { TimeEntry, TimeEntryWithProject, CreateTimeEntryDto, StartTimerDto };

export interface GetTimeEntriesParams {
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export const timeEntriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTimeEntries: builder.query<TimeEntryWithProject[], GetTimeEntriesParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params && typeof params === 'object') {
          if (params.startDate) queryParams.append('startDate', params.startDate);
          if (params.endDate) queryParams.append('endDate', params.endDate);
          if (params.limit) queryParams.append('limit', params.limit.toString());
        }
        const queryString = queryParams.toString();
        return queryString ? `/time-entries?${queryString}` : '/time-entries';
      },
      providesTags: ['TimeEntry'],
    }),
    getTimeEntry: builder.query<TimeEntryWithProject, string>({
      query: (id) => `/time-entries/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'TimeEntry', id }],
    }),
    createTimeEntry: builder.mutation<TimeEntryWithProject, CreateTimeEntryDto>({
      query: (body) => ({
        url: '/time-entries',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TimeEntry'],
    }),
    updateTimeEntry: builder.mutation<TimeEntryWithProject, { id: string; data: Partial<CreateTimeEntryDto> }>({
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
    startTimer: builder.mutation<TimeEntryWithProject, StartTimerDto>({
      query: (body) => ({
        url: '/time-entries/start-timer',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TimeEntry'],
    }),
    stopTimer: builder.mutation<TimeEntryWithProject, void>({
      query: () => ({
        url: '/time-entries/stop-timer',
        method: 'POST',
      }),
      invalidatesTags: ['TimeEntry'],
    }),
    getActiveTimer: builder.query<TimeEntryWithProject | null, void>({
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
