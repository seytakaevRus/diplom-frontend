import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import { Reviews } from './pages/ Reviews';
import { ChoosingComputer } from './pages/ChoosingComputer';
import { Error404Page } from './pages/Error404';
import { Questions } from './pages/Questions';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import { store } from './store/store';

const routers = createBrowserRouter([
  {
    path:'/questions',
    element:<Questions />
  },
  {
    path: '/choosingComputer',
    element: <ChoosingComputer />,
  },
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
