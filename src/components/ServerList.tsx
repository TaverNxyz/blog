import React from 'react';
import { Beer } from 'lucide-react';

const MOCK_SERVERS = [
  { id: '1', name: 'Tavern Hub', icon: null },
  { id: '2', name: 'Gaming Zone', icon: null },
];

export const ServerList: React.FC = () => {
  return (
    <div className="w-18 bg-zinc-950 flex flex-col items-center py-3 space-y-2">
      <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center hover:bg-emerald-500 transition-colors cursor-pointer">
        <Beer className="w-7 h-7 text-white" />
      </div>
      <div className="w-8 bg-zinc-800/50 h-[2px] rounded-lg mx-auto" />
      {MOCK_SERVERS.map(server => (
        <div
          key={server.id}
          className="w-12 h-12 bg-zinc-800 rounded-[24px] hover:rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white"
        >
          {server.name[0]}
        </div>
      ))}
    </div>
  );
}