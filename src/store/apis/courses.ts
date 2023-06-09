import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { CourseInfoType, CourseType } from '../../types/courses';
import instance from '../../utils/axios';
import { RootState } from '../store';

export const fetchCourses = createAsyncThunk(
  'fetchCourses',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (state.courses.courseArray.length !== 0) return;

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

export const fetchCourseById = createAsyncThunk(
  'fetchCourseById',
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      if (!id) return;

      const { data } = await instance.get<CourseInfoType>(`/courses/${id}`);
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
