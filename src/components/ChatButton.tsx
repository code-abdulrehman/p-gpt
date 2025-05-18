import React, { forwardRef } from 'react';
import { FaTimes } from "react-icons/fa";
import { SiRobotframework } from "react-icons/si";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  buttonSize?: 'small' | 'medium' | 'large';
  buttonStyle?: 'circle' | 'rounded' | 'square' | 'sharp' | 'pill';
  themeConfig: any;
  logo?: React.ReactNode;
  showLabel?: boolean;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ChatButton = forwardRef<HTMLButtonElement, ChatButtonProps>(({
  isOpen,
  onClick,
  onMouseEnter,
  onMouseLeave,
  buttonSize = 'medium',
  buttonStyle = 'circle',
  themeConfig,
  logo,
  showLabel = false,
  label = 'Chat',
  className = '',
  style = {},
}, ref) => {
  // Size classes map
  const sizeClasses = {
    'small': 'h-10 w-10 text-sm',
    'medium': 'h-12 w-12 text-base',
    'large': 'h-14 w-14 text-lg',
  };

  // Get button shape classes
  const getShapeClasses = () => {
    switch (buttonStyle) {
      case 'rounded':
        return 'rounded-xl';
      case 'square':
        return 'rounded-md';
      case 'pill':
        return showLabel ? 'rounded-full px-4' : 'rounded-full';
      case 'sharp':
        return 'rounded-none';
      default:
        return 'rounded-full';
    }
  };

  // Determine width based on whether label is shown
  const getWidthClass = () => {
    if (!showLabel) return '';
    
    switch (buttonSize) {
      case 'small':
        return 'w-auto min-w-24';
      case 'medium':
        return 'w-auto min-w-28';
      case 'large':
        return 'w-auto min-w-32';
      default:
        return 'w-auto min-w-28';
    }
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        ${sizeClasses[buttonSize]} 
        ${getShapeClasses()} 
        ${getWidthClass()}
        ${isOpen ? 'bg-gray-600' : themeConfig.primary} 
        hover:opacity-90 
        transition-all 
        duration-300 
        shadow-lg 
        items-center 
        justify-center 
        cursor-pointer 
        outline-none 
        focus:shadow-xl 
        pgpt-chat-btn pgpt-floating-btn ${isOpen ? 'open' : 'closed'}
        flex
        ${className}
      `}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      style={style}
    >
      {isOpen ? (
        <FaTimes className="text-white h-1/2 w-1/2" />
      ) : (
        <div className="flex items-center justify-center space-x-1">
          {logo || <SiRobotframework className="text-white h-6 w-6" />}
          {showLabel && (
            <span className="text-white font-medium whitespace-nowrap">
              {label}
            </span>
          )}
        </div>
      )}
    </button>
  );
});

ChatButton.displayName = 'ChatButton';

export default ChatButton; 