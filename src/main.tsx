import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import { Reviews } from './pages/ Reviews';
import { ChoosingComputer } from './pages/ChoosingComputer';
import { CourseById } from './pages/CourseById';
import { Courses } from './pages/Courses';
import { Error404Page } from './pages/Error404';
import { Home } from './pages/Home';
import { Questions } from './pages/Questions';
import { SignInPage } from './pages/SignIn';
import { SignUpPage } from './pages/SignUp';
import { store } from './store/store';
import './index.css';

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
        path: '/questions',
        element: <Questions />,
      },
      {
        path: '/choosing-computer',
        element: <ChoosingComputer />,
      },
      {
        path: '/courses',
        element: <Courses />,
      },
      {
        path: '/courses/:id',
        element: <CourseById />,
      },
      {
        path: '/reviews',
        element: <Reviews />,
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
