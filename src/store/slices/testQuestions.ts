import { createSlice } from '@reduxjs/toolkit';
import { getQuestionsByCourseId } from '../apis/testQuestions';

export interface QuestionType {
  id: number;
  description: string;
  options: string[];
  answer: string;
}

interface QuestionSliceState {
  loading: boolean;
  error: string | null;
  questionArray: QuestionType[];
}

const initialState: QuestionSliceState = {
  loading: false,
  error: null,
  questionArray: [],
};

export const questionsSlice = createSlice({
  name: 'testQuestions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getQuestionsByCourseId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getQuestionsByCourseId.fulfilled, (state, { payload }) => {
      if (payload) {
        state.loading = false;
        state.questionArray = payload;
      }
    });
    builder.addCase(getQuestionsByCourseId.rejected, (state, { payload }) => {
      if (typeof payload === 'string') {
        state.loading = false;
        state.error = payload;
      }
    });
  },
});

export default questionsSlice.reducer;
