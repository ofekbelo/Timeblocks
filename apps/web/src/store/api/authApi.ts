import { baseApi } from './baseApi';

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  emailVerified: boolean;
  timezone: string;
  currency: string;
  createdAt: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterDto>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation<AuthResponse, LoginDto>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<{ message: string }, { refreshToken: string }>({
      query: (body) => ({
        url: '/auth/logout',
        method: 'POST',
        body,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;
