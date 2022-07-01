import { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';

export default function useAccount() {
  const context = useContext(UserContext);

  if (!context) throw new Error('User context must be inside user provider');

  return context;
}
