import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { LessonInfoType } from '../../types/lesson-info';
import instance from '../../utils/axios';

export const fetchLessonById = createAsyncThunk(
  'fetchLessonById',
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      if (!id) return;

      const { data } = await instance.get<LessonInfoType>(`/lessons/${id}`);
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
