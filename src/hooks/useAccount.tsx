import { useContext } from 'react';
import { userContext } from 'contexts/UserContext';

export default function useAccount() {
  const context = useContext(userContext);

  if (!context) throw new Error('User context must be inside user provider');

  return context;
}
