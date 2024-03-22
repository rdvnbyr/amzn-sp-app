import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ping: 0,
};

const amazonListingsSlice = createSlice({
  name: 'amazonListings',
  initialState,
  reducers: {
    ping: state => {
      state.ping += 1;
    },
  },
});

export const {ping} = amazonListingsSlice.actions;

export default amazonListingsSlice.reducer;
