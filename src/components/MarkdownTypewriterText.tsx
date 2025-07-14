import React, { useState, useEffect } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

interface MarkdownTypewriterTextProps {
  text: string;
  speed?: number;
  themeConfig: any;
  isDarkMode?: boolean;
  className?: string;
}

const MarkdownTypewriterText: React.FC<MarkdownTypewriterTextProps> = ({
  text,
  speed = 15,
  themeConfig,
  isDarkMode = false,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <div className={className}>
      <MarkdownRenderer 
        content={displayedText}
        themeConfig={themeConfig}
        isDarkMode={isDarkMode}
      />
      {!isComplete && (
        <span className="typing-cursor inline-block w-2 ml-1 opacity-70">▌</span>
      )}
    </div>
  );
};

export default MarkdownTypewriterText; 