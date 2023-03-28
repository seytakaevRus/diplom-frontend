import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { CourseType } from '../../types/courses';
import instance from '../../utils/axios';

export const fetchCourses = createAsyncThunk(
  'courses',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get<CourseType[]>('/courses');
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
