import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import instance from "../../utils/axios";
import { QuestionType } from "../slices/testQuestions";

export const getQuestionsByCourseId = createAsyncThunk(
    'getQuestionsByCourseId',
    async (courseId: string | undefined, { rejectWithValue }) => {
      try {
        if (!courseId) return;
  
        const { data } = await instance.get<QuestionType[]>(
          `/test-questions/by-course/${courseId}`,
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