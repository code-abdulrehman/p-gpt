// Components
export { default as PBot } from './components/PBotNew';
export { default as TypewriterText } from './components/TypewriterText';

// Re-exporting types directly since they're not exported from PBotNew
import type { PBotCustomStyles, PBotThemeConfig } from './utils/common';
import type { ChatMessage } from './utils/api';

// Define the types that should be exported
export type PBotPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
export type PBotTheme = string;
export type PBotLayout = 'popup' | 'sidebar' | 'normal';
export type PBotButtonSize = 'small' | 'medium' | 'large';
export type PBotRole = string;
export type PBotLLMProvider = string;
export type PBotChatMessage = ChatMessage;

// Export the PBotProps interface
export interface PBotProps {
  apiKey: string;
  llmProvider?: string;
  model?: string;
  placeholder?: string;
  title?: string;
  subtitle?: string;
  theme?: string;
  position?: PBotPosition;
  welcomeMessage?: string;
  buttonSize?: PBotButtonSize;
  initiallyOpen?: boolean;
  role?: string;
  rules?: string[];
  customLogo?: React.ReactNode;
  minHeight?: string;
  maxHeight?: string;
  chatLayout?: PBotLayout;
  systemMessage?: string;
  customStyles?: PBotCustomStyles;
  showLabelWithLogo?: boolean;
  fixedHeight?: string;
  errorColor?: string;
  warningColor?: string;
  enableTypingAnimation?: boolean;
}

// Utility exports
export {
  THEME_CONFIGS
} from './utils/common';

export type { PBotCustomStyles, PBotThemeConfig };

// Export the API utilities
export {
  sendMessage,
  getModelsForProvider,
  LLM_PROVIDERS,
  PROVIDER_MODELS
} from './utils/api';

export type { ChatMessage, SendMessageOptions } from './utils/api';

export {
  useLocalStorage,
  getAllPBotConversations,
  clearPBotConversation,
  clearAllPBotConversations
} from './utils/useLocalStorage'; 