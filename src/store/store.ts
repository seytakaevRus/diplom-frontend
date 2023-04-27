import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import coursesReducer from './slices/courses';
import lessonReducer from './slices/lesson';
import reviewsReducer from './slices/reviews';
import testQuestionsReducer from './slices/testQuestions';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    lesson: lessonReducer,
    reviews: reviewsReducer,
    testQuestions: testQuestionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
