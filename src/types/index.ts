export interface User {
  id: string;
  username: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  avatar?: string;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  timestamp: number;
  channelId: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  serverId: string;
}

export interface Server {
  id: string;
  name: string;
  icon?: string;
  ownerId: string;
  channels: Channel[];
}