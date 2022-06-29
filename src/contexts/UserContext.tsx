import {
  createContext, ReactNode, useEffect, useReducer, useState,
} from 'react';
import { LOGIN, TUserLogin, TUserRegister } from 'services/auth.service';
import { GET_ROOMS } from 'services/rooms.service';
import * as io from 'socket.io-client';

export interface IRoom {
  _id: string;
  name: string;
}

type TUserContext = {
  username: string;
  socket: io.Socket;
  handleUsername: (username: string) => void;
  rooms: IRoom[]
}

export type TUser = Omit<TUserRegister, 'password'>;

interface IUserProvider {
  children: ReactNode
}

enum EActionTypes {
  Initial = 'INITIAL',
  Login = 'LOGIN',
  Logout = 'LOGOUT'
}

type TAuthAction = {
  type: EActionTypes;
  payload: {
    isAuthenticated: boolean;
    user: TUser
  }
}

type TAuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: TUser | null;
}

const initialState: TAuthState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const authReducer = (state: TAuthState, action: TAuthAction) => {
  switch (action.type) {
    case EActionTypes.Initial:
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case EActionTypes.Login:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case EActionTypes.Logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export const userContext = createContext({} as TUserContext);

const socket = io.connect(process.env.REACT_APP_API_URL || '', { reconnection: true, transports: ['websocket'] });

export default function UserProvider({ children }: IUserProvider) {
  const [state, dispatch] = useReducer(authReducer, initialState);
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

  /* const login = async (body: TUserLogin) => {
    const { data } = await LOGIN(body);
  } */

  return (
    <userContext.Provider value={{
      handleUsername, username, socket, rooms,
    }}
    >
      {children}
    </userContext.Provider>
  );
}
