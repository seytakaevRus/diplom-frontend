import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import coursesReducer from './slices/courses';
import lessonReducer from './slices/lesson';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    lesson: lessonReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
