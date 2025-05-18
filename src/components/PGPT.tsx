import React, { useState, useRef, useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { SiRobotframework } from "react-icons/si";
import { 
  PGPTThemeConfig, THEME_CONFIGS, DEFAULT_HEADER_TEXT, 
  DEFAULT_SYSTEM_MESSAGES, DEFAULT_BUTTON_POSITION,
  PGPTCustomStyles, STORAGE_TYPES, APPEARANCE_MODES, OPEN_TRIGGERS
} from "../utils/common";
import { ChatMessage, sendMessage, getModelsForProvider } from "../utils/api";

// Import modular components
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatButton from './ChatButton';
import ChatBubble from './ChatBubble';
import LoadingAnimation from './LoadingAnimation';
import TypewriterText from './TypewriterText';

/**
 * Interface for router configuration
 */
interface RouterConfig {
  endpoint: string;
  headers?: Record<string, string>;
  maxTokens?: number;
  customPayload?: Record<string, any>;
}

/**
 * Interface for custom position
 */
interface CustomPosition {
  x: string | number;
  y: string | number;
  offsetX?: string | number;
  offsetY?: string | number;
}

/**
 * Interface for storage configuration
 */
interface StorageConfig {
  type: string;
  key?: string;
  getItem?: (key: string) => string | null | Promise<string | null>;
  setItem?: (key: string, value: string) => void | Promise<void>;
}

/**
 * Interface for content configuration
 */
interface ContentConfig {
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
  placeholder?: string;
  systemMessage?: string;
}

/**
 * Interface for color configuration 
 */
interface ColorConfig {
  primary?: string;
  secondary?: string;
  background?: string;
  text?: string;
  userBubble?: string;
  botBubble?: string;
  error?: string;
  warning?: string;
}

/**
 * Interface for classes configuration
 */
interface ClassesConfig {
  container?: string;
  header?: string;
  body?: string;
  footer?: string;
  userBubble?: string;
  botBubble?: string;
  input?: string;
  button?: string;
}

// Position types
type PositionType = 
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'left-full-height'
  | 'right-full-height'
  | 'top-full-width'
  | 'bottom-full-width'
  | 'fixed'
  | 'fullscreen'
  | 'custom';

/**
 * Main PGPT component props
 */
interface PGPTProps {
  // Core Props
  apiKey?: string;
  routerConfig?: RouterConfig;
  theme?: string;
  appearance?: string;
  model?: string;
  position?: PositionType | CustomPosition;
  
  // Content Props
  content?: ContentConfig;
  
  // Styling Props
  colors?: ColorConfig;
  classes?: ClassesConfig;
  styles?: PGPTCustomStyles;
  
  // Behavior Props
  useTextarea?: boolean;
  enableTypingAnimation?: boolean;
  defaultOpen?: boolean;
  openTrigger?: 'click' | 'hover';
  isCloseable?: boolean;
  
  // Storage Props
  storage?: StorageConfig;
  
  // Customization Props
  logo?: React.ReactNode;
  buttonSize?: 'small' | 'medium' | 'large';
  buttonStyle?: 'circle' | 'rounded' | 'square' | 'sharp' | 'pill';
  
  // Advanced Props
  llmProvider?: string;
  role?: string;
  rules?: string[];
  
  // Sizing Props
  minHeight?: string;
  maxHeight?: string;
  fixedHeight?: string;
  
  // Layout Props
  chatLayout?: 'popup' | 'sidebar' | 'normal';
  showLabelWithLogo?: boolean;
  
  // UI Options
  bubbleStyle?: 'default' | 'modern' | 'rounded' | 'sharp' | 'bordered' | 'minimal';
  loadingAnimation?: 'dots' | 'spinner' | 'pulse' | 'bar' | 'typingDots';
  bubbleAnimation?: boolean;
  
  // Event Handlers
  onSendMessage?: (message: string) => void;
  onReceiveMessage?: (message: ChatMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * Main PGPT Component
 */
const PGPT: React.FC<PGPTProps> = ({
  // Core Props
  apiKey,
  routerConfig,
  theme = 'blue',
  appearance = 'light',
  model = 'gpt-4o',
  position = DEFAULT_BUTTON_POSITION,
  
  // Content Props
  content = {},
  
  // Styling Props
  colors = {},
  classes = {},
  styles = {},
  
  // Behavior Props
  useTextarea = false,
  enableTypingAnimation = true,
  defaultOpen = false,
  openTrigger = 'click',
  isCloseable = false,
  
  // Storage Props
  storage = { type: STORAGE_TYPES.LOCAL },
  
  // Customization Props
  logo,
  buttonSize = 'medium',
  buttonStyle = 'circle',
  
  // Advanced Props
  llmProvider = 'OpenAI',
  role = 'assistant',
  rules = [],
  
  // Sizing Props
  minHeight = '28rem',
  maxHeight = '80vh',
  fixedHeight = '',
  
  // Layout Props
  chatLayout = 'normal',
  showLabelWithLogo = false,
  
  // UI Options
  bubbleStyle = 'default',
  loadingAnimation = 'typingDots',
  bubbleAnimation = true,
  
  // Event Handlers
  onSendMessage,
  onReceiveMessage,
  onOpen,
  onClose
}) => {
  // Apply defaults for content configuration
  const contentConfig = {
    title: content.title || DEFAULT_HEADER_TEXT.title,
    subtitle: content.subtitle || DEFAULT_HEADER_TEXT.subtitle,
    welcomeMessage: content.welcomeMessage || DEFAULT_HEADER_TEXT.welcomeMessage,
    placeholder: content.placeholder || DEFAULT_HEADER_TEXT.placeholderText,
    systemMessage: content.systemMessage || '',
  };

  // Apply defaults for colors
  const errorColor = colors.error || "#ef4444";
  const warningColor = colors.warning || "#f59e0b";

  // Component state
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTheme] = useState<string>(theme);
  const [currentProvider] = useState<string>(llmProvider);
  const [currentModel] = useState<string>(
    model || 
    (routerConfig?.customPayload?.model ? routerConfig.customPayload.model : 
      getModelsForProvider(llmProvider)[0])
  );
  const [currentRole] = useState<string>(role);
  const [isClosing, setIsClosing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [lastBotMessageIndex, setLastBotMessageIndex] = useState<number>(-1);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  
  // Determine if typing animation should be used
  const shouldUseTypingAnimation = enableTypingAnimation;

  // Check if we're using REST API route instead of direct LLM integration
  const useRestApi = !!routerConfig;

  // Check if required props are provided
  useEffect(() => {
    if (!apiKey && !routerConfig) {
      setWarning("Either apiKey or routerConfig must be provided");
    } else if (apiKey && routerConfig) {
      setWarning("Both apiKey and routerConfig provided, using routerConfig for API calls");
    }
  }, [apiKey, routerConfig]);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Get theme configuration based on appearance mode
  const isDarkMode = appearance === APPEARANCE_MODES.DARK;
  
  // Theme object from configuration with dark mode support
  const baseThemeConfig: PGPTThemeConfig = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.blue;
  const themeConfig: PGPTThemeConfig = isDarkMode && baseThemeConfig.darkMode 
    ? baseThemeConfig.darkMode 
    : baseThemeConfig;

  // Check for custom position or predefined position
  const hasCustomPosition = position && typeof position === 'object';
  const customPos = hasCustomPosition ? position as CustomPosition : null;
  const positionType = !hasCustomPosition ? position as PositionType : 'custom';

  // Position styles and classes for the button
  const positionClasses: Record<string, string> = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    'fixed': 'top-4 right-1/2 transform translate-x-1/2',
  };

  // Get storage key based on theme and provider
  const getStorageKey = () => {
    return storage.key || `pgpt-messages-${currentTheme}-${currentProvider}`;
  };

  // Custom storage handlers
  const storageHandlers = {
    getItem: (key: string): string | null => {
      if (storage.type === STORAGE_TYPES.CUSTOM && storage.getItem) {
        const result = storage.getItem(key);
        // Handle both synchronous and Promise return types
        if (result instanceof Promise) {
          // For async storage, we'll return null and handle the Promise elsewhere
          result.then().catch(err => {
            console.error("Error retrieving from custom storage:", err);
          });
          return null;
        }
        return result;
      } else if (storage.type === STORAGE_TYPES.SESSION) {
        return sessionStorage.getItem(key);
      } else if (storage.type === STORAGE_TYPES.LOCAL) {
        return localStorage.getItem(key);
      }
      return null;
    },
    setItem: (key: string, value: string): void => {
      if (storage.type === STORAGE_TYPES.CUSTOM && storage.setItem) {
        storage.setItem(key, value);
      } else if (storage.type === STORAGE_TYPES.SESSION) {
        sessionStorage.setItem(key, value);
      } else if (storage.type === STORAGE_TYPES.LOCAL) {
        localStorage.setItem(key, value);
      }
    }
  };

  // Get button position styles
  const getButtonPositionStyles = (): React.CSSProperties => {
    if (hasCustomPosition && customPos) {
      return {
        position: 'fixed',
        left: typeof customPos.x === 'number' ? `${customPos.x}px` : customPos.x,
        top: typeof customPos.y === 'number' ? `${customPos.y}px` : customPos.y,
        zIndex: 50,
      };
    }
    
    if (positionType === 'left-full-height' || positionType === 'right-full-height') {
      return {
        position: 'fixed',
        [positionType === 'left-full-height' ? 'left' : 'right']: '4px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
      };
    }
    
    if (positionType === 'top-full-width' || positionType === 'bottom-full-width') {
      return {
        position: 'fixed',
        [positionType === 'top-full-width' ? 'top' : 'bottom']: '4px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
      };
    }
    
    if (positionType === 'fullscreen') {
      return {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 60,
      };
    }
    
    return {}; // Default case for standard positions
  };

  // Get chat window position styles based on icon position
  const getChatWindowPositionStyles = (): React.CSSProperties => {
    // For center position, always show popup in center regardless of button position
    if (positionType === 'center') {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        maxWidth: '600px',
        height: '80vh',
      };
    }
    
    // Custom position with offsets
    if (hasCustomPosition && customPos) {
      const offsetX = customPos.offsetX || 0;
      const offsetY = customPos.offsetY || 0;
      
      return {
        position: 'fixed',
        left: typeof customPos.x === 'number' 
          ? `calc(${customPos.x}px + ${typeof offsetX === 'number' ? `${offsetX}px` : offsetX})` 
          : `calc(${customPos.x} + ${typeof offsetX === 'number' ? `${offsetX}px` : offsetX})`,
        top: typeof customPos.y === 'number' 
          ? `calc(${customPos.y}px + ${typeof offsetY === 'number' ? `${offsetY}px` : offsetY})` 
          : `calc(${customPos.y} + ${typeof offsetY === 'number' ? `${offsetY}px` : offsetY})`,
        width: chatLayout === 'popup' ? '80vw' : '350px',
        height: chatLayout === 'popup' ? '80vh' : styles?.chatContainer?.minHeight || fixedHeight,
      };
    }
    
    // Position-specific styles
    switch (positionType) {
      case 'fixed':
        return {
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          maxWidth: '600px',
          height: '70vh',
        };
        
      case 'left-full-height':
        return {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '350px',
          height: '100vh',
          borderRadius: 0,
        };
        
      case 'right-full-height':
        return {
          position: 'fixed',
          top: 0,
          right: 0,
          width: '350px',
          height: '100vh',
          borderRadius: 0,
        };
        
      case 'top-full-width':
        return {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '350px',
          borderRadius: 0,
        };
        
      case 'bottom-full-width':
        return {
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100vw',
          height: '350px',
          borderRadius: 0,
        };
        
      case 'fullscreen':
        return {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          zIndex: 50,
        };
        
      case 'top-left':
        return {
          position: 'fixed',
          top: '60px',
          left: '20px',
          width: '350px',
          height: styles?.chatContainer?.minHeight || fixedHeight,
        };
        
      case 'top-right':
        return {
          position: 'fixed',
          top: '60px',
          right: '20px',
          width: '350px',
          height: styles?.chatContainer?.minHeight || fixedHeight,
        };
        
      case 'bottom-left':
        return {
          position: 'fixed',
          bottom: '60px',
          left: '20px',
          width: '350px',
          height: styles?.chatContainer?.minHeight || fixedHeight,
        };
        
      case 'bottom-right':
        return {
          position: 'fixed',
          bottom: '60px',
          right: '20px',
          width: '350px',
          height: styles?.chatContainer?.minHeight || fixedHeight,
        };
        
      default:
        return {
          position: 'fixed',
          bottom: '60px',
          right: '20px',
          width: '350px',
          height: styles?.chatContainer?.minHeight || fixedHeight,
        };
    }
  };

  // Load saved messages from storage on initial load
  useEffect(() => {
    if (storage.type === STORAGE_TYPES.NONE) {
      // Don't load messages if storage is disabled
      if (contentConfig.welcomeMessage) {
        setMessages([{ role: 'bot', content: contentConfig.welcomeMessage }]);
      }
      return;
    }
    
    const storageKey = getStorageKey();
    const savedMessages = storageHandlers.getItem(storageKey);
    
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
    if (contentConfig.welcomeMessage) {
      setMessages([{ role: 'bot', content: contentConfig.welcomeMessage }]);
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
        if (inputRef.current) {
          inputRef.current.focus();
        }
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

  // Update last bot message index when new message is added
  useEffect(() => {
    const reversedIndex = [...messages].reverse().findIndex(msg => msg.role === 'bot');
    if (reversedIndex !== -1) {
      setLastBotMessageIndex(messages.length - 1 - reversedIndex);
    }
  }, [messages]);

  // Handle opening and closing the chat
  const toggleChat = () => {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  };
  
  // Open chat handler
  const openChat = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
  };
  
  // Close chat handler
  const closeChat = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      if (onClose) onClose();
    }, 300);
  };
  
  // Handle mouse enter for hover trigger
  const handleMouseEnter = () => {
    if (openTrigger === OPEN_TRIGGERS.HOVER && !isOpen) {
      const timeout = setTimeout(() => {
        openChat();
      }, 300); // Add slight delay to prevent accidental openings
      setHoverTimeout(timeout);
    }
  };
  
  // Handle mouse leave for hover trigger
  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  // Send message handler
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Reset any previous errors
    setError(null);
    setWarning(null);

    // Get system message based on role or use custom one if provided
    const systemMsg = contentConfig.systemMessage || DEFAULT_SYSTEM_MESSAGES[currentRole] || DEFAULT_SYSTEM_MESSAGES.assistant;
    
    // Add rules if provided
    let finalSystemMsg = systemMsg;
    if (rules && rules.length > 0) {
      finalSystemMsg += "\n\nYou must follow these rules:\n" + rules.map(rule => `- ${rule}`).join("\n");
    }
    
    // Create user message
    const userMessage: ChatMessage = { role: "user", content: input };
    
    // Call onSendMessage callback if provided
    if (onSendMessage) {
      onSendMessage(input);
    }
    
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
      // Send message to API using either direct API key or REST API route
      const response: ChatMessage | null = await sendMessage({
        provider: useRestApi ? "" : currentProvider,
        apiKey: apiKey || "",
        model: currentModel,
        messages: updatedMessages,
        temperature: 0.7,
        maxTokens: routerConfig?.maxTokens || 1000,
        routerConfig: routerConfig ? {
          route: routerConfig.endpoint,
          model: currentModel,
          tokens: routerConfig.maxTokens,
          schema: routerConfig.customPayload
        } : undefined
      });

      if (response) {
        // Add bot response to conversation
        setMessages(prev => [...prev, response]);
        
        // Call onReceiveMessage callback if provided
        if (onReceiveMessage) {
          onReceiveMessage(response);
        }
        
        // Save messages to storage if enabled
        if (storage.type !== STORAGE_TYPES.NONE) {
          const storageKey = getStorageKey();
          storageHandlers.setItem(
            storageKey,
            JSON.stringify([...updatedMessages, response])
          );
        }
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
    <ChatButton
      ref={buttonRef}
      isOpen={isOpen}
      onClick={openTrigger === OPEN_TRIGGERS.CLICK ? toggleChat : openChat}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      buttonSize={buttonSize}
      buttonStyle={buttonStyle}
      themeConfig={themeConfig}
      logo={logo}
      showLabel={showLabelWithLogo}
      label={contentConfig.title}
      className={classes.button || ''}
      style={styles.chatButton}
    />
  );

  // Chat header
  const renderHeader = () => (
    <ChatHeader
      title={contentConfig.title}
      subtitle={contentConfig.subtitle}
      onClose={closeChat}
      themeConfig={themeConfig}
      isCloseable={isCloseable}
      logo={logo}
      className={classes.header || ''}
    />
  );

  // Error or warning notification
  const renderNotification = () => {
    if (!error && !warning) return null;
    
    const isError = error !== null;
    const message = error || warning;
    const bgColor = isError ? errorColor : warningColor;
    
    return (
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-4 py-3 rounded-xl overflow-hidden shadow-lg text-white flex items-center"
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
      className={`flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 relative ${classes.body || ''}`}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: `${themeConfig.scrollThumb} ${themeConfig.scrollTrack}`,
        minHeight: chatLayout === 'normal' ? fixedHeight : maxHeight,
        maxHeight: chatLayout === 'sidebar' ? '100%' : chatLayout === "normal" ? "400px" : chatLayout === "popup" ? "400px" : maxHeight,
        ...styles.body
      }}
    >
      {renderNotification()}
      
      {messages.filter(msg => msg.role !== 'system').map((msg, idx) => (
        <ChatBubble
          key={idx}
          role={msg.role as 'user' | 'bot'}
          content={msg.content}
          username={msg.role === 'user' ? 'You' : contentConfig.title}
          themeConfig={themeConfig}
          bubbleStyle={bubbleStyle}
          className={msg.role === 'user' ? classes.userBubble || '' : classes.botBubble || ''}
          isTyping={shouldUseTypingAnimation}
          hasAnimation={bubbleAnimation}
          typingSpeed={15}
          iconComponent={msg.role === 'user' ? undefined : logo ? logo : undefined}
          style={msg.role === 'user' ? styles.userBubble : styles.botBubble}
          isLastMessage={idx === lastBotMessageIndex}
        />
      ))}

      {loading && (
        <div className={`p-3 rounded-lg ${themeConfig.bot} self-start mr-auto text-sm ${themeConfig.shadow}`}>
          <div className="flex items-center mb-1">
            <span className="mr-2">
              {logo || <SiRobotframework className="h-3 w-3 opacity-80" />}
            </span>
            <strong className="text-xs opacity-80">{contentConfig.title}</strong>
          </div>
          <LoadingAnimation 
            type={loadingAnimation} 
            color="currentColor" 
            size="small"
          />
        </div>
      )}
      
      {/* Element to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );

  // Chat input area
  const renderFooter = () => (
    <ChatFooter
      input={input}
      setInput={setInput}
      handleSendMessage={handleSendMessage}
      loading={loading}
      placeholder={contentConfig.placeholder}
      themeConfig={themeConfig}
      useTextarea={useTextarea}
      className={classes.footer || ''}
      inputStyle={styles.input}
      buttonStyle={styles.sendButton}
      showSendButton={true}
      autofocus={true}
    />
  );

  return (
    <div className={`pgpt-container ${classes.container || ''}`}>
      {/* Chat toggle button - always visible */}
      <div 
        className={!hasCustomPosition && 
          positionType !== 'left-full-height' && 
          positionType !== 'right-full-height' && 
          positionType !== 'top-full-width' && 
          positionType !== 'bottom-full-width' 
            ? `fixed ${positionClasses[positionType as keyof typeof positionClasses] || ''} z-50` 
            : ''
        } 
        style={hasCustomPosition || 
          positionType === 'left-full-height' || 
          positionType === 'right-full-height' || 
          positionType === 'top-full-width' || 
          positionType === 'bottom-full-width' 
            ? getButtonPositionStyles() 
            : {}
        }
      >
        {renderChatButton()}
      </div>
      
      {/* Chat window */}
      {(isOpen || isClosing) && (
        <div 
          className={`fixed z-40 border ${themeConfig.border} ${themeConfig.shadow} ${positionType === 'fullscreen' ? 'rounded-none' : 'rounded-xl'}`}
          style={{
            ...getChatWindowPositionStyles(),
            ...styles.chatContainer,
            transform: isOpen ? undefined : 'scale(0.95)',
            opacity: isOpen ? 1 : 0,
            transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
          }}
        >
          <div className={`flex flex-col h-full ${positionType === 'fullscreen' ? 'rounded-none' : 'rounded-xl'} ${themeConfig.body} overflow-hidden`}>
            {renderHeader()}
            {renderMessages()}
            {renderFooter()}
          </div>
        </div>
      )}
    </div>
  );
};

export default PGPT;