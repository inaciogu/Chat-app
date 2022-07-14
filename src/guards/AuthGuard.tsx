import useAccount from 'hooks/useAccount';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface IAuthGuard {
  children: ReactElement;
}

export default function AuthGuard({ children }: IAuthGuard) {
  const { isAuthenticated } = useAccount();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}
