import { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { fetchUser } from './store/apis/auth';
import { useAppDispatch } from './store/hooks';

export const App = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
});
