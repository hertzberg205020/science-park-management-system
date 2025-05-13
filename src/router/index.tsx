import RequireAuth from '@/utils/RequireAuth';
import React from 'react';
import { createBrowserRouter } from 'react-router';


const Home = React.lazy(() => import('../pages/home'));
const Login = React.lazy(() => import('../pages/login'));
const NotFound = React.lazy(() => import('../pages/notFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth allowAnonymous={false} redirectPath="/login">
        <Home />
      </RequireAuth>)
  },
  {
    path: '/login',
    element: (
      <RequireAuth allowAnonymous={true} redirectPath="/">
        <Login />
      </RequireAuth>),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
