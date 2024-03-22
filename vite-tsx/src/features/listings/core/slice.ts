import { createSlice } from '@reduxjs/toolkit';
import listingsApi from './api';

interface ListingState {
  ping: number;
  listings: unknown[];
}

const initialState: ListingState = {
  ping: 0,
  listings: [],
};

const listingSlice = createSlice({
  name: 'listings',
  initialState: initialState,
  reducers: {
    ping: (state) => {
      state.ping += 1;
    },
  },

  extraReducers: (builder) => {
    // Add extra reducers here
    builder.addMatcher(listingsApi.endpoints.searchCatalogItems.matchFulfilled, (state, action) => {
      state.listings = action.payload;
    });
  },
});

export const { ping } = listingSlice.actions;

export default listingSlice.reducer;
