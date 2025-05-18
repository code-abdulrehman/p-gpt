// This file is no longer needed for a website. 
// We're using main.tsx as the entry point

// Types (needed for local imports)
export type { PGPTThemeConfig } from './utils/common';
export { THEME_CONFIGS } from './utils/common';
export type { PGPTCustomStyles } from './utils/common';

// Export constants needed by components
export { 
  APPEARANCE_MODES,
  STORAGE_TYPES, 
  OPEN_TRIGGERS 
} from './utils/common';

// Import and types from './utils/api'
import type { ChatMessage, RouterConfig, SendMessageOptions } from './utils/api';
export type { ChatMessage, RouterConfig, SendMessageOptions };

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

// Export the API utilities
export {
  sendMessage,
  getModelsForProvider,
  LLM_PROVIDERS,
  PROVIDER_MODELS
} from './utils/api';
