import { createSlice } from '@reduxjs/toolkit';

import { LessonInfoType } from '../../types/lesson-info';
import { fetchLessonById } from '../apis/lesson';

interface LessonSliceState {
  loading: boolean;
  error: string | null;
  data: LessonInfoType | null;
  lessonIdsIndex: number;
}

const initialState: LessonSliceState = {
  loading: false,
  error: null,
  data: null,
  lessonIdsIndex: 0,
};

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    goToNextLesson(state) {
      state.lessonIdsIndex += 1;
    },
    goToPreviousLesson(state) {
      state.lessonIdsIndex -= 1;
    },
    goToCertainLesson(state, { payload }) {
      console.log(payload)
      state.lessonIdsIndex = payload;
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
        state.data = payload;
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

export const { goToNextLesson, goToPreviousLesson, goToCertainLesson } = lessonSlice.actions

export default lessonSlice.reducer;
