import { Suspense, lazy, ComponentType } from 'react';
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { AuthGuard, GuestGuard } from '../guards';
import { Spinner } from '../components';

type AnyProps = {
  [key: string]: any;
};
// eslint-disable-next-line react/display-name
const Loadable = (Component: ComponentType) => (props: AnyProps) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );
};

const MainLayout = Loadable(lazy(() => import('../layout')));

const Page1 = Loadable(lazy(() => import('../pages/page1')));
const Page2 = Loadable(lazy(() => import('../pages/page2')));
const Page3 = Loadable(lazy(() => import('../pages/page3')));

const Login = Loadable(lazy(() => import('../auth/login')));
const Register = Loadable(lazy(() => import('../auth/register')));

const NotFound = Loadable(lazy(() => import('../pages/notFound')));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      { element: <Page1 />, index: true },
      {
        path: 'page2',
        element: <Page2 />,
      },
      {
        path: 'page3',
        element: <Page3 />,
      },
    ],
  },

  {
    path: 'login',
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: 'register',
    element: (
      <GuestGuard>
        <Register />
      </GuestGuard>
    ),
  },
  {
    path: '404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to='404' replace />,
  },
] as RouteObject[]);
