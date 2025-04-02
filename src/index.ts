// Components
export { default as PGPT } from './components/PGPT';
export { default as TypewriterText } from './components/TypewriterText';

// Re-exporting types directly since they're not exported from PGPT
import type { PGPTCustomStyles, PGPTThemeConfig } from './utils/common';
import type { ChatMessage } from './utils/api';

// Define the types that should be exported
export type PGPTPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
export type PGPTTheme = string;
export type PGPTLayout = 'popup' | 'sidebar' | 'normal';
export type PGPTButtonSize = 'small' | 'medium' | 'large';
export type PGPTRole = string;
export type PGPTLLMProvider = string;
export type PGPTChatMessage = ChatMessage;

// Export the PGPTProps interface
export interface PGPTProps {
  apiKey: string;
  llmProvider?: string;
  model?: string;
  placeholder?: string;
  title?: string;
  subtitle?: string;
  theme?: string;
  position?: PGPTPosition;
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
}

// Utility exports
export {
  THEME_CONFIGS
} from './utils/common';

export type { PGPTCustomStyles, PGPTThemeConfig };

// Export the API utilities
export {
  sendMessage,
  getModelsForProvider,
  LLM_PROVIDERS,
  PROVIDER_MODELS
} from './utils/api';

export type { ChatMessage, SendMessageOptions } from './utils/api';
