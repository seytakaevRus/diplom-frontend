import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import { Courses } from './pages/Courses';
import { Error404Page } from './pages/Error404';
import { Home } from './pages/Home';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import { store } from './store/store';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error404Page />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/courses',
        element: <Courses />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>
  </StrictMode>,
);
