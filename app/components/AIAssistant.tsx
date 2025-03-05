'use client';

import React, { useState } from 'react';

type Message = {
  role: string;
  content: string;
  isTyping?: boolean;
};

interface AIAssistantProps {
  challenge: { title: string };
}

const AIAssistant = ({ challenge }: AIAssistantProps) => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello! I'm your AI coding assistant. I can help you with the "${challenge.title}" challenge. How can I assist you today?` },
  ]);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: prompt }];
    setMessages(newMessages);
    setGenerating(true);

    try {
      setMessages([...newMessages, { role: 'assistant', content: '...', isTyping: true }]);
      setTimeout(() => {
        setMessages([...newMessages, { role: 'assistant', content: 'Here’s my response!' }]);
        setGenerating(false);
        setPrompt('');
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, an error occurred.' }]);
      setGenerating(false);
    }
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          {message.isTyping ? <span>Typing...</span> : <span>{message.content}</span>}
        </div>
      ))}
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendPrompt()}
        placeholder="Ask for help..."
        disabled={generating}
      />
      <button onClick={handleSendPrompt} disabled={generating}>
        Send
      </button>
    </div>
  );
};

export default AIAssistant;