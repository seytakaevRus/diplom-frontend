import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import coursesReducer from './slices/courses';
import lessonsReducer from './slices/lessons';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    lessons: lessonsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
