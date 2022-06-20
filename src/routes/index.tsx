import LoadingScreen from 'components/loadingScreen';
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
          path: 'room/:id',
          element: <Room />,
        },
      ])}
      ;
    </Suspense>
  );
}

const Principal = lazy(() => import('../pages/Principal'));
const Room = lazy(() => import('../pages/Room'));
