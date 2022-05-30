import { useRoutes } from 'react-router-dom';
import Principal from 'pages/Principal';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Principal />,
    },
  ]);
}
