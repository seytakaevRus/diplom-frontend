
import { memo, useEffect } from 'react';
import Header from './components/Header/Header.component';
import { fetchUser } from './store/apis/auth';
import { useAppDispatch } from './store/hooks';

export const App = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="App">
    <Header/>
      <p>App Component</p>
    </div>
  );
});
