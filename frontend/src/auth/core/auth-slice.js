import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
  status: 'idle',
  isLoading: false,
  ping: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ping: state => {
      state.ping += 1;
    },
  },
});

export const {ping} = authSlice.actions;

export default authSlice.reducer;
