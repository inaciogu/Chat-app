import {
  Gamepad, Help, MeetingRoom,
  Work,
} from '@mui/icons-material';
import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import { GET_ROOMS } from 'services/rooms.service';
import * as io from 'socket.io-client';

export interface IRoom {
  _id: number;
  name: string;
}

type TUserContext = {
  username: string;
  socket: io.Socket;
  handleUsername: (username: string) => void;
  rooms: IRoom[]
}

interface IUserProvider {
  children: ReactNode
}

export const userContext = createContext({} as TUserContext);

const socket = io.connect('https://socket-chatapi.herokuapp.com/', { reconnection: false, transports: ['websocket'] });

export default function UserProvider({ children }: IUserProvider) {
  const [username, setUsername] = useState<string>('');
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const handleUsername = (value: string) => {
    setUsername(value);
  };

  useEffect(() => {
    const getAvailableRooms = async () => {
      try {
        const { data } = await GET_ROOMS();
        setRooms(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getAvailableRooms();
  }, []);

  return (
    <userContext.Provider value={{
      handleUsername, username, socket, rooms,
    }}
    >
      {children}
    </userContext.Provider>
  );
}
