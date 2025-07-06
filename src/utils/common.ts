/**
 * List of popular LLM CDN providers with their key-value configurations
 */
export interface LlmCdnConfig {
  name: string;
  url: string;
  apiVersion?: string;
  features: string[];
  supportsStreaming: boolean;
}

/**
 * Array of LLM CDN providers with their configurations
 */
export const LLM_CDN_PROVIDERS: LlmCdnConfig[] = [
  {
    name: 'OpenAI',
    url: 'https://api.openai.com/v1',
    apiVersion: 'v1',
    features: ['chat', 'completions', 'embeddings', 'fine-tuning'],
    supportsStreaming: true,
  },
  {
    name: 'Gemini',
    url: 'https://generativelanguage.googleapis.com/v1beta',
    apiVersion: 'v1beta',
    features: ['chat', 'completions', 'vision', 'multimodal'],
    supportsStreaming: false,
  }
];

/**
 * Get an LLM CDN provider by name
 * @param name The name of the provider
 * @returns The provider configuration or undefined if not found
 */
export const getLlmCdnProvider = (name: string): LlmCdnConfig | undefined => {
  return LLM_CDN_PROVIDERS.find(provider => 
    provider.name.toLowerCase() === name.toLowerCase()
  );
};

/**
 * Theme configuration interface for the chat component
 */
export interface PGPTThemeConfig {
  header: string;
  body: string;
  footer: string;
  primary: string;
  user: string;
  bot: string;
  scrollThumb: string;
  scrollTrack: string;
  input: string;
  inputText: string;
  text: string;
  secondaryText: string;
  shadow: string;
  border: string;
  icon: string;
  animation?: string;
  userBackground?: string;
  botBackground?: string;
  userText?: string;
  botText?: string;
  buttonHover?: string;
  darkMode?: PGPTThemeConfig;
}

/**
 * Custom styles interface to override default theme styles
 */
export interface PGPTCustomStyles {
  chatContainer?: React.CSSProperties;
  header?: React.CSSProperties;
  footer?: React.CSSProperties;
  body?: React.CSSProperties;
  logo?: React.CSSProperties;
  title?: React.CSSProperties;
  subtitle?: React.CSSProperties;
  userBubble?: React.CSSProperties;
  botBubble?: React.CSSProperties;
  input?: React.CSSProperties;
  sendButton?: React.CSSProperties;
  chatButton?: React.CSSProperties;
}

// Position types - only 3 positions allowed
export type PositionType = 'bottom-left' | 'bottom-right' | 'fullscreen';

/**
 * Available theme configurations for the chat component
 */
export const THEME_CONFIGS: Record<string, PGPTThemeConfig> = {
  silver: {
    header: 'bg-gray-100 text-gray-800 border-b border-gray-300',
    body: 'bg-gray-50 text-gray-900',
    footer: 'bg-gray-100 border-t border-gray-300',
    primary: 'bg-gray-700 hover:bg-gray-800 text-white',
    user: 'bg-gray-700 text-white ml-auto',
    bot: 'bg-white text-gray-900 mr-auto border border-gray-200',
    scrollThumb: '#9ca3af',
    scrollTrack: '#f3f4f6',
    input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-400',
    inputText: 'text-gray-900',
    text: 'text-gray-900',
    secondaryText: 'text-gray-600',
    shadow: 'shadow-md',
    border: 'border-gray-300',
    icon: 'text-gray-500',
    userBackground: 'bg-gray-700',
    botBackground: 'bg-white',
    userText: 'text-white',
    botText: 'text-gray-900',
    buttonHover: 'hover:bg-gray-800',
    darkMode: {
      header: 'bg-slate-800 text-slate-200 border-b border-slate-700',
      body: 'bg-slate-900 text-slate-100',
      footer: 'bg-slate-800 border-t border-slate-700',
      primary: 'bg-slate-600 hover:bg-slate-500 text-white',
      user: 'bg-slate-600 text-white ml-auto',
      bot: 'bg-slate-800 text-slate-200 mr-auto border border-slate-700',
      scrollThumb: '#64748b',
      scrollTrack: '#0f172a',
      input: 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400',
      inputText: 'text-slate-100',
      text: 'text-slate-100',
      secondaryText: 'text-slate-300',
      shadow: 'shadow-2xl',
      border: 'border-slate-700',
      icon: 'text-slate-400',
      userBackground: 'bg-slate-600',
      botBackground: 'bg-slate-800',
      userText: 'text-white',
      botText: 'text-slate-200',
      buttonHover: 'hover:bg-slate-500',
    }
  },
  premium: {
    header: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-b border-purple-500',
    body: 'bg-gradient-to-br from-purple-50 to-blue-50 text-gray-900',
    footer: 'bg-gradient-to-r from-purple-100 to-blue-100 border-t border-purple-300',
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white',
    user: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white ml-auto',
    bot: 'bg-white text-gray-900 mr-auto border border-purple-200 shadow-sm',
    scrollThumb: '#a855f7',
    scrollTrack: '#faf5ff',
    input: 'bg-white border-purple-300 text-gray-900 placeholder-purple-400',
    inputText: 'text-gray-900',
    text: 'text-gray-900',
    secondaryText: 'text-purple-700',
    shadow: 'shadow-xl',
    border: 'border-purple-200',
    icon: 'text-purple-600',
    userBackground: 'bg-gradient-to-r from-purple-600 to-blue-600',
    botBackground: 'bg-white',
    userText: 'text-white',
    botText: 'text-gray-900',
    buttonHover: 'hover:from-purple-700 hover:to-blue-700',
    darkMode: {
      header: 'bg-gradient-to-r from-purple-900 to-blue-900 text-white border-b border-purple-800',
      body: 'bg-gradient-to-br from-purple-950 to-blue-950 text-white',
      footer: 'bg-gradient-to-r from-purple-900 to-blue-900 border-t border-purple-800',
      primary: 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white',
      user: 'bg-gradient-to-r from-purple-500 to-blue-500 text-white ml-auto',
      bot: 'bg-gray-800 text-white mr-auto border border-purple-700',
      scrollThumb: '#8b5cf6',
      scrollTrack: '#1e1b4b',
      input: 'bg-gray-800 border-purple-700 text-white placeholder-purple-400',
      inputText: 'text-white',
      text: 'text-white',
      secondaryText: 'text-purple-300',
      shadow: 'shadow-2xl',
      border: 'border-purple-800',
      icon: 'text-purple-400',
      userBackground: 'bg-gradient-to-r from-purple-500 to-blue-500',
      botBackground: 'bg-gray-800',
      userText: 'text-white',
      botText: 'text-white',
      buttonHover: 'hover:from-purple-400 hover:to-blue-400',
    }
  },
  titanium: {
    header: 'bg-zinc-100 text-zinc-900 border-b border-zinc-300',
    body: 'bg-zinc-50 text-zinc-900',
    footer: 'bg-zinc-100 border-t border-zinc-300',
    primary: 'bg-zinc-800 hover:bg-zinc-900 text-white',
    user: 'bg-zinc-800 text-white ml-auto',
    bot: 'bg-white text-zinc-900 mr-auto border border-zinc-200 shadow-sm',
    scrollThumb: '#a1a1aa',
    scrollTrack: '#fafafa',
    input: 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400',
    inputText: 'text-zinc-900',
    text: 'text-zinc-900',
    secondaryText: 'text-zinc-600',
    shadow: 'shadow-lg',
    border: 'border-zinc-300',
    icon: 'text-zinc-600',
    userBackground: 'bg-zinc-800',
    botBackground: 'bg-white',
    userText: 'text-white',
    botText: 'text-zinc-900',
    buttonHover: 'hover:bg-zinc-900',
    darkMode: {
      header: 'bg-zinc-900 text-zinc-100 border-b border-zinc-800',
      body: 'bg-zinc-950 text-zinc-100',
      footer: 'bg-zinc-900 border-t border-zinc-800',
      primary: 'bg-zinc-700 hover:bg-zinc-600 text-white',
      user: 'bg-zinc-700 text-white ml-auto',
      bot: 'bg-zinc-800 text-zinc-100 mr-auto border border-zinc-700',
      scrollThumb: '#71717a',
      scrollTrack: '#09090b',
      input: 'bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400',
      inputText: 'text-zinc-100',
      text: 'text-zinc-100',
      secondaryText: 'text-zinc-300',
      shadow: 'shadow-2xl',
      border: 'border-zinc-800',
      icon: 'text-zinc-400',
      userBackground: 'bg-zinc-700',
      botBackground: 'bg-zinc-800',
      userText: 'text-white',
      botText: 'text-zinc-100',
      buttonHover: 'hover:bg-zinc-600',
    }
  }
};

/**
 * Default header/title text configurations
 */
export const DEFAULT_HEADER_TEXT = {
  title: "PGPT Assistant",
  subtitle: "AI-powered chat assistant",
  welcomeMessage: "Hello! How can I help you today?",
  placeholderText: "Type your message here...",
  sendButtonText: "Send",
};

/**
 * Default footer text configurations
 */
export const DEFAULT_FOOTER_TEXT = {
  poweredBy: "Powered by p-GPT",
  copyright: `© ${new Date().getFullYear()} P-GPT`,
  privacyText: "Your conversations are private",
  versionText: "v1.0.0",
};

/**
 * Default system message for different roles
 */
export const DEFAULT_SYSTEM_MESSAGES: Record<string, string> = {
  assistant: "You are a helpful AI assistant that provides accurate and concise answers.",
  coder: "You are a coding assistant that helps with programming questions and provides code examples.",
  writer: "You are a writing assistant that helps improve text, offers suggestions, and assists with creative writing.",
  teacher: "You are an educational assistant that explains concepts clearly and helps with learning.",
  researcher: "You are a research assistant that provides well-researched information and cites sources when possible.",
  translator: "You are a translation assistant that helps translate text between different languages accurately.",
  supporter: "You are a friendly customer support agent who helps users solve their problems with patience and empathy.",
  advisor: "You are a knowledgeable advisor who provides thoughtful guidance and recommendations.",
};

// Default button position
export const DEFAULT_BUTTON_POSITION: PositionType = 'bottom-right';

// Default theme
export const DEFAULT_THEME = 'silver';

/**
 * Available icon sizes
 */
export const ICON_SIZES = {
  small: 'h-8 w-8',
  medium: 'h-10 w-10',
  large: 'h-12 w-12',
};

/**
 * Available storage types
 */
export const STORAGE_TYPES = {
  LOCAL: 'localStorage',
  SESSION: 'sessionStorage',
  NONE: 'none',
  CUSTOM: 'custom'
};

/**
 * Available appearance modes
 */
export const APPEARANCE_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

/**
 * Available open triggers for the chat
 */
export const OPEN_TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover'
};
