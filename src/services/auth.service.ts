import api from './api';

export type TUserRegister = {
  name: string;
  email: string;
  password: string;
  username: string;
}

export type TUserLogin = {
  email: string;
  password: string;
}

export type TUserResponse = {
  _id: string;
  name: string;
  email: string;
  username: string;
}

export const REGISTER = (body: TUserRegister) => api.post('users', body);

export const LOGIN = (body: TUserLogin) => api.post('users/login', body);
