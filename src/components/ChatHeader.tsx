import React from 'react';
import { FaTimes } from "react-icons/fa";
import { SiRobotframework } from "react-icons/si";

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  themeConfig: any;
  isCloseable?: boolean;
  logo?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
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
}) => {
  return (
    <div 
      className={`p-2 ${themeConfig.header} border-b ${themeConfig.border} ${themeConfig.text} ${className}`}
      style={style}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div 
            className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center"
          >
            {logo || <SiRobotframework className="text-white h-4 w-4" />}
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