import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { SignInInput } from '../../pages/SignIn/SignIn.type';
import { SignUpInput } from '../../pages/SignUp/SignUp.type';
import { UserInfoType } from '../../types/user-info';
import instance from '../../utils/axios';

export const registerUser = createAsyncThunk(
  'auth/sign-up',
  async (input: SignUpInput, { rejectWithValue }) => {
    try {
      const { data } = await instance.post<UserInfoType>(
        '/auth/sign-up',
        input,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/sign-in',
  async (input: SignInInput, { rejectWithValue }) => {
    try {
      const { data } = await instance.post<UserInfoType>(
        '/auth/sign-in',
        input,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  },
);

export const fetchUser = createAsyncThunk(
  'auth/whoami',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get<UserInfoType>('/auth/whoami');
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        if (error.response?.status === 400) {
          const redirectURL = `${window.location.href}sign-in`;
          window.open(redirectURL, '_self');
        } else {
          if (error.response?.data) {
            return rejectWithValue(error.response.data);
          } else {
            return rejectWithValue(error.message);
          }
        }
      }
    }
  },
);

// TODO: Выпилить комментарий, когда сделаю логаут юзера
// export const logoutUser = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(logoutStart());
//     const { data } = await api.get('auth/logout');

//     if ('redirectURL' in data) {
//       window.open(data.redirectURL, '_self');
//     } else {
//       console.error('redirectURL is not defined');
//       dispatch(logoutError('redirectURL is not defined'));
//     }
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       dispatch(logoutError(error.message));
//     }
//   }
// };
