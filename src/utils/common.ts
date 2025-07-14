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
  },
  glass: {
    header: 'bg-white/70 backdrop-blur-md text-gray-800 border-b border-white/30',
    body: 'bg-gradient-to-br from-blue-50/30 to-purple-50/30 backdrop-blur-sm text-gray-900',
    footer: 'bg-white/70 backdrop-blur-md border-t border-white/30',
    primary: 'bg-slate-900/20 backdrop-blur-md hover:bg-slate-900/30 text-gray-800 border border-white/40',
    user: 'bg-blue-500/20 backdrop-blur-md text-blue-900 ml-auto border border-blue-300/40',
    bot: 'bg-white/30 backdrop-blur-md text-gray-900 mr-auto border border-white/40',
    scrollThumb: 'rgba(59, 130, 246, 0.6)',
    scrollTrack: 'rgba(255, 255, 255, 0.1)',
    input: 'bg-white/20 backdrop-blur-md border-white/40 text-gray-900 placeholder-gray-500',
    inputText: 'text-gray-900',
    text: 'text-gray-900',
    secondaryText: 'text-gray-600',
    shadow: 'shadow-xl shadow-blue-200/20',
    border: 'border-white/30',
    icon: 'text-gray-600 ',
    userBackground: 'bg-blue-500/20 backdrop-blur-md',
    botBackground: 'bg-white/30 backdrop-blur-md',
    userText: 'text-blue-900',
    botText: 'text-gray-900',
    buttonHover: 'hover:bg-white/30',
    darkMode: {
      header: 'bg-gray-900/70 backdrop-blur-md text-gray-100 border-b border-gray-700/50',
      body: 'bg-gradient-to-br from-gray-900/30 to-blue-900/30 backdrop-blur-sm text-gray-100',
      footer: 'bg-gray-900/70 backdrop-blur-md border-t border-gray-700/50',
      primary: 'bg-gray-800/20 backdrop-blur-md hover:bg-gray-700/30 text-gray-100 border border-gray-600/40',
      user: 'bg-blue-600/20 backdrop-blur-md text-blue-100 ml-auto border border-blue-500/40',
      bot: 'bg-gray-800/30 backdrop-blur-md text-gray-100 mr-auto border border-gray-600/40',
      scrollThumb: 'rgba(99, 102, 241, 0.6)',
      scrollTrack: 'rgba(0, 0, 0, 0.2)',
      input: 'bg-gray-800/20 backdrop-blur-md border-gray-600/40 text-gray-100 placeholder-gray-400',
      inputText: 'text-gray-100',
      text: 'text-gray-100',
      secondaryText: 'text-gray-300',
      shadow: 'shadow-xl shadow-black/20',
      border: 'border-gray-700/40',
      icon: 'text-gray-300',
      userBackground: 'bg-blue-600/20 backdrop-blur-md',
      botBackground: 'bg-gray-800/30 backdrop-blur-md',
      userText: 'text-blue-100',
      botText: 'text-gray-100',
      buttonHover: 'hover:bg-gray-700/30',
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
