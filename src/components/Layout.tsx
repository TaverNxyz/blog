import React from 'react';
import { ServerList } from './ServerList';
import { ChannelList } from './ChannelList';
import { Chat } from './Chat';
import { UserPanel } from './UserPanel';

export const Layout: React.FC = () => {
  return (
    <div className="h-screen flex bg-zinc-900">
      <ServerList />
      <div className="flex flex-1">
        <ChannelList />
        <Chat />
        <UserPanel />
      </div>
    </div>
  );
}