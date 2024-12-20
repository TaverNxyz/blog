import React from 'react';
import { Hash, Volume2 } from 'lucide-react';

const MOCK_CHANNELS = [
  { id: '1', name: 'welcome', type: 'text' },
  { id: '2', name: 'general', type: 'text' },
  { id: '3', name: 'Gaming Room', type: 'voice' },
];

export const ChannelList: React.FC = () => {
  return (
    <div className="w-60 bg-zinc-900 flex flex-col">
      <div className="h-12 border-b border-zinc-800 flex items-center px-4">
        <h2 className="text-white font-medium">Tavern Hub</h2>
      </div>
      <div className="flex-1 p-2 space-y-2">
        {MOCK_CHANNELS.map(channel => (
          <div
            key={channel.id}
            className="flex items-center px-2 py-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded cursor-pointer"
          >
            {channel.type === 'text' ? (
              <Hash className="w-5 h-5 mr-2" />
            ) : (
              <Volume2 className="w-5 h-5 mr-2" />
            )}
            <span>{channel.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}