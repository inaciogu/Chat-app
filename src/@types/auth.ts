import { TUserResponse } from 'services/auth.service';

export type TUser = TUserResponse | null;

export enum EActionTypes {
  Initial = 'INITIAL',
  Login = 'LOGIN',
  Logout = 'LOGOUT'
}

export type TAuthAction = {
  type: EActionTypes.Initial | EActionTypes.Login | EActionTypes.Logout;
  payload: {
    isAuthenticated: boolean;
    user: TUser
  }
}

export type TAuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: TUser | null;
}
