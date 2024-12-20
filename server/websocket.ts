import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './utils/auth';

export const setupWebSocket = (io: Server, prisma: PrismaClient) => {
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = verifyToken(token);
      socket.data.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.data.userId}`);

    socket.on('join_channel', async (channelId: string) => {
      socket.join(channelId);
      
      // Load last 50 messages
      const messages = await prisma.message.findMany({
        where: { channelId },
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: { user: true },
      });
      
      socket.emit('message_history', messages);
    });

    socket.on('send_message', async (data) => {
      const { channelId, content } = data;
      
      const message = await prisma.message.create({
        data: {
          content,
          channelId,
          userId: socket.data.userId,
        },
        include: { user: true },
      });
      
      io.to(channelId).emit('new_message', message);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.data.userId}`);
    });
  });
};