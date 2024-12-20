import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { channelRouter } from './routes/channels';
import { serverRouter } from './routes/servers';
import { setupWebSocket } from './websocket';
import './db/index';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/channels', channelRouter);
app.use('/api/servers', serverRouter);

// WebSocket setup
setupWebSocket(io);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`🍺 Tavern server is running on port ${PORT}`);
});