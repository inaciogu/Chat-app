import LoadingScreen from 'components/loadingScreen';
import AuthGuard from 'guards/AuthGuard';
import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

export default function Router() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      {useRoutes([
        {
          path: '/',
          element: <Principal />,
        },
        {
          path: 'registration',
          element: <Registration />,
        },
        {
          path: 'room/:id',
          element: (
            <AuthGuard>
              <Room />
            </AuthGuard>
          ),
        },
      ])}
    </Suspense>
  );
}

const Principal = lazy(() => import('../pages/Principal'));
const Room = lazy(() => import('../pages/Room'));
const Registration = lazy(() => import('../pages/Registration'));
