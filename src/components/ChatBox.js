import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ChatBox = ({ chatId, recipient, onClose, messages: propMessages = null }) => {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(propMessages || []);
  const messagesEndRef = useRef(null);

  // Simulate real-time messages (replace with Firebase/WebSocket)
  useEffect(() => {
    // In production, this would listen to Firestore or WebSocket
    const mockMessages = [
      {
        id: '1',
        senderId: 'user1',
        text: 'Hello! I\'m interested in this position.',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: '2',
        senderId: currentUser?.uid || 'current',
        text: 'Great! Would you like to schedule an interview?',
        timestamp: new Date(Date.now() - 1800000),
      },
    ];
    setMessages(mockMessages);
  }, [currentUser, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUser.uid,
      text: message,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // In production, save to Firestore or send via WebSocket
    // await addDoc(collection(db, 'chats', chatId, 'messages'), newMessage);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp instanceof Date ? timestamp : timestamp.toDate();
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col h-[600px] z-50">
      {/* Header */}
      <div className="bg-primary-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{recipient?.name || 'Chat'}</h3>
          <p className="text-sm text-primary-100">{recipient?.email || ''}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white hover:text-primary-200">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isSender = msg.senderId === currentUser?.uid;
            return (
              <div
                key={msg.id}
                className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    isSender
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isSender ? 'text-primary-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 input-field"
          />
          <button
            type="submit"
            className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;

