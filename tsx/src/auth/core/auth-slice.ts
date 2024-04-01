import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    ping: 0,
  },
  reducers: {
    ping(state) {
      state.ping++;
    },
  },
});

export const { ping } = authSlice.actions;

export default authSlice.reducer;
