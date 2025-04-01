import React, { useState, useRef, useEffect } from "react";
import { 
  FaTimes, FaPaperPlane, FaUser, FaExclamationTriangle 
} from "react-icons/fa";
import { SiRobotframework } from "react-icons/si";
import { 
  PBotThemeConfig, THEME_CONFIGS, DEFAULT_HEADER_TEXT, 
  DEFAULT_FOOTER_TEXT, DEFAULT_SYSTEM_MESSAGES, DEFAULT_BUTTON_POSITION,
  PBotCustomStyles
} from "../utils/common";
import { ChatMessage, sendMessage, getModelsForProvider } from "../utils/api";
import TypewriterText from './TypewriterText';

interface PBotProps {
  apiKey: string;
  llmProvider?: string;
  model?: string;
  placeholder?: string;
  title?: string;
  subtitle?: string;
  theme?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  welcomeMessage?: string;
  buttonSize?: 'small' | 'medium' | 'large';
  initiallyOpen?: boolean;
  role?: string;
  rules?: string[];
  customLogo?: React.ReactNode;
  minHeight?: string;
  maxHeight?: string;
  chatLayout?: 'popup' | 'sidebar' | 'normal';
  systemMessage?: string;
  customStyles?: PBotCustomStyles;
  showLabelWithLogo?: boolean;
  fixedHeight?: string;
  errorColor?: string;
  warningColor?: string;
  isCloseable?: boolean;
  enableTypingAnimation?: boolean;
}

const PBot: React.FC<PBotProps> = ({
  apiKey,
  llmProvider = "OpenAI",
  model,
  placeholder = DEFAULT_HEADER_TEXT.placeholderText,
  title = DEFAULT_HEADER_TEXT.title,
  subtitle = DEFAULT_HEADER_TEXT.subtitle,
  theme = "blue",
  position = DEFAULT_BUTTON_POSITION,
  welcomeMessage = DEFAULT_HEADER_TEXT.welcomeMessage,
  buttonSize = "medium",
  initiallyOpen = false,
  role = "assistant",
  rules = [],
  customLogo,
  minHeight = "28rem",
  maxHeight = "80vh",
  chatLayout = "normal",
  systemMessage = "",
  customStyles = {},
  showLabelWithLogo = false,
  fixedHeight = "400px",
  errorColor = "#ef4444",
  warningColor = "#f59e0b",
  isCloseable = true,
  enableTypingAnimation
}) => {
  // Component state
  const [isOpen, setIsOpen] = useState(initiallyOpen ? true : false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTheme] = useState<string>(theme);
  const [currentProvider] = useState<string>(llmProvider);
  const [currentModel] = useState<string>(model || getModelsForProvider(llmProvider)[0]);
  const [currentRole] = useState<string>(role);
  const [isClosing, setIsClosing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  
  // Determine if typing animation should be used
  const shouldUseTypingAnimation = enableTypingAnimation !== undefined 
    ? enableTypingAnimation 
    : currentRole === "writer";

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Theme object from configuration
  const themeConfig: PBotThemeConfig = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.blue;

  // Position styles
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  // Get position CSS properties based on position string
  const getPositionStyles = () => {
    const posStyles: {[key: string]: string} = {};
    
    if (position.includes('bottom')) {
      posStyles.bottom = '13rem';
    } else {
      posStyles.top = '6rem';
    }
    
    if (position.includes('right')) {
      posStyles.right = '0.6rem';
    } else {
      posStyles.left = '0.6rem';
    }
    
    return posStyles;
  };

  // Button size classes
  const buttonSizeClasses = {
    'small': 'h-10 w-10',
    'medium': 'h-12 w-12',
    'large': 'h-14 w-14',
  };

  // Chat layout styles with proper type assertions
  const chatLayoutStyles: {[key: string]: React.CSSProperties} = {
    popup: {
      width: "80vw",
      height: "80vh",
      maxWidth: "1200px",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: isOpen ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.5)",
      transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
    },
    sidebar: {
      width: "400px",
      height: "100vh",
      maxWidth: "100vw",
      transform: isOpen 
        ? "translateX(0)" 
        : position.includes('right') 
          ? "translateX(420px)" 
          : "translateX(-420px)",
      transition: "transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      right: position.includes('right') ? '0' : 'auto',
      left: position.includes('left') ? '0' : 'auto',
      top: '0',
      bottom: '0',
      borderRadius: '0',
      position: "fixed"
    },
    normal: {
      width: "100%",
      maxWidth: "400px",
      minHeight: customStyles?.chatContainer?.minHeight || fixedHeight,
      maxHeight: customStyles?.chatContainer?.maxHeight || fixedHeight,
      transform: isOpen 
        ? "translateY(0) scale(1)" 
        : "translateY(20px) scale(0.95)",
      opacity: isOpen ? "1" : "0",
      transition: "all 0.2s ease-in-out",
      position: "fixed",
      ...getPositionStyles()
    }
  };

  // Load saved messages from localStorage on initial load
  useEffect(() => {
    const savedMessages = localStorage.getItem(`pbot-messages-${currentTheme}-${currentProvider}`);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
          return;
        }
      } catch (e) {
        console.error("Error parsing saved messages:", e);
        setWarning("Couldn't load saved messages");
      }
    }
    
    // If no valid saved messages, set welcome message
    if (welcomeMessage && !messages.length) {
      setMessages([{ role: 'bot', content: welcomeMessage }]);
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isClosing) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isClosing]);

  // Clear error and warning after 5 seconds
  useEffect(() => {
    if (error || warning) {
      const timer = setTimeout(() => {
        setError(null);
        setWarning(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, warning]);

  const toggleChat = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Reset any previous errors
    setError(null);
    setWarning(null);

    // Get system message based on role or use custom one if provided
    const systemMsg = systemMessage || DEFAULT_SYSTEM_MESSAGES[currentRole] || DEFAULT_SYSTEM_MESSAGES.assistant;
    
    // Add rules if provided
    let finalSystemMsg = systemMsg;
    if (rules && rules.length > 0) {
      finalSystemMsg += "\n\nYou must follow these rules:\n" + rules.map(rule => `- ${rule}`).join("\n");
    }
    
    // Create user message
    const userMessage: ChatMessage = { role: "user", content: input };
    
    // Add system message if this is the first user message
    const updatedMessages = [...messages];
    if (messages.length === 0 || (messages.length === 1 && messages[0].role === 'bot')) {
      updatedMessages.push({ role: "system", content: finalSystemMsg });
    }
    
    // Add user message to conversation
    updatedMessages.push(userMessage);
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Send message to API
      const response = await sendMessage({
        provider: currentProvider,
        apiKey,
        model: currentModel,
        messages: updatedMessages,
        temperature: 0.7,
        maxTokens: 1000
      });

      if (response) {
        // Add bot response to conversation
        setMessages(prev => [...prev, response]);
      } else {
        // Handle error
        setError("Failed to get response from AI");
        const errorMessage: ChatMessage = { 
          role: "bot", 
          content: "Sorry, I couldn't process your request. Please try again." 
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error
      setError("Network error or invalid API key");
      const errorMessage: ChatMessage = { 
        role: "bot", 
        content: "An error occurred. Please check your connection and try again." 
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  // Chat button in corner
  const renderChatButton = () => (
    <button
      onClick={toggleChat}
      className={`${buttonSizeClasses[buttonSize]} rounded-full items-center justify-center ${themeConfig.primary} hover:opacity-90 transition-all duration-300 shadow-lg cursor-pointer outline-none focus:shadow-xl ${isOpen ? 'hidden transition-[display]' : 'flex transition-[display]'}`}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      style={customStyles.chatButton}
    >
      {isOpen ? (
        <FaTimes className="text-white h-1/2 w-1/2" />
      ) : (
        <>
          {!showLabelWithLogo ? ( customLogo? customLogo : <SiRobotframework className="text-white h-3/5 w-3/5" />) : (
            <span className=" text-white text-xl font-bold whitespace-nowrap">{title?.toUpperCase()[0]}</span>
          )}
        </>
      )}
    </button>
  );

  // Chat header
  const renderHeader = () => (
    <div 
      className={`p-4 ${themeConfig.header} border-b ${themeConfig.border} ${themeConfig.text}`}
      style={customStyles.header}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div 
            className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center"
            style={customStyles.logo}
          >
            {customLogo ? customLogo : <SiRobotframework className="text-white h-4 w-4" />}
          </div>
          <div>
            <h2 
              className="font-bold text-lg leading-tight"
              style={customStyles.title}
            >
              {title}
            </h2>
            <p 
              className={`text-xs ${themeConfig.secondaryText}`}
              style={customStyles.subtitle}
            >
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {isCloseable ?
          <button 
          onClick={toggleChat} 
          className={`p-1.5 rounded-full hover:bg-opacity-20 hover:bg-gray-700 transition-colors cursor-pointer text-gray-200 outline-none ${themeConfig.primary}`}
          aria-label="Close"
        >
          <FaTimes />
        </button>
          : 
          <></>}
        </div>
      </div>
    </div>
  );

  // Error or warning notification
  const renderNotification = () => {
    if (!error && !warning) return null;
    
    const isError = error !== null;
    const message = error || warning;
    const bgColor = isError ? errorColor : warningColor;
    
    return (
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-4 py-3 rounded-lg shadow-lg text-white flex items-center"
        style={{ backgroundColor: bgColor }}
      >
        <FaExclamationTriangle className="mr-2" />
        <span>{message}</span>
      </div>
    );
  };

  // Chat message area
  const renderMessages = () => (
    <div 
      ref={chatContainerRef}
      className={`flex-1 overflow-y-auto p-4 space-y-3 relative`}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: `${themeConfig.scrollThumb} ${themeConfig.scrollTrack}`,
        minHeight: chatLayout === 'normal' ? fixedHeight : minHeight,
        maxHeight: chatLayout === 'sidebar' ? '100%' : chatLayout === "normal" ? "400px" : chatLayout === "popup" ? "80vh" : maxHeight,
        ...customStyles.body
      }}
    >
      {renderNotification()}
      
      {messages.filter(msg => msg.role !== 'system').map((msg, idx) => (
        <div
          key={idx}
          className={`p-3 rounded-lg text-sm max-w-[80%] ${
            msg.role === "user"
              ? `${themeConfig.user} self-end ml-auto ${themeConfig.shadow}`
              : `${themeConfig.bot} self-start mr-auto ${themeConfig.shadow}`
          }`}
          style={msg.role === "user" ? customStyles.userBubble : customStyles.botBubble}
        >
          <div className="flex items-center mb-1">
            <span className="mr-2">
              {msg.role === "user" ? (
                <FaUser className="h-3 w-3 opacity-80" />
              ) : (
                <SiRobotframework className="h-3 w-3 opacity-80" />
              )}
            </span>
            <strong className="text-xs opacity-80">
              {msg.role === "user" ? "You" : title}
            </strong>
          </div>
          {msg.role === "bot" && shouldUseTypingAnimation ? (
            <TypewriterText text={msg.content} speed={15} />
          ) : (
            <div className="whitespace-pre-wrap">{msg.content}</div>
          )}
        </div>
      ))}

      {loading && (
        <div className={`p-3 rounded-lg ${themeConfig.bot} self-start mr-auto text-sm ${themeConfig.shadow}`}>
          <div className="flex items-center mb-1">
            <SiRobotframework className="h-3 w-3 opacity-80 mr-2" />
            <strong className="text-xs opacity-80">{title}</strong>
          </div>
          <div className="flex space-x-1 items-center">
            <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-0"></div>
            <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-150"></div>
            <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-300"></div>
          </div>
        </div>
      )}
      
      {/* Element to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );

  // Chat input area
  const renderFooter = () => (
    <div className={`p-2`}>
      <div className={`flex flex-col rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden p-2 pb-1 ${themeConfig.footer} border-t ${themeConfig.border}`}
      style={customStyles.footer}>
        <div className="flex items-end justify-between">
          <textarea
            ref={inputRef}
            value={input} 
            onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.ctrlKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder={loading ? "AI is responding..." : placeholder}
          className={`w-full resize-none p-2 text-base outline-none flex-grow`}
          style={{ 
            color: themeConfig.inputText,
            minHeight: '50px',
            maxHeight: '55px',
            ...customStyles.input
          }}
          rows={3}
          disabled={loading}
        ></textarea>
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className={`flex justify-center items-center rounded-lg h-8 w-8 transition-colors cursor-pointer ${
              !input.trim() && !loading
                ? `${themeConfig.primary} opacity-50 cursor-not-allowed` 
                : loading
                  ? 'bg-red-600 hover:bg-red-700'
                  : `${themeConfig.primary} hover:opacity-90`
            } text-white`}
            aria-label="Send message"
            style={customStyles.sendButton}
          >
            {loading ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="6" width="12" height="12"></rect>
              </svg>
            ) : (
              <FaPaperPlane className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="py-1"/>
        <div className="flex justify-between items-center pt-1 border-t border-gray-200 dark:border-gray-700">
          <div className={`text-xs ${themeConfig.secondaryText}`}>
             <div>{DEFAULT_FOOTER_TEXT.poweredBy}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pbot-container">
      {/* Chat toggle button */}
      <div className={`fixed ${positionClasses[position]} z-50`}>
        {renderChatButton()}
      </div>
      
      {/* Chat window */}
      {(isOpen || isClosing) && (
        <div 
          className={`fixed z-50 border rounded-lg ${themeConfig.border} ${themeConfig.shadow}`}
          style={{...chatLayoutStyles[chatLayout], ...customStyles.chatContainer,} }
        >
          <div className={`flex flex-col h-full rounded-lg ${themeConfig.body} overflow-hidden`}>
            {renderHeader()}
            {renderMessages()}
            {renderFooter()}
          </div>
        </div>
      )}
    </div>
  );
};

export default PBot;