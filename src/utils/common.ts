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
    url: 'https://cdn.openai.com/api',
    apiVersion: 'v1',
    features: ['chat', 'completions', 'embeddings', 'fine-tuning'],
    supportsStreaming: true,
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

/**
 * Available theme configurations for the chat component
 */
export const THEME_CONFIGS: Record<string, PGPTThemeConfig> = {
  light: {
    header: "bg-white border-gray-200",
    body: "bg-gray-50",
    footer: "bg-white border-gray-200",
    primary: "bg-blue-500 hover:bg-blue-600",
    user: "bg-blue-600 text-white",
    bot: "bg-gray-200 text-gray-800",
    scrollThumb: "bg-gray-400",
    scrollTrack: "bg-gray-200",
    input: "bg-white border-gray-300 focus:ring-blue-500",
    inputText: "text-gray-900",
    text: "text-gray-900",
    secondaryText: "text-gray-600",
    shadow: "shadow-md",
    border: "border-gray-300",
    icon: "text-blue-500",
    userBackground: "bg-blue-600",
    botBackground: "bg-gray-200",
    userText: "text-white",
    botText: "text-gray-800",
    buttonHover: "hover:bg-blue-600",
    darkMode: {
      header: "bg-gray-800 border-gray-700",
      body: "bg-gray-900",
      footer: "bg-gray-800 border-gray-700",
      primary: "bg-blue-600 hover:bg-blue-700",
      user: "bg-blue-600 text-white",
      bot: "bg-gray-700 text-gray-100",
      scrollThumb: "bg-gray-600",
      scrollTrack: "bg-gray-800",
      input: "bg-gray-700 border-gray-600 focus:ring-blue-500",
      inputText: "text-gray-100",
      text: "text-gray-100",
      secondaryText: "text-gray-400",
      shadow: "shadow-lg shadow-gray-900/50",
      border: "border-gray-700",
      icon: "text-blue-400",
      userBackground: "bg-blue-600",
      botBackground: "bg-gray-700",
      userText: "text-white",
      botText: "text-gray-100",
      buttonHover: "hover:bg-blue-700"
    }
  },
  dark: {
    header: "bg-gray-800 border-gray-700",
    body: "bg-gray-900",
    footer: "bg-gray-800 border-gray-700",
    primary: "bg-purple-600 hover:bg-purple-700",
    user: "bg-purple-600 text-white",
    bot: "bg-gray-700 text-gray-100",
    scrollThumb: "bg-gray-600",
    scrollTrack: "bg-gray-800",
    input: "bg-gray-700 border-gray-600 focus:ring-purple-500",
    inputText: "text-gray-100",
    text: "text-gray-100",
    secondaryText: "text-gray-400",
    shadow: "shadow-lg shadow-gray-900/50",
    border: "border-gray-700",
    icon: "text-purple-400"
  },
  blue: {
    header: "bg-blue-800 border-blue-700",
    body: "bg-gradient-to-b from-blue-50 to-blue-100",
    footer: "bg-blue-800 border-blue-700",
    primary: "bg-blue-600 hover:bg-blue-700",
    user: "bg-blue-600 text-white",
    bot: "bg-white text-blue-900",
    scrollThumb: "bg-blue-400",
    scrollTrack: "bg-blue-100",
    input: "bg-white border-blue-300 focus:ring-blue-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-blue-100",
    shadow: "shadow-lg shadow-blue-900/20",
    border: "border-blue-200",
    icon: "text-blue-300"
  },
  purple: {
    header: "bg-purple-800 border-purple-700",
    body: "bg-gradient-to-b from-purple-50 to-purple-100",
    footer: "bg-purple-800 border-purple-700",
    primary: "bg-purple-600 hover:bg-purple-700",
    user: "bg-purple-600 text-white",
    bot: "bg-white text-purple-900",
    scrollThumb: "bg-purple-400",
    scrollTrack: "bg-purple-100",
    input: "bg-white border-purple-300 focus:ring-purple-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-purple-100",
    shadow: "shadow-lg shadow-purple-900/20",
    border: "border-purple-200",
    icon: "text-purple-300"
  },
  green: {
    header: "bg-emerald-800 border-emerald-700",
    body: "bg-gradient-to-b from-emerald-50 to-emerald-100",
    footer: "bg-emerald-800 border-emerald-700",
    primary: "bg-emerald-600 hover:bg-emerald-700",
    user: "bg-emerald-600 text-white",
    bot: "bg-white text-emerald-900",
    scrollThumb: "bg-emerald-400",
    scrollTrack: "bg-emerald-100",
    input: "bg-white border-emerald-300 focus:ring-emerald-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-emerald-100",
    shadow: "shadow-lg shadow-emerald-900/20",
    border: "border-emerald-200",
    icon: "text-emerald-300"
  },
  amber: {
    header: "bg-amber-800 border-amber-700",
    body: "bg-gradient-to-b from-amber-50 to-amber-100",
    footer: "bg-amber-800 border-amber-700",
    primary: "bg-amber-600 hover:bg-amber-700",
    user: "bg-amber-600 text-white",
    bot: "bg-white text-amber-900",
    scrollThumb: "bg-amber-400",
    scrollTrack: "bg-amber-100",
    input: "bg-white border-amber-300 focus:ring-amber-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-amber-100",
    shadow: "shadow-lg shadow-amber-900/20",
    border: "border-amber-200",
    icon: "text-amber-300"
  },
  teal: {
    header: "bg-teal-800 border-teal-700",
    body: "bg-gradient-to-b from-teal-50 to-teal-100",
    footer: "bg-teal-800 border-teal-700",
    primary: "bg-teal-600 hover:bg-teal-700",
    user: "bg-teal-600 text-white",
    bot: "bg-white text-teal-900",
    scrollThumb: "bg-teal-400",
    scrollTrack: "bg-teal-100",
    input: "bg-white border-teal-300 focus:ring-teal-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-teal-100",
    shadow: "shadow-lg shadow-teal-900/20",
    border: "border-teal-200",
    icon: "text-teal-300"
  },
  indigo: {
    header: "bg-indigo-800 border-indigo-700",
    body: "bg-gradient-to-b from-indigo-50 to-indigo-100",
    footer: "bg-indigo-800 border-indigo-700",
    primary: "bg-indigo-600 hover:bg-indigo-700",
    user: "bg-indigo-600 text-white",
    bot: "bg-white text-indigo-900",
    scrollThumb: "bg-indigo-400",
    scrollTrack: "bg-indigo-100",
    input: "bg-white border-indigo-300 focus:ring-indigo-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-indigo-100",
    shadow: "shadow-lg shadow-indigo-900/20",
    border: "border-indigo-200",
    icon: "text-indigo-300"
  },
  red: {
    header: "bg-red-800 border-red-700",
    body: "bg-gradient-to-b from-red-50 to-red-100",
    footer: "bg-red-800 border-red-700",
    primary: "bg-red-600 hover:bg-red-700",
    user: "bg-red-600 text-white",
    bot: "bg-white text-red-900",
    scrollThumb: "bg-red-400",
    scrollTrack: "bg-red-100",
    input: "bg-white border-red-300 focus:ring-red-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-red-100",
    shadow: "shadow-lg shadow-red-900/20",
    border: "border-red-200",
    icon: "text-red-300"
  },
  pink: {
    header: "bg-pink-800 border-pink-700",
    body: "bg-gradient-to-b from-pink-50 to-pink-100",
    footer: "bg-pink-800 border-pink-700",
    primary: "bg-pink-600 hover:bg-pink-700",
    user: "bg-pink-600 text-white",
    bot: "bg-white text-pink-900",
    scrollThumb: "bg-pink-400",
    scrollTrack: "bg-pink-100",
    input: "bg-white border-pink-300 focus:ring-pink-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-pink-100",
    shadow: "shadow-lg shadow-pink-900/20",
    border: "border-pink-200",
    icon: "text-pink-300"
  },
  slate: {
    header: "bg-slate-800 border-slate-700",
    body: "bg-gradient-to-b from-slate-50 to-slate-200",
    footer: "bg-slate-800 border-slate-700",
    primary: "bg-slate-600 hover:bg-slate-700",
    user: "bg-slate-600 text-white",
    bot: "bg-white text-slate-900",
    scrollThumb: "bg-slate-400",
    scrollTrack: "bg-slate-100",
    input: "bg-white border-slate-300 focus:ring-slate-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-slate-100",
    shadow: "shadow-lg shadow-slate-900/20",
    border: "border-slate-200",
    icon: "text-slate-300"
  },
  midnight: {
    header: "bg-gray-900 border-gray-800",
    body: "bg-gray-800",
    footer: "bg-gray-900 border-gray-800",
    primary: "bg-blue-500 hover:bg-blue-600",
    user: "bg-blue-500 text-white",
    bot: "bg-gray-700 text-gray-100",
    scrollThumb: "bg-gray-600",
    scrollTrack: "bg-gray-700",
    input: "bg-gray-800 border-gray-700 focus:ring-blue-500",
    inputText: "text-gray-100",
    text: "text-gray-100",
    secondaryText: "text-gray-400",
    shadow: "shadow-xl shadow-black/30",
    border: "border-gray-800",
    icon: "text-blue-400"
  },
  sunset: {
    header: "bg-gradient-to-r from-orange-600 to-red-600 border-orange-700",
    body: "bg-gradient-to-b from-orange-50 to-red-50",
    footer: "bg-gradient-to-r from-orange-600 to-red-600 border-orange-700",
    primary: "bg-orange-500 hover:bg-orange-600",
    user: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
    bot: "bg-white text-orange-900",
    scrollThumb: "bg-orange-400",
    scrollTrack: "bg-orange-100",
    input: "bg-white border-orange-300 focus:ring-orange-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-orange-100",
    shadow: "shadow-lg shadow-orange-900/20",
    border: "border-orange-200",
    icon: "text-orange-200"
  },
  // New themes below
  chatgpt: {
    header: "bg-white border-[#e5e5e5]",
    body: "bg-white",
    footer: "bg-white border-[#e5e5e5]",
    primary: "bg-[#10a37f] hover:bg-[#0e9171]",
    user: "bg-blue-50 text-gray-800 border border-blue-100",
    bot: "bg-white text-gray-800 border border-gray-100",
    scrollThumb: "bg-[#d9d9e3]",
    scrollTrack: "bg-[#f5f5f5]",
    input: "bg-white border-[#e5e5e5] focus:ring-0 text-gray-700",
    inputText: "text-gray-800",
    text: "text-gray-800",
    secondaryText: "text-gray-500",
    shadow: "shadow-md shadow-gray-200/50",
    border: "border-[#e5e5e5]",
    icon: "text-[#10a37f]",
    buttonHover: "hover:bg-black hover:text-white bg-gray-100 text-black",
    userBackground: "bg-blue-50",
    botBackground: "bg-white",
    userText: "text-gray-800",
    botText: "text-gray-800",
    darkMode: {
      header: "bg-[#343541] border-[#2a2b36]",
      body: "bg-[#343541]",
      footer: "bg-[#343541] border-[#444654]",
      primary: "bg-[#10a37f] hover:bg-[#0e9171]",
      user: "bg-[#343541] text-white border border-[#444654]",
      bot: "bg-[#444654] text-gray-100",
      scrollThumb: "bg-[#565869]",
      scrollTrack: "bg-[#444654]",
      input: "bg-[#40414f] border-[#40414f] focus:ring-[#10a37f] text-gray-300",
      inputText: "text-gray-100",
      text: "text-gray-100",
      secondaryText: "text-gray-400",
      shadow: "shadow-lg shadow-black/20",
      border: "border-[#444654]",
      icon: "text-[#10a37f]",
      buttonHover: "hover:bg-black hover:text-white bg-gray-100 text-black",
      userBackground: "bg-[#343541]",
      botBackground: "bg-[#444654]",
      userText: "text-white",
      botText: "text-gray-100"
    }
  },
  gemini: {
    header: "bg-white border-[#e5e5e5]",
    body: "bg-white",
    footer: "bg-white border-[#e5e5e5]",
    primary: "bg-[#8e44ad] hover:bg-[#9b59b6]",
    user: "bg-purple-50 text-gray-800 border border-purple-100",
    bot: "bg-white text-gray-800 border border-gray-100",
    scrollThumb: "bg-[#d9d9e3]",
    scrollTrack: "bg-[#f5f5f5]",
    input: "bg-white border-[#e5e5e5] focus:ring-[#8e44ad] text-gray-700",
    inputText: "text-gray-800",
    text: "text-gray-800",
    secondaryText: "text-gray-500",
    shadow: "shadow-md shadow-gray-200/50",
    border: "border-[#e5e5e5]",
    icon: "text-[#8e44ad]",
    buttonHover: "hover:bg-[#9b59b6]",
    userBackground: "bg-purple-50",
    botBackground: "bg-white",
    userText: "text-gray-800",
    botText: "text-gray-800",
    darkMode: {
      header: "bg-[#1f1f1f] border-[#303030]",
      body: "bg-[#1f1f1f]",
      footer: "bg-[#1f1f1f] border-[#303030]",
      primary: "bg-[#8e44ad] hover:bg-[#9b59b6]",
      user: "bg-[#303030] text-white",
      bot: "bg-[#1f1f1f] text-white border border-[#444]",
      scrollThumb: "bg-[#555]",
      scrollTrack: "bg-[#333]",
      input: "bg-[#303030] border-[#444] focus:ring-[#8e44ad]",
      inputText: "text-white",
      text: "text-white",
      secondaryText: "text-gray-400",
      shadow: "shadow-lg shadow-black/30",
      border: "border-[#444]",
      icon: "text-[#9b59b6]",
      buttonHover: "hover:bg-[#9b59b6]",
      userBackground: "bg-[#303030]",
      botBackground: "bg-[#1f1f1f]",
      userText: "text-white",
      botText: "text-white"
    }
  },
  grok: {
    header: "bg-white border-[#e5e5e5]",
    body: "bg-white",
    footer: "bg-white border-[#e5e5e5]",
    primary: "bg-[#ff4500] hover:bg-[#ff5722]",
    user: "bg-orange-50 text-gray-800 border border-orange-100",
    bot: "bg-white text-gray-800 border border-gray-100",
    scrollThumb: "bg-[#d9d9e3]",
    scrollTrack: "bg-[#f5f5f5]",
    input: "bg-white border-[#e5e5e5] focus:ring-[#ff4500] text-gray-700",
    inputText: "text-gray-800",
    text: "text-gray-800",
    secondaryText: "text-gray-500",
    shadow: "shadow-md shadow-gray-200/50",
    border: "border-[#e5e5e5]",
    icon: "text-[#ff4500]",
    buttonHover: "hover:bg-[#ff5722]",
    userBackground: "bg-orange-50",
    botBackground: "bg-white",
    userText: "text-gray-800",
    botText: "text-gray-800",
    darkMode: {
      header: "bg-[#000000] border-[#333]",
      body: "bg-[#000000]",
      footer: "bg-[#000000] border-[#333]",
      primary: "bg-[#ff4500] hover:bg-[#ff5722]",
      user: "bg-[#1a1a1a] text-white",
      bot: "bg-[#333] text-white",
      scrollThumb: "bg-[#ff4500]",
      scrollTrack: "bg-[#222]",
      input: "bg-[#1a1a1a] border-[#333] focus:ring-[#ff4500]",
      inputText: "text-white",
      text: "text-white",
      secondaryText: "text-gray-400",
      shadow: "shadow-lg shadow-black/40",
      border: "border-[#333]",
      icon: "text-[#ff4500]",
      buttonHover: "hover:bg-[#ff5722]",
      userBackground: "bg-[#1a1a1a]",
      botBackground: "bg-[#333]",
      userText: "text-white",
      botText: "text-white"
    }
  },
  copilot: {
    header: "bg-[#1e1e1e] border-[#333]",
    body: "bg-[#1e1e1e]",
    footer: "bg-[#1e1e1e] border-[#333]",
    primary: "bg-[#0078d4] hover:bg-[#106ebe]",
    user: "bg-[#2d2d2d] text-white",
    bot: "bg-[#0078d4] bg-opacity-20 text-white border border-[#0078d4] border-opacity-30",
    scrollThumb: "bg-[#0078d4]",
    scrollTrack: "bg-[#252525]",
    input: "bg-[#252525] border-[#3e3e3e] focus:ring-[#0078d4]",
    inputText: "text-white",
    text: "text-white",
    secondaryText: "text-gray-400",
    shadow: "shadow-lg shadow-black/30",
    border: "border-[#333]",
    icon: "text-[#0078d4]"
  },
  claude: {
    header: "bg-[#000] border-[#222]",
    body: "bg-[#000]",
    footer: "bg-[#000] border-[#222]",
    primary: "bg-[#8a3ffc] hover:bg-[#7535db]",
    user: "bg-[#222] text-white",
    bot: "bg-[#111] text-white border border-[#333]",
    scrollThumb: "bg-[#8a3ffc]",
    scrollTrack: "bg-[#181818]",
    input: "bg-[#222] border-[#444] focus:ring-[#8a3ffc]",
    inputText: "text-white",
    text: "text-white",
    secondaryText: "text-gray-400",
    shadow: "shadow-lg shadow-black/30",
    border: "border-[#333]",
    icon: "text-[#8a3ffc]",
    buttonHover: "hover:bg-[#7535db]",
    userBackground: "bg-[#222]",
    botBackground: "bg-[#111]",
    userText: "text-white",
    botText: "text-white"
  },
  gold: {
    header: "bg-gradient-to-r from-amber-700 to-yellow-600 border-amber-700",
    body: "bg-gradient-to-b from-amber-100 to-yellow-100",
    footer: "bg-gradient-to-r from-amber-700 to-yellow-600 border-amber-700",
    primary: "bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600",
    user: "bg-gradient-to-r from-amber-600 to-yellow-500 text-white",
    bot: "bg-white text-amber-900 border border-amber-300",
    scrollThumb: "bg-amber-400",
    scrollTrack: "bg-amber-100",
    input: "bg-white border-amber-300 focus:ring-amber-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-amber-100",
    shadow: "shadow-lg shadow-amber-900/20",
    border: "border-amber-300",
    icon: "text-amber-300",
    animation: "animate-gradient",
    userBackground: "bg-gradient-to-r from-amber-600 to-yellow-500",
    botBackground: "bg-white",
    userText: "text-white",
    botText: "text-amber-900",
    buttonHover: "hover:from-amber-700 hover:to-yellow-600"
  },
  silver: {
    header: "bg-gradient-to-r from-gray-700 to-gray-600 border-gray-700",
    body: "bg-gradient-to-b from-gray-100 to-gray-200",
    footer: "bg-gradient-to-r from-gray-700 to-gray-600 border-gray-700",
    primary: "bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600",
    user: "bg-gradient-to-r from-gray-600 to-gray-500 text-white",
    bot: "bg-white text-gray-900 border border-gray-300",
    scrollThumb: "bg-gray-400",
    scrollTrack: "bg-gray-100",
    input: "bg-white border-gray-300 focus:ring-gray-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-gray-300",
    shadow: "shadow-lg shadow-gray-900/20",
    border: "border-gray-300",
    icon: "text-gray-300",
    userBackground: "bg-gradient-to-r from-gray-600 to-gray-500",
    botBackground: "bg-white",
    userText: "text-white",
    botText: "text-gray-900",
    buttonHover: "hover:from-gray-700 hover:to-gray-600"
  },
  titanium: {
    header: "bg-gradient-to-r from-slate-800 to-slate-700 border-slate-700",
    body: "bg-gradient-to-b from-slate-200 to-slate-300",
    footer: "bg-gradient-to-r from-slate-800 to-slate-700 border-slate-700",
    primary: "bg-slate-700 hover:bg-slate-800",
    user: "bg-slate-700 text-white",
    bot: "bg-white text-slate-900 border border-slate-300",
    scrollThumb: "bg-slate-500",
    scrollTrack: "bg-slate-200",
    input: "bg-white border-slate-300 focus:ring-slate-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-slate-300",
    shadow: "shadow-lg shadow-slate-900/20",
    border: "border-slate-300",
    icon: "text-slate-300"
  },
  premium: {
    header: "bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 border-gray-800",
    body: "bg-gradient-to-b from-gray-100 to-purple-100",
    footer: "bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 border-gray-800",
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
    user: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
    bot: "bg-white text-gray-900 border border-purple-200",
    scrollThumb: "bg-purple-400",
    scrollTrack: "bg-purple-100",
    input: "bg-white border-purple-200 focus:ring-purple-500",
    inputText: "text-gray-800",
    text: "text-white",
    secondaryText: "text-purple-100",
    shadow: "shadow-lg shadow-purple-900/20",
    border: "border-purple-200",
    icon: "text-purple-300",
    animation: "animate-gradient",
    userBackground: "bg-gradient-to-r from-indigo-600 to-purple-600",
    botBackground: "bg-white",
    userText: "text-white",
    botText: "text-gray-900",
    buttonHover: "hover:from-indigo-700 hover:to-purple-700"
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

/**
 * Default position for the chat button
 */
export const DEFAULT_BUTTON_POSITION = 'bottom-right';

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
