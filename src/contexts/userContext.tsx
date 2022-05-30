import {
  createContext, ReactNode, useState, useEffect,
} from 'react';
import * as io from 'socket.io-client';

type TUserContext = {
  username: string;
  socket: io.Socket;
  handleUsername: (username: string) => void;
}

interface IUserProvider {
  children: ReactNode
}

export const userContext = createContext({} as TUserContext);

const socket = io.connect('http://192.168.0.103:3001', { reconnection: false });

export default function UserProvider({ children }: IUserProvider) {
  const [username, setUsername] = useState<string>('');

  const handleUsername = (value: string) => {
    setUsername(value);
  };

  return (
    <userContext.Provider value={{ handleUsername, username, socket }}>
      {children}
    </userContext.Provider>
  );
}
