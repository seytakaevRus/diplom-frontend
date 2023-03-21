import { createSlice } from '@reduxjs/toolkit';

import { UserInfoType } from '../../types/user-info';
import { fetchUser, loginUser, registerUser } from '../apis/auth';
import { RootState } from '../store';

export interface AuthSliceState {
  loading: boolean;
  error: null | string;
  userInfo: null | UserInfoType;
}

const initialState: AuthSliceState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.loading = false;
        state.userInfo = payload;
      }
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      if (typeof payload === 'string') {
        state.loading = false;
        state.error = payload;
      }
    });

    builder.addCase(loginUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.loading = false;
        state.userInfo = payload;
      }
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      if (typeof payload === 'string') {
        state.loading = false;
        state.error = payload;
      }
    });

    builder.addCase(fetchUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.loading = false;
        state.userInfo = payload;
      }
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      if (typeof payload === 'string') {
        state.loading = false;
        state.error = payload;
      }
    });
  },
});

export const selectAuthData = (state: RootState) => state.auth;

export default authSlice.reducer;
