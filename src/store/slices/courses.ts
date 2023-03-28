import { createSlice } from '@reduxjs/toolkit';

import { CourseType } from '../../types/courses';
import { fetchCourses } from '../apis/courses';

export interface CoursesSliceState {
  loading: boolean;
  error: null | string;
  courses: CourseType[];
}

const initialState: CoursesSliceState = {
  loading: false,
  error: null,
  courses: [],
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
        state.courses = payload;
      }
    });
    builder.addCase(fetchCourses.rejected, (state, { payload }) => {
      if (typeof payload === 'string') {
        state.loading = false;
        state.error = payload;
      }
    });
  },
});

export default coursesSlice.reducer;
