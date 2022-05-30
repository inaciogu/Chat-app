import { useRoutes } from 'react-router-dom';
import Principal from 'pages/Principal';
import Room from 'pages/Room';

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
