import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ReviewsInput } from '../../pages/ Reviews/Reviews.type';
import instance from '../../utils/axios';
import { ReviewType } from '../slices/reviews';
import { RootState } from '../store';

export const createReview = createAsyncThunk(
  'createReview',
  async (
    { courseId, rating, review }: ReviewsInput,
    { getState, rejectWithValue, dispatch },
  ) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.userInfo?.id;

      if (!userId) return;
      if (!courseId) return;

      const requestData = {
        userId,
        courseId,
        rating,
        review,
      };

      await instance.post<ReviewsInput>('/reviews', requestData);
      dispatch(getReviewsByCourseId(courseId));
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

export const getReviewsByCourseId = createAsyncThunk(
  'getReviewsByCourseId',
  async (courseId: string | undefined, { rejectWithValue }) => {
    try {
      if (!courseId) return;

      const { data } = await instance.get<ReviewType[]>(
        `/reviews/by-course/${courseId}`,
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
