import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const listingsApi = createApi({
  reducerPath: 'listingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/listing/' }),
  endpoints: (builder) => ({
    searchCatalogItems: builder.mutation({
      query: ({ asin, sellerId }: { asin: string; sellerId: string }) => {
        return {
          url: `searchCatalogItems/${sellerId}/${asin}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const { useSearchCatalogItemsMutation } = listingsApi;

export default listingsApi;
