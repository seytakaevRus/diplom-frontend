import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import { Reviews } from './pages/ Reviews';
import { Error404Page } from './pages/Error404';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import { store } from './store/store';

const routers = createBrowserRouter([
  {
    path: '/reviews',
    element: <Reviews />,
   
  },
  {
    path: '/',
    element: <App />,
    errorElement: <Error404Page />,
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
