import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to refresh token
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh-token',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Store new tokens
        const { accessToken, refreshToken: newRefreshToken } = refreshResult.data as any;
        api.dispatch({
          type: 'auth/setTokens',
          payload: { accessToken, refreshToken: newRefreshToken },
        });

        // Retry original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed - logout
        api.dispatch({ type: 'auth/logout' });
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Client', 'Project', 'TimeEntry'],
  endpoints: () => ({}),
});
