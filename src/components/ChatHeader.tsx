import React from 'react';
import { FaTimes } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  themeConfig: any;
  isCloseable?: boolean;
  logo?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  positionType?: String;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  subtitle,
  onClose,
  themeConfig,
  isCloseable = true,
  logo,
  className = '',
  style,
  positionType,
}) => {
  return (
    <div 
      className={`p-2 ${themeConfig.header} border-b ${themeConfig.border} ${themeConfig.text} ${className}`}
      style={style}
    >
      <div className={`flex items-center justify-between ${positionType === 'fullscreen' ? 'max-w-3xl mx-auto' : 'w-full'}`}>
        <div className="flex items-center space-x-2">
          <div 
            className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            {logo || <FiMessageSquare className="text-black h-4 w-4" />}
          </div>
          <div>
            <h2 
              className="font-bold text-lg leading-tight"
            >
              {title}
            </h2>
            {subtitle && (
              <p 
                className={`text-xs ${themeConfig.secondaryText}`}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          {isCloseable && onClose && (
            <button 
              onClick={onClose} 
              className={`p-1.5 rounded-full hover:bg-opacity-20 hover:bg-gray-700 transition-colors cursor-pointer text-gray-200 outline-none ${themeConfig.primary}`}
              aria-label="Close"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader; 