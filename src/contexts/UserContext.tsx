import {
  createContext, ReactNode, useEffect, useReducer, useState,
} from 'react';
import {
  LOGIN,
  REGISTER, TUserLogin, TUserRegister, TUserResponse,
} from 'services/auth.service';
import { GET_ROOMS } from 'services/rooms.service';
import * as io from 'socket.io-client';
import isValidToken from 'utils/jwt';
import {
  EActionTypes,
  TAuthAction, TAuthState, TUser,
} from '../@types/auth';

export interface IRoom {
  _id: string;
  name: string;
}

type TUserContext = {
  user: TUser;
  isAuthenticated: boolean;
  isInitialized: boolean;
  username: string;
  socket: io.Socket;
  handleUsername: (username: string) => void;
  login: (body: TUserLogin) => void;
  registration: (body: TUserRegister) => void;
  logout: () => void;
  handleUser: (currentUser: TUser) => void;
  rooms: IRoom[]
}

interface IUserProvider {
  children: ReactNode
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

export const UserContext = createContext({} as TUserContext);

const socket = io.connect(process.env.REACT_APP_API_URL || '', { reconnection: true, transports: ['websocket'] });

export default function UserProvider({ children }: IUserProvider) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [username, setUsername] = useState<string>('');
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const handleUsername = (value: string) => {
    setUsername(value);
  };

  const handleUser = (currentUser: TUser) => {
    dispatch({
      type: EActionTypes.Login,
      payload: {
        ...state,
        user: currentUser,
      },
    });

    localStorage.setItem('user', JSON.stringify(currentUser));
  };

  const registration = async (body: TUserRegister) => {
    const { data } = await REGISTER(body);
    const { user, token } = data;

    handleUser(user);
    localStorage.setItem('token', JSON.stringify(token));
  };

  const login = async (body: TUserLogin) => {
    const { data } = await LOGIN(body);
    const { user, token } = data;

    handleUser(user);
    localStorage.setItem('token', JSON.stringify(token));
  };

  const logout = () => {
    dispatch({
      type: EActionTypes.Logout,
      payload: {
        ...state,
        isAuthenticated: false,
        user: null,
      },
    });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const getStoredUser = () => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser;
    }
    return null;
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

  useEffect(() => {
    const initialization = () => {
      const token = localStorage.getItem('token');

      if (token && isValidToken(token)) {
        const user = getStoredUser();
        dispatch({
          type: EActionTypes.Initial,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: EActionTypes.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialization();
  }, []);

  return (
    <UserContext.Provider value={{
      handleUsername, ...state, username, socket, rooms, login, registration, logout, handleUser,
    }}
    >
      {children}
    </UserContext.Provider>
  );
}
