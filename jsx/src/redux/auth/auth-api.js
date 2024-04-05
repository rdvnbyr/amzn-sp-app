import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {DEV_API_URL} from '../../lib/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: DEV_API_URL}),
  endpoints: builder => ({
    login: builder.mutation({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation({
      query: body => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    me: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),
    ping: builder.query({
      query: () => '/ping',
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation, useLogoutMutation, useMeQuery, usePingQuery} = authApi;
