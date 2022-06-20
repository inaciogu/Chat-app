import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Principal />,
    },
    {
      path: 'room/:id',
      element: <Room />,
    },
  ]);
}

const Principal = lazy(() => import('../pages/Principal'));
const Room = lazy(() => import('../pages/Room'));
