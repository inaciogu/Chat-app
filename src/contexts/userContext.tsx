import {
  createContext, ReactNode, useState, useEffect,
} from 'react';
import * as io from 'socket.io-client';

type TUserContext = {
  username: string;
  currentSocket: io.Socket;
  handleUsername: (username: string) => void;
}

interface IUserProvider {
  children: ReactNode
}

export const userContext = createContext({} as TUserContext);

export default function UserProvider({ children }: IUserProvider) {
  const [username, setUsername] = useState<string>('');
  const [currentSocket, setCurrentSocket] = useState<io.Socket>({} as io.Socket);

  const handleUsername = (value: string) => {
    setUsername(value);
  };

  useEffect(() => {
    const socket = io.connect('http://localhost:3001');
    setCurrentSocket(socket);
  }, []);

  return (
    <userContext.Provider value={{ handleUsername, username, currentSocket }}>
      {children}
    </userContext.Provider>
  );
}
