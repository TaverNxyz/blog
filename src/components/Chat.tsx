import React, { useState } from 'react';
import { Send } from 'lucide-react';

const MOCK_MESSAGES = [
  {
    id: '1',
    content: 'Welcome to Tavern! 🍺',
    userId: '1',
    username: 'TavernKeeper',
    timestamp: Date.now() - 1000 * 60 * 5,
  },
];

export const Chat: React.FC = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="flex-1 bg-zinc-800 flex flex-col">
      <div className="h-12 border-b border-zinc-700 flex items-center px-4">
        <span className="text-white font-medium">general</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {MOCK_MESSAGES.map(msg => (
          <div key={msg.id} className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
              {msg.username[0]}
            </div>
            <div className="ml-3">
              <div className="flex items-baseline">
                <span className="text-emerald-400 font-medium">{msg.username}</span>
                <span className="ml-2 text-xs text-zinc-400">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-zinc-100">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <div className="flex items-center bg-zinc-700 rounded-lg px-4 py-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white placeholder-zinc-400"
            placeholder="Send a message..."
          />
          <button className="ml-2 text-emerald-400 hover:text-emerald-300">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}