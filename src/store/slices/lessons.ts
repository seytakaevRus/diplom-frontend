import { createSlice } from '@reduxjs/toolkit';

import { LessonInfoType } from '../../types/lesson-info';
import { fetchLessonById } from '../apis/lessons';

export interface LessonsSliceState {
  loading: boolean;
  error: string | null;
  lessonById: LessonInfoType | null;
  currentLessonIndex: number;
}

const initialState: LessonsSliceState = {
  loading: false,
  error: null,
  lessonById: null,
  currentLessonIndex: 0,
};

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    goToNextLesson(state) {
      state.currentLessonIndex += 1;
    },
    goToPreviousLesson(state) {
      state.currentLessonIndex -= 1;
    },
    goToCertainLesson(state, { payload }) {
      state.currentLessonIndex = payload - 1;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchLessonById.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLessonById.fulfilled, (state, { payload }) => {
      if (payload) {
        state.loading = false;
        state.lessonById = payload;
      }
    });
    builder.addCase(fetchLessonById.rejected, (state, { payload }) => {
      if (typeof payload === 'string') {
        state.loading = false;
        state.error = payload;
      }
    });
  },
});

export const { goToNextLesson, goToPreviousLesson, goToCertainLesson } = lessonsSlice.actions

export default lessonsSlice.reducer;
