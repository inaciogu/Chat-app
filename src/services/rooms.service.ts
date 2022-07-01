import api from './api';

export const GET_ROOMS = () => api.get('rooms');

export const GET_ONE_ROOM = (roomId: string | undefined) => api.get(`rooms/${roomId}`);
