import { Box } from '@mui/material';
import { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { fetchUser } from './store/apis/auth';
import { useAppDispatch } from './store/hooks';

export const App = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      <Header />
      <Box paddingTop="82px" >
        <Outlet />
      </Box>
    </>
  );
});
