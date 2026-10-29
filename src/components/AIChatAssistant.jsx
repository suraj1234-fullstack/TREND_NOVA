import React, { useState, useEffect } from 'react';

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hey I am Your TrendNova Assistance' }
  ]);
  const [inputVal, setInputVal] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = 
        document.body.classList.contains('dark') || 
        document.documentElement.classList.contains('dark') ||
        document.body.style.backgroundColor === 'rgb(15, 23, 42)' ||
        document.body.style.backgroundColor === '#0f172a';
      setIsDarkMode(isDark);
    };

    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: inputVal }];
    setMessages(newMsgs);
    setInputVal('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Under Development' }
      ]);
    }, 1000);
  };

  return (
    <div className={`ai-assistant-wrapper ${isDarkMode ? 'dark-theme' : ''}`}>
      {/* Floating Robot Button tucked inside the right edge */}
      {!isOpen && (
        <div className="ai-float-trigger" onClick={() => setIsOpen(true)}>
          {showBubble && (
            <div className="ai-speech-bubble">Welcome to TrendNova </div>
          )}
          <div className="ai-robot-icon"><i class="fa-regular fa-comment-dots"></i></div>
        </div>
      )}

      {/* Chat Box Popup Window properly aligned */}
      {isOpen && (
        <div className="ai-chat-box">
          <div className="ai-chat-header">
            <div className="ai-header-title">
              TrendNova AI Help
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="ai-chat-body">
            {messages.map((m, idx) => (
              <div key={idx} className={`ai-msg ${m.sender}`}>
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="ai-chat-footer">
            <input
              type="text"
              placeholder="Search Topic ......"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}

      <style>{`
        .ai-assistant-wrapper {
          position: fixed;
          top: 75%;
          right: 0;
          transform: translateY(-50%);
          z-index: 9999;
          font-family: Inter, sans-serif;
          background: transparent !important; /* Wrapper ka background poori tarah transparent kar diya hai */
        }

        /* LIGHT MODE FLOATING TRIGGER */
        .ai-float-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.95);
          padding: 6px 6px 6px 14px;
          border-top-left-radius: 999px;
          border-bottom-left-radius: 999px;
          box-shadow: -4px 4px 20px rgba(0, 0, 0, 0.15);
          border: 1px solid #a5a0a3;
          border-right: none;
          margin-right: -8px; 
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }
        .ai-float-trigger:hover {
          background: #fff;
          transform: translateX(-4px);
        }

        /* DARK MODE FLOATING TRIGGER */
        .dark-theme .ai-float-trigger {
          background: rgba(30, 41, 59, 0.95);
          border-color: rgba(244, 114, 182, 0.4);
          box-shadow: -4px 4px 20px rgba(0, 0, 0, 0.4);
        }
        .dark-theme .ai-float-trigger:hover {
          background: #1e293b;
        }

        .ai-speech-bubble {
          color: #070607;
        
         
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        
        }
        
        .ai-robot-icon {
          width: 44px;
          height: 44px;
          
         
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .dark-theme .ai-robot-icon {
          border-color: #f472b6;
        }

        /* LIGHT MODE CHAT BOX */
        .ai-chat-box {
          position: absolute;
          right: 15px;
          bottom: -100px;
          width: 320px;
          height: 420px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          animation: popUp 0.25s ease-out;
          transition: background 0.25s ease, border-color 0.25s ease;
        }

        /* DARK MODE CHAT BOX */
        .dark-theme .ai-chat-box {
          background: #0f172a;
          border-color: #334155;
          box-shadow: 0 10px 35px rgba(0,0,0,0.6);
        }

        @keyframes popUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .ai-chat-header {
          background: linear-gradient(135deg, #db2777, #be185d);
          color: #fff;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .dark-theme .ai-chat-header {
          background: linear-gradient(135deg, #be185d, #9d174d);
        }

        .ai-header-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
        }
        .ai-close-btn {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
        }

        /* BODY CHAT MESSAGES */
        .ai-chat-body {
          flex: 1;
          padding: 14px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #f8fafc;
          transition: background 0.25s ease;
        }
        .dark-theme .ai-chat-body {
          background: #1e293b;
        }

        .ai-msg {
          max-width: 80%;
          padding: 9px 12px;
          border-radius: 10px;
          font-size: 12.5px;
          line-height: 1.4;
        }

        /* AI MESSAGE BUBBLE */
        .ai-msg.ai {
          background: #fff;
          color: #334155;
          align-self: flex-start;
          border: 1px solid #e2e8f0;
        }
        .dark-theme .ai-msg.ai {
          background: #0f172a;
          color: #f1f5f9;
          border-color: #334155;
        }

        /* USER MESSAGE BUBBLE */
        .ai-msg.user {
          background: #db2777;
          color: #030303;
          align-self: flex-end;
        }

        /* FOOTER & INPUT FIELD */
        .ai-chat-footer {
          display: flex;
          padding: 10px;
          background: #fff;
          
          gap: 8px;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .dark-theme .ai-chat-footer {
          background: #0f172a;
          border-top-color: #334155;
        }

        .ai-chat-footer input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          font-size: 12px;
          background: #fff;
          color: #0f172a;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }
        .dark-theme .ai-chat-footer input {
          background: #1e293b;
          border-color: #475569;
          color: #f8fafc;
        }
        .dark-theme .ai-chat-footer input::placeholder {
          color: #94a3b8;
        }

        .ai-chat-footer button {
          padding: 8px 14px;
          background: #db2777;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default AIChatAssistant;