// Main PGPT component
export { default as PGPT } from './components/PGPT';

// Modular components
export { default as ChatHeader } from './components/ChatHeader';
export { default as ChatFooter } from './components/ChatFooter';
export { default as ChatButton } from './components/ChatButton';
export { default as ChatBubble } from './components/ChatBubble';
export { default as LoadingAnimation } from './components/LoadingAnimation';
export { default as TypewriterText } from './components/TypewriterText';

// Types
export { PGPTThemeConfig, THEME_CONFIGS } from './utils/common';
export type { PGPTCustomStyles } from './utils/common';

// Export additional constants
export { 
  APPEARANCE_MODES,
  STORAGE_TYPES, 
  OPEN_TRIGGERS 
} from './utils/common';

// Re-exporting types directly since they're not exported from PGPT
import type { ChatMessage, RouterConfig } from './utils/api';

// Define the types that should be exported
export type PGPTPosition = 
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'fixed'
  | 'left-full-height'
  | 'right-full-height'
  | 'top-full-width'
  | 'bottom-full-width'
  | 'fullscreen'
  | 'custom';

export type PGPTTheme = string;
export type PGPTLayout = 'popup' | 'sidebar' | 'normal';
export type PGPTButtonSize = 'small' | 'medium' | 'large';
export type PGPTRole = string;
export type PGPTLLMProvider = string;
export type PGPTChatMessage = ChatMessage;

// Define custom position interface
export interface CustomPosition {
  x: string | number;
  y: string | number;
  offsetX?: string | number;
  offsetY?: string | number;
}

// Export the PGPTProps interface
export interface PGPTProps {
  apiKey?: string;  // Made optional since we now have routerConfig option
  routerConfig?: RouterConfig;   // Added routerConfig property for REST API option
  llmProvider?: string;
  model?: string;
  placeholder?: string;
  title?: string;
  subtitle?: string;
  theme?: string;
  position?: PGPTPosition | CustomPosition;
  welcomeMessage?: string;
  buttonSize?: PGPTButtonSize;
  initiallyOpen?: boolean;
  role?: string;
  rules?: string[];
  customLogo?: React.ReactNode;
  minHeight?: string;
  maxHeight?: string;
  chatLayout?: PGPTLayout;
  systemMessage?: string;
  customStyles?: PGPTCustomStyles;
  showLabelWithLogo?: boolean;
  fixedHeight?: string;
  errorColor?: string;
  warningColor?: string;
  enableTypingAnimation?: boolean;
  defaultOpen?: boolean; // Control if modal is open by default
}

// Export the API utilities
export {
  sendMessage,
  getModelsForProvider,
  LLM_PROVIDERS,
  PROVIDER_MODELS
} from './utils/api';

export type { ChatMessage, SendMessageOptions, RouterConfig } from './utils/api';
