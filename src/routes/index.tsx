import { Suspense, lazy, ComponentType } from 'react';
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { GuestGuard, RequireAuth, RequireAvatar, RequireSociotype, RequireMeta } from '../guards';
import { Spinner } from '../components';
import { personalitiesLoader, personalityLoader } from '@/pages/personalities/Personalities';
import { relationLoader, relationshipLoader } from '@/pages/relationships/Relationships';
import { profileLoader } from '@/pages/user-profile/UserProfile';
import { messagesLoader } from '@/pages/messages/components/ChatMessages';
import { statisticsLoader } from '@/pages/statistics/Statistics';
import { discussionLoader } from '@/pages/discussion/Discussion';
import ErrorPage from '@/pages/error-element';

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

// LAYOUT
const MainLayout = Loadable(lazy(() => import('../layout')));

// MAIN
const Search = Loadable(lazy(() => import('../pages/search')));
const Messages = Loadable(lazy(() => import('../pages/messages')));
const Statistics = Loadable(lazy(() => import('../pages/statistics')));
const Discussions = Loadable(lazy(() => import('../pages/discussions')));
const Discussion = Loadable(lazy(() => import('../pages/discussion')));
const UserProfile = Loadable(lazy(() => import('../pages/user-profile')));

// 16 PERSONALITIES
const PersonalityTest = Loadable(lazy(() => import('../pages/personalityTest')));
const Personalities = Loadable(lazy(() => import('../pages/personalities')));
const Personality = Loadable(lazy(() => import('../pages/personality')));
const Relationships = Loadable(lazy(() => import('../pages/relationships')));
const Relation = Loadable(lazy(() => import('../pages/relation')));

// ACCOUNT
const Account = Loadable(lazy(() => import('../pages/account')));
const Settings = Loadable(lazy(() => import('../pages/settings')));

// AUTH
const Login = Loadable(lazy(() => import('../auth/login')));
const Register = Loadable(lazy(() => import('../auth/register')));
const ResetPassword = Loadable(lazy(() => import('../auth/reset-password')));
const PasswordRecovery = Loadable(lazy(() => import('../auth/password-recovery')));

// REDIRECTS
const NotFound = Loadable(lazy(() => import('../pages/notFound')));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        element: (
          <RequireMeta>
            <Search />
          </RequireMeta>
        ),
        index: true,
      },
      {
        path: 'messages',
        children: [
          {
            element: (
              <RequireMeta>
                <Messages />
              </RequireMeta>
            ),
            index: true,
          },
          {
            path: ':chatId',
            element: <Messages />,
            loader: ({ params }) => messagesLoader(params.chatId),
          },
        ],
      },
      {
        path: 'statistics',
        element: (
          <RequireSociotype>
            <Statistics />
          </RequireSociotype>
        ),
        loader: () => statisticsLoader(),
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'user',
        children: [
          {
            path: ':id',
            element: (
              <RequireAvatar>
                <UserProfile />
              </RequireAvatar>
            ),
            index: true,
            loader: ({ params }) => {
              return profileLoader(params.id);
            },
          },
        ],
      },
      {
        path: 'personalities',
        children: [
          {
            element: <Personalities />,
            index: true,
            loader: () => {
              return personalitiesLoader();
            },
          },
          {
            path: ':name',
            element: <Personality />,
            loader: ({ params }) => personalityLoader(params.name),
          },
          {
            path: 'test',
            element: (
              <RequireMeta>
                <PersonalityTest />
              </RequireMeta>
            ),
          },
        ],
      },
      {
        path: 'relationships',
        children: [
          {
            element: <Relationships />,
            index: true,
            loader: () => relationshipLoader(),
          },
          {
            path: ':name',
            element: <Relation />,
            loader: ({ params }) => relationLoader(params.name),
          },
        ],
      },
      {
        path: 'discussions',
        children: [
          {
            element: (
              <RequireSociotype>
                <Discussions />
              </RequireSociotype>
            ),
            index: true,
          },
          {
            path: ':id',
            element: (
              <RequireSociotype>
                <Discussion />
              </RequireSociotype>
            ),
            loader: ({ params }) => {
              return discussionLoader(params?.id);
            },
          },
        ],
      },
      {
        path: 'password-recovery',
        element: <PasswordRecovery />,
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
    path: 'reset-password',
    element: (
      <GuestGuard>
        <ResetPassword />
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
