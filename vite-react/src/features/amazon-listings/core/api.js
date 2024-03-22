import {createApi, fetchBaseQuery} from '@reduxjs/toolkit';

const amazonListingsAPI = createApi({
  reducerPath: 'amazonListingsAPI',
  baseQuery: fetchBaseQuery({baseUrl: '/api'}),
  tagTypes: ['AmazonListings'],
  endpoints: builder => ({
    getAmazonListings: builder.query({
      query: () => 'amazon-listings',
      providesTags: ['AmazonListings'],
    }),
    createAmazonListing: builder.mutation({
      query: body => ({
        url: 'amazon-listings',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AmazonListings'],
    }),
    updateAmazonListing: builder.mutation({
      query: ({id, ...body}) => ({
        url: `amazon-listings/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['AmazonListings'],
    }),
    deleteAmazonListing: builder.mutation({
      query: id => ({
        url: `amazon-listings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AmazonListings'],
    }),
  }),
});
