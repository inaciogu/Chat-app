import api from './api';

export type TMessage = {
  room: string;
  author: string | undefined;
  date: string;
  time: string;
  message: string;
}

export const GET_MESSAGES = (roomId: string) => api.get(`messages/${roomId}`);

export const NEW_MESSAGE = (body: TMessage) => api.post('messages', body);
