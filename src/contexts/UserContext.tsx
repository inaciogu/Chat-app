import {
  Gamepad, Help, MeetingRoom,
  SvgIconComponent,
  WorkOff,
} from '@mui/icons-material';
import {
  createContext, ReactNode, useState,
} from 'react';
import * as io from 'socket.io-client';

interface IRoom {
  id: number;
  name: string;
  icon: ReactNode;
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

const INITIAL_ROOMS = [
  {
    id: 1,
    name: 'Games',
    icon: <Gamepad />,
  },
  {
    id: 2,
    name: 'Work',
    icon: <WorkOff />,
  },
  {
    id: 3,
    name: 'Help',
    icon: <Help />,
  },
  {
    id: 4,
    name: 'Meeting',
    icon: <MeetingRoom />,
  },
];

export const userContext = createContext({} as TUserContext);

const socket = io.connect('https://socket-chatapi.herokuapp.com/', { reconnection: false, transports: ['websocket'] });

export default function UserProvider({ children }: IUserProvider) {
  const [username, setUsername] = useState<string>('');
  const [rooms, setRooms] = useState<IRoom[]>(INITIAL_ROOMS);

  const handleUsername = (value: string) => {
    setUsername(value);
  };

  return (
    <userContext.Provider value={{
      handleUsername, username, socket, rooms,
    }}
    >
      {children}
    </userContext.Provider>
  );
}
