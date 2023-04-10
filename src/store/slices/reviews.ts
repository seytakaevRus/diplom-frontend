import { createSlice } from '@reduxjs/toolkit';

import { createReview, getReviewsByCourseId } from '../apis/reviews';

export interface ReviewType {
  id: number;
  rating: number;
  courseId: number;
  review: string;
  userFullName: string;
}

interface ReviewsSliceState {
  loading: boolean;
  error: string | null;
  reviewArray: ReviewType[];
}

const initialState: ReviewsSliceState = {
  loading: false,
  error: null,
  reviewArray: [],
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createReview.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createReview.fulfilled, (state, { payload }) => {
      if (payload) {
        state.loading = false;
      }
    });
    builder.addCase(createReview.rejected, (state, { payload }) => {
      if (typeof payload === 'string') {
        state.loading = false;
        state.error = payload;
      }
    });

    builder.addCase(getReviewsByCourseId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getReviewsByCourseId.fulfilled, (state, { payload }) => {
      if (payload) {
        state.loading = false;
        state.reviewArray = payload;
      }
    });
    builder.addCase(getReviewsByCourseId.rejected, (state, { payload }) => {
      if (typeof payload === 'string') {
        state.loading = false;
        state.error = payload;
      }
    });
  },
});

export default reviewsSlice.reducer;
