import React from 'react';
import { FaUser } from "react-icons/fa";
import { SiRobotframework } from "react-icons/si";
import TypewriterText from './TypewriterText';

export type BubbleStyle = 'default' | 'modern' | 'rounded' | 'sharp' | 'bordered' | 'minimal';

interface ChatBubbleProps {
  role: 'user' | 'bot';
  content: string;
  avatarUrl?: string;
  username?: string;
  timestamp?: string;
  themeConfig: any;
  bubbleStyle?: BubbleStyle;
  className?: string;
  isTyping?: boolean;
  hasAnimation?: boolean;
  typingSpeed?: number;
  iconComponent?: React.ReactNode;
  style?: React.CSSProperties;
  isLastMessage?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  content,
  avatarUrl,
  username,
  timestamp,
  themeConfig,
  bubbleStyle = 'default',
  className = '',
  isTyping = false,
  hasAnimation = true,
  typingSpeed = 15,
  iconComponent,
  style,
  isLastMessage = false,
}) => {
  // Get appropriate classes based on bubble style
  const getBubbleClasses = () => {
    const baseClasses = role === 'user' 
      ? `${themeConfig.user} self-end ml-auto` 
      : `${themeConfig.bot} self-start mr-auto`;
    
    // Bubble shape & style specific classes
    switch (bubbleStyle) {
      case 'modern':
        return `${baseClasses} ${themeConfig.shadow} ${role === 'user' ? 'rounded-2xl rounded-tr-none' : 'rounded-2xl rounded-tl-none'}`;
      
      case 'rounded':
        return `${baseClasses} ${themeConfig.shadow} rounded-3xl`;
      
      case 'sharp':
        return `${baseClasses} ${themeConfig.shadow} rounded-none`;
      
      case 'bordered':
        return `${baseClasses} border-2 ${role === 'user' ? 'border-blue-500' : 'border-gray-300'} rounded-lg bg-opacity-50`;
      
      case 'minimal':
        return `${baseClasses} bg-opacity-80 rounded-md ${themeConfig.shadow === 'shadow-lg' ? 'shadow-sm' : themeConfig.shadow}`;
      
      default:
        return `${baseClasses} ${themeConfig.shadow} rounded-lg`;
    }
  };

  // Animation classes
  const getAnimationClasses = () => {
    if (!hasAnimation) return '';
    
    return role === 'user'
      ? 'animate-slideInRight' 
      : 'animate-slideInLeft';
  };

  // Render the content with or without typing animation
  const renderContent = () => {
    if (role === 'bot' && isTyping && isLastMessage) {
      return <TypewriterText text={content} speed={typingSpeed} />;
    }
    
    return (
      <div className="whitespace-pre-wrap custom-text-wrapper ">
          {
            content.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))
          }
      </div>
    );
  };

  return (
    <div
      className={`p-3 text-sm max-w-[80%] ${getBubbleClasses()} ${getAnimationClasses()} ${className}`}
      style={style}
    >
      <div className="flex items-center mb-1">
        <span className="mr-2">
          {iconComponent || (role === "user" ? (
            <FaUser className="h-3 w-3 opacity-80" />
          ) : (
            <SiRobotframework className="h-3 w-3 opacity-80" />
          ))}
        </span>
        <strong className="text-xs opacity-80">
          {username || (role === "user" ? "You" : "Assistant")}
        </strong>
        {timestamp && (
          <span className="ml-2 text-xs opacity-50">{timestamp}</span>
        )}
      </div>
      
      {renderContent()}
    </div>
  );
};

export default ChatBubble; 