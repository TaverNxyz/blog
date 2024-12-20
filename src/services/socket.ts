import { io, Socket } from 'socket.io-client';
import { useAuth } from '../store';

let socket: Socket | null = null;

export const connectSocket = () => {
  const token = useAuth.getState().token;
  if (!token || socket) return;

  socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
    auth: { token },
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
  });

  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;