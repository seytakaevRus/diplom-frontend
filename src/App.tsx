import { Box } from '@mui/material';
import { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { fetchUser } from './store/apis/auth';
import { fetchCourses } from './store/apis/courses';
import { useAppDispatch } from './store/hooks';

export const App = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCourses());
  }, []);

  return (
    <>
      <Header />
      <Box paddingTop="82px" height="100%" display="grid" alignItems="center">
        <Outlet />
      </Box>
    </>
  );
});
