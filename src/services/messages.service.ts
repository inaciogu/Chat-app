import api from './api';

export type TMessage = {
  room: string | undefined;
  author: string;
  message: string;
  date: string;
  time: string;
}

export const GET_MESSAGES = (roomId: string) => api.get(`/messages/${roomId}`);

export const NEW_MESSAGE = (body: TMessage) => api.post('/messages', body);
