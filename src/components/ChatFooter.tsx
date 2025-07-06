import React, { useRef } from 'react';
import { FaPaperPlane } from "react-icons/fa";

interface ChatFooterProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: () => void;
  loading: boolean;
  placeholder: string;
  themeConfig: any;
  useTextarea?: boolean;
  className?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  customSendButton?: React.ReactNode;
  showSendButton?: boolean;
  autofocus?: boolean;
}

const ChatFooter: React.FC<ChatFooterProps> = ({
  input,
  setInput,
  handleSendMessage,
  loading,
  placeholder,
  themeConfig,
  useTextarea = false,
  className = '',
  style,
  inputStyle,
  buttonStyle,
  customSendButton,
  showSendButton = true,
  autofocus = true,
}) => {
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  // Get input classes
  const getInputClasses = () => {
    if (useTextarea) {
      return `w-full resize-none p-2 text-base outline-none flex-grow ${
        themeConfig.input.replace(/bg-.*?(\s|$)/g, '')
      }`;
    } else {
      return `w-full p-2 text-base outline-none flex-grow rounded-lg h-8 ${
        themeConfig.input.replace(/bg-.*?(\s|$)/g, '')
      }`;
    }
  };

  // Get send button classes
  const getSendButtonClasses = () => {
    const baseClasses = `flex justify-center items-center w-8 h-6 transition-colors cursor-pointer ${themeConfig.buttonHover} ${
      useTextarea ? 'h-8 rounded-lg' : 'rounded-2xl h-full'
    }`;
    
    if (!input.trim() && !loading) {
      return `${baseClasses} ${themeConfig.primary} opacity-50 cursor-not-allowed`;
    } else if (loading) {
      return `${baseClasses} bg-red-600 hover:bg-red-700`;
    } else {
      return `${baseClasses} ${themeConfig.primary} hover:opacity-90`;
    }
  };

  return (
    <div 
      className={`p-2 ${themeConfig.footer} border-t ${themeConfig.border} ${className}`}
      style={style}
    >
      <div 
        className={`flex ${useTextarea ? 'rounded-lg p-2 pb-1 flex-col' : 'rounded-2xl flex-row w-full'} border ${themeConfig.border} ${className} overflow-hidden`}
      >
        <div className={`flex ${useTextarea ? 'items-end' : 'items-center gap-2 w-full p-1'} justify-between relative`}>
          {useTextarea ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={loading ? "AI is responding..." : placeholder}
              className={getInputClasses()}
              style={{ 
                color: themeConfig.inputText.replace('text-', ''),
                minHeight: '50px',
                maxHeight: '120px',
                ...inputStyle
              }}
              rows={3}
              disabled={loading}
              autoFocus={autofocus}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={loading ? "AI is responding..." : placeholder}
              className={getInputClasses()}
              style={{ 
                color: themeConfig.inputText.replace('text-', ''),
                ...inputStyle
              }}
              disabled={loading}
              autoFocus={autofocus}
            />
          )}
          
          {showSendButton && (
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className={getSendButtonClasses()}
              aria-label="Send message"
              style={buttonStyle}
            >
              {customSendButton || (
                loading ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="6" width="12" height="12"></rect>
                  </svg>
                ) : (
                  <FaPaperPlane className={`h-4 w-4 ${themeConfig.icon}`} />
                )
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatFooter; 