import React, { useState } from 'react';

const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'नमस्ते! TrendNova सपोर्ट में आपका स्वागत है। मैं आपकी क्या मदद कर सकता हूँ?' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. User ka message add karein
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // 2. AI ya Bot ka response simulate karein (Yahan aap API call karenge)
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: 'ai', text: 'धन्यवाद आपके सवाल के लिए! हमारी टीम या AI जल्द ही आपको सही जानकारी देगी।' }
      ]);
    }, 1000);
  };

  return (
    <div className="ai-chat-widget">
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chat-fab-btn" aria-label="Open Chat">
          💬
        </button>
      )}

      {/* Chat Window Box */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>TrendNova AI Support</h3>
            <button onClick={() => setIsOpen(false)} className="close-btn">×</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="chat-footer">
            <input
              type="text"
              placeholder="यहाँ अपना सवाल लिखें..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">भेजें</button>
          </form>
        </div>
      )}

      {/* Styling */}
      <style>{`
        .ai-chat-widget {
          position: fixed;
          bottom: 25px;
          right: 25px;
          z-index: 1000;
          font-family: Inter, sans-serif;
        }
        .chat-fab-btn {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: #db2777;
          color: white;
          border: none;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(219, 39, 119, 0.4);
          transition: transform 0.2s ease;
        }
        .chat-fab-btn:hover {
          transform: scale(1.08);
        }
        .chat-window {
          width: 320px;
          height: 420px;
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .chat-header {
          background: linear-gradient(135deg, #db2777, #be185d);
          color: white;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chat-header h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
        }
        .close-btn {
          background: transparent;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }
        .chat-body {
          flex: 1;
          padding: 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: #f8fafc;
        }
        .chat-bubble {
          max-width: 80%;
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 12.5px;
          line-height: 1.4;
        }
        .chat-bubble.user {
          background: #db2777;
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 2px;
        }
        .chat-bubble.ai {
          background: #e2e8f0;
          color: #0f172a;
          align-self: flex-start;
          border-bottom-left-radius: 2px;
        }
        .chat-footer {
          display: flex;
          padding: 8px;
          background: white;
          border-top: 1px solid #e2e8f0;
        }
        .chat-footer input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 20px;
          outline: none;
          font-size: 12px;
        }
        .chat-footer button {
          background: #db2777;
          color: white;
          border: none;
          padding: 6px 14px;
          margin-left: 6px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default AIChatBox;