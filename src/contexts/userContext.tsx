import {
  useMemo,
  createContext, ReactNode, useState,
} from 'react';

type TUserContext = {
  username: string;
  handleUsername: (username: string) => void;
}

interface IUserProvider {
  children: ReactNode
}

export const userContext = createContext({} as TUserContext);

export default function UserProvider({ children }: IUserProvider) {
  const [username, setUsername] = useState<string>('');

  const handleUsername = (value: string) => {
    setUsername(value);
  };

  const value = useMemo(() => ({
    username,
    handleUsername,
  }), [username]);

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
}
