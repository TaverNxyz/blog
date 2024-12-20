import React from 'react';
import { Settings, Users } from 'lucide-react';

const MOCK_USERS = [
  { id: '1', username: 'TavernKeeper', status: 'online' },
  { id: '2', username: 'Adventurer', status: 'idle' },
];

export const UserPanel: React.FC = () => {
  return (
    <div className="w-60 bg-zinc-900 flex flex-col">
      <div className="h-12 border-b border-zinc-800 flex items-center px-4">
        <Users className="w-5 h-5 text-emerald-400 mr-2" />
        <h2 className="text-white font-medium">Online - {MOCK_USERS.length}</h2>
      </div>
      <div className="flex-1 p-2 space-y-2">
        {MOCK_USERS.map(user => (
          <div
            key={user.id}
            className="flex items-center px-2 py-1 text-zinc-400 hover:text-zinc-100 rounded"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white mr-2">
              {user.username[0]}
            </div>
            <span>{user.username}</span>
          </div>
        ))}
      </div>
      <div className="h-14 border-t border-zinc-800 flex items-center px-4">
        <div className="flex items-center flex-1">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
            T
          </div>
          <span className="ml-2 text-white">TavernKeeper</span>
        </div>
        <button className="text-zinc-400 hover:text-zinc-100">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}