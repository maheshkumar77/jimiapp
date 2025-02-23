
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageInput from './MessageInput';

function ChatWindow() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get('http://localhost:5000/messages');
      setMessages(res.data);
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 1000); // fetch new messages every second
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (message) => {
    await axios.post('http://localhost:5000/messages', { message });
    setMessages([...messages, { text: message, sender: 'User' }]);
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <MessageInput onSend={sendMessage} />
    </div>
  );
}

export default ChatWindow;
