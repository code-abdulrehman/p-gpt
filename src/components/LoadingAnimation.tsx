import React from 'react';

export type LoadingAnimationType = 'dots' | 'spinner' | 'pulse' | 'bar' | 'typingDots';

interface LoadingAnimationProps {
  type?: LoadingAnimationType;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  type = 'dots',
  color = 'currentColor',
  size = 'medium',
  text,
  className = '',
}) => {
  // Size mappings
  const sizeMap = {
    small: {
      dot: 'h-1.5 w-1.5',
      bar: 'h-1.5 w-16',
      spinner: 'h-3 w-3',
      pulse: 'h-2 w-2',
      container: 'h-4',
      text: 'text-xs',
    },
    medium: {
      dot: 'h-2 w-2',
      bar: 'h-2 w-24',
      spinner: 'h-4 w-4',
      pulse: 'h-3 w-3',
      container: 'h-6',
      text: 'text-sm',
    },
    large: {
      dot: 'h-2.5 w-2.5',
      bar: 'h-2.5 w-32',
      spinner: 'h-5 w-5',
      pulse: 'h-4 w-4',
      container: 'h-8',
      text: 'text-base',
    },
  };

  // Render different animation types
  const renderAnimation = () => {
    switch (type) {
      case 'dots':
        return (
          <div className={`flex items-center space-x-1 ${sizeMap[size].container} ${className}`}>
            <div 
              className={`${sizeMap[size].dot} rounded-full animate-bounce delay-0`} 
              style={{ backgroundColor: color }}
            />
            <div 
              className={`${sizeMap[size].dot} rounded-full animate-bounce delay-150`} 
              style={{ backgroundColor: color }}
            />
            <div 
              className={`${sizeMap[size].dot} rounded-full animate-bounce delay-300`} 
              style={{ backgroundColor: color }}
            />
            {text && <span className={`ml-2 ${sizeMap[size].text}`} style={{ color }}>{text}</span>}
          </div>
        );

      case 'spinner':
        return (
          <div className={`flex items-center ${sizeMap[size].container} ${className}`}>
            <div 
              className={`${sizeMap[size].spinner} rounded-full border-2 border-b-transparent animate-spin`} 
              style={{ borderColor: `${color} transparent ${color} ${color}` }}
            />
            {text && <span className={`ml-2 ${sizeMap[size].text}`} style={{ color }}>{text}</span>}
          </div>
        );

      case 'pulse':
        return (
          <div className={`flex items-center ${sizeMap[size].container} ${className}`}>
            <div 
              className={`${sizeMap[size].pulse} rounded-full animate-pulse`} 
              style={{ backgroundColor: color }}
            />
            {text && <span className={`ml-2 ${sizeMap[size].text}`} style={{ color }}>{text}</span>}
          </div>
        );

      case 'bar':
        return (
          <div className={`flex flex-col space-y-1.5 ${className}`}>
            <div 
              className={`h-2.5 w-full rounded-sm animate-pulse`} 
              style={{ backgroundColor: color }}
            />
            <div 
              className={`h-2.5 w-3/4 rounded-sm animate-pulse delay-75`} 
              style={{ backgroundColor: color }}
            />
            <div 
              className={`h-2.5 w-1/2 rounded-sm animate-pulse delay-150`} 
              style={{ backgroundColor: color }}
            />
            {text && <span className={`mt-1 ${sizeMap[size].text}`} style={{ color }}>{text}</span>}
          </div>
        );

      case 'typingDots':
        return (
          <div className={`flex items-center space-x-1 ${sizeMap[size].container} ${className}`}>
            <div className="flex space-x-1">
              <div 
                className={`${sizeMap[size].dot} rounded-full animate-typingDot1`} 
                style={{ backgroundColor: color }}
              />
              <div 
                className={`${sizeMap[size].dot} rounded-full animate-typingDot2`} 
                style={{ backgroundColor: color }}
              />
              <div 
                className={`${sizeMap[size].dot} rounded-full animate-typingDot3`} 
                style={{ backgroundColor: color }}
              />
            </div>
            {text && <span className={`ml-2 ${sizeMap[size].text}`} style={{ color }}>{text}</span>}
          </div>
        );

      default:
        return (
          <div className={`flex items-center space-x-1 ${sizeMap[size].container} ${className}`}>
            <div 
              className={`${sizeMap[size].dot} rounded-full animate-bounce delay-0`} 
              style={{ backgroundColor: color }}
            />
            <div 
              className={`${sizeMap[size].dot} rounded-full animate-bounce delay-150`} 
              style={{ backgroundColor: color }}
            />
            <div 
              className={`${sizeMap[size].dot} rounded-full animate-bounce delay-300`} 
              style={{ backgroundColor: color }}
            />
            {text && <span className={`ml-2 ${sizeMap[size].text}`} style={{ color }}>{text}</span>}
          </div>
        );
    }
  };

  return renderAnimation();
};

export default LoadingAnimation; 