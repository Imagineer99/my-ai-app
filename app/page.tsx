'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [showLabel, setShowLabel] = useState(true);
  const [showTitle, setShowTitle] = useState(true);

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowLabel(false);
      setShowTitle(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col items-center">
      <h1
        className={`text-2xl font-bold mb-4 transition-opacity duration-500 ease-in-out ${
          showTitle ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Mixtral MoE Chat
      </h1>

      {messages.map((m) => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          <span
            className={`${
              showLabel ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-500 ease-in-out`}
          >
            Say something...
          </span>
          <input
            className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
