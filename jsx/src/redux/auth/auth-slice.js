import {createSlice} from '@reduxjs/toolkit';
import {authApi} from './auth-api';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    ping(state) {
      console.log('state: ', state);
    },
  },

  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.ping.matchFulfilled, (state, action) => {
      console.log('action: ', action);
    });

    builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });

    builder.addMatcher(authApi.endpoints.register.matchFulfilled, () => {});

    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
      state.user = null;
      state.token = null;
    });
  },
});

export const {ping} = authSlice.actions;

export default authSlice.reducer;
