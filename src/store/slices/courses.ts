import { createSlice } from '@reduxjs/toolkit';

import { CourseInfoType, CourseType } from '../../types/courses';
import { fetchCourseById, fetchCourses } from '../apis/courses';

export interface CoursesSliceState {
  loading: boolean;
  error: string | null;
  courseArray: CourseType[];
  courseById: CourseInfoType | null;
}

const initialState: CoursesSliceState = {
  loading: false,
  error: null,
  courseArray: [],
  courseById: null,
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCourses.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCourses.fulfilled, (state, { payload }) => {
      if (payload) {
        state.loading = false;
        state.courseArray = payload;
      }
    });
    builder.addCase(fetchCourses.rejected, (state, { payload }) => {
      if (typeof payload === 'string') {
        state.loading = false;
        state.error = payload;
      }
    });

    builder.addCase(fetchCourseById.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCourseById.fulfilled, (state, { payload }) => {
      if (payload) {
        state.loading = false;
        state.courseById = payload;
      }
    });
    builder.addCase(fetchCourseById.rejected, (state, { payload }) => {
      if (typeof payload === 'string') {
        state.loading = false;
        state.error = payload;
      }
    });
  },
});

export default coursesSlice.reducer;
