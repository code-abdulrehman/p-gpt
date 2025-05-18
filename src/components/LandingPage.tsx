import React, { useState, useEffect } from 'react';
import {
  FaRobot, FaCode, FaGithub, FaNpm, FaCreditCard, FaDownload, FaGraduationCap, FaHeadset,
  FaWrench, FaCopy, FaCheck, FaInfoCircle, FaSun, FaMoon, FaTable, FaExclamationTriangle
} from "react-icons/fa";
import { Highlight, themes } from 'prism-react-renderer';
import PGPT from './PGPT';

// Define position types to match PGPT component
type PositionType = 
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

// Define theme types to match available themes in PGPT
type ThemeType = 
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'teal'
  | 'indigo'
  | 'amber'
  | 'chatgpt'
  | 'gemini'
  | 'grok'
  | 'copilot'
  | 'claude'
  | 'gold'
  | 'silver'
  | 'titanium'
  | 'premium'
  | 'light'
  | 'dark'
  | 'slate'
  | 'midnight'
  | 'sunset'
  | 'pink';

// Toast notification component
interface ToastProps {
  message: string;
  type: 'success' | 'info';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Get primary color from parent component context
  const primaryColor = document.documentElement.classList.contains('dark') ?
    (type === 'success' ? 'bg-green-600' : 'bg-indigo-600') :
    (type === 'success' ? 'bg-green-500' : 'bg-teal-500');

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center ${primaryColor} text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300`}>
      <span className="mr-2">
        {type === 'success' ? <FaCheck /> : <FaInfoCircle />}
      </span>
      {message}
    </div>
  );
};

// Example code snippets for display
const basicInstallCode = `npm install p-gpt`;

const basicUsageCode = `import { PGPT } from 'p-gpt';
import 'p-gpt/dist/index.css';

function App() {
  return (
    <PGPT apiKey="YOUR_API_KEY" />
  );
}`;

const advancedUsageCode = `import { PGPT } from 'p-gpt';
import 'p-gpt/dist/index.css';

function App() {
  return (
    <PGPT 
      apiKey="YOUR_API_KEY" 
      theme="chatgpt"
      appearance="dark"
      content={{
        title: "Customer Support",
        welcomeMessage: "Hi there! How can I help you today?"
      }}
      enableTypingAnimation={true}
      defaultOpen={false}
    />
  );
}`;

const routerUsageCode = `import { PGPT } from 'p-gpt';
import 'p-gpt/dist/index.css';

function App() {
  return (
    <PGPT 
      routerConfig={{
        endpoint: "/api/chat",
        headers: {
          "x-api-key": "internal-api-key"
        }
      }}
      theme="blue"
    />
  );
}`;

// Props data for documentation
const propsData = [
  {
    category: "Core Props",
    props: [
      {
        name: "apiKey",
        type: "string",
        default: "undefined",
        description: "Your OpenAI API key",
        options: []
      },
      {
        name: "routerConfig",
        type: "object",
        default: "undefined",
        description: "Configuration for using a custom API endpoint",
        options: [
          "endpoint: URL for your backend API",
          "headers: Custom HTTP headers",
          "maxTokens: Token limit",
          "customPayload: Additional parameters"
        ]
      },
      {
        name: "theme",
        type: "string",
        default: "'blue'",
        description: "Theme name (e.g., 'chatgpt', 'blue', 'dark')",
        options: [
          "blue", "green", "red", "purple", "teal", "chatgpt",
          "minimal", "sunset", "gradient-blue", "gradient-purple"
        ]
      },
      {
        name: "appearance",
        type: "string",
        default: "'light'",
        description: "Appearance mode: 'light', 'dark', or 'system'",
        options: ["light", "dark", "system"]
      },
      {
        name: "model",
        type: "string",
        default: "'gpt-4o'",
        description: "OpenAI model to use (e.g., 'gpt-4o', 'gpt-3.5-turbo')",
        options: ["gpt-4o", "gpt-4", "gpt-3.5-turbo", "gpt-4-turbo"]
      },
      {
        name: "position",
        type: "string | object",
        default: "'bottom-right'",
        description: "Chat position or custom position object",
        options: [
          "top-left", "top-right", "bottom-left", "bottom-right", "center",
          "fixed", "left-full-height", "right-full-height", "top-full-width",
          "bottom-full-width", "fullscreen", "custom"
        ]
      }
    ]
  },
  {
    category: "Content Props",
    props: [
      {
        name: "content",
        type: "object",
        default: "{}",
        description: "Configuration for text content (title, subtitle, messages)",
        options: []
      },
      {
        name: "content.title",
        type: "string",
        default: "'PGPT Assistant'",
        description: "Title displayed in the chat header",
        options: []
      },
      {
        name: "content.subtitle",
        type: "string",
        default: "'AI-powered chat assistant'",
        description: "Subtitle displayed in the chat header",
        options: []
      },
      {
        name: "content.welcomeMessage",
        type: "string",
        default: "'Hello! How can I help you today?'",
        description: "First message from the assistant",
        options: []
      },
      {
        name: "content.placeholder",
        type: "string",
        default: "'Type your message here...'",
        description: "Placeholder text for the input field",
        options: []
      },
      {
        name: "content.systemMessage",
        type: "string",
        default: "''",
        description: "System message to control assistant behavior",
        options: []
      }
    ]
  },
  {
    category: "Styling Props",
    props: [
      {
        name: "colors",
        type: "object",
        default: "{}",
        description: "Custom color overrides",
        options: ["primary", "secondary", "background", "text", "userBubble", "botBubble", "error", "warning"]
      },
      {
        name: "classes",
        type: "object",
        default: "{}",
        description: "Custom CSS class overrides",
        options: ["container", "header", "body", "footer", "userBubble", "botBubble", "input", "button"]
      },
      {
        name: "styles",
        type: "object",
        default: "{}",
        description: "Custom inline style overrides",
        options: []
      }
    ]
  },
  {
    category: "Behavior Props",
    props: [
      {
        name: "useTextarea",
        type: "boolean",
        default: "true",
        description: "Use textarea (multi-line) instead of input field",
        options: ["true", "false"]
      },
      {
        name: "enableTypingAnimation",
        type: "boolean",
        default: "true",
        description: "Enable typewriter effect for bot responses",
        options: ["true", "false"]
      },
      {
        name: "defaultOpen",
        type: "boolean",
        default: "false",
        description: "Open the chat automatically on load",
        options: ["true", "false"]
      },
      {
        name: "openTrigger",
        type: "string",
        default: "'click'",
        description: "How to open the chat: 'click' or 'hover'",
        options: ["click", "hover"]
      },
      {
        name: "isCloseable",
        type: "boolean",
        default: "true",
        description: "Allow users to close the chat",
        options: ["true", "false"]
      }
    ]
  },
  {
    category: "Storage Props",
    props: [
      {
        name: "storage",
        type: "object",
        default: "{ type: 'localStorage' }",
        description: "Configuration for message storage",
        options: []
      },
      {
        name: "storage.type",
        type: "string",
        default: "'localStorage'",
        description: "'localStorage', 'sessionStorage', 'none', or 'custom'",
        options: ["localStorage", "sessionStorage", "none", "custom"]
      },
      {
        name: "storage.key",
        type: "string",
        default: "auto-generated",
        description: "Custom key for storing chat history",
        options: []
      },
      {
        name: "storage.getItem",
        type: "function",
        default: "undefined",
        description: "Custom function to retrieve stored messages",
        options: []
      },
      {
        name: "storage.setItem",
        type: "function",
        default: "undefined",
        description: "Custom function to save messages",
        options: []
      }
    ]
  },
  {
    category: "Customization Props",
    props: [
      {
        name: "logo",
        type: "ReactNode",
        default: "undefined",
        description: "Custom logo/icon component",
        options: []
      },
      {
        name: "buttonSize",
        type: "string",
        default: "'medium'",
        description: "Size of chat button: 'small', 'medium', or 'large'",
        options: ["small", "medium", "large"]
      }
    ]
  },
  {
    category: "Advanced Props",
    props: [
      {
        name: "llmProvider",
        type: "string",
        default: "'OpenAI'",
        description: "LLM provider to use",
        options: ["OpenAI"]
      },
      {
        name: "role",
        type: "string",
        default: "'assistant'",
        description: "Role for the bot (assistant, coder, teacher, etc.)",
        options: ["assistant", "coder", "teacher", "customer-support", "sales"]
      },
      {
        name: "rules",
        type: "string[]",
        default: "[]",
        description: "Custom rules to add to system message",
        options: []
      }
    ]
  },
  {
    category: "Layout Props",
    props: [
      {
        name: "chatLayout",
        type: "string",
        default: "'normal'",
        description: "Layout type: 'normal', 'popup', or 'sidebar'",
        options: ["normal", "popup", "sidebar"]
      },
      {
        name: "minHeight",
        type: "string",
        default: "'28rem'",
        description: "Minimum height of chat window",
        options: []
      },
      {
        name: "maxHeight",
        type: "string",
        default: "'80vh'",
        description: "Maximum height of chat window",
        options: []
      },
      {
        name: "fixedHeight",
        type: "string",
        default: "'400px'",
        description: "Fixed height for normal layout",
        options: []
      },
      {
        name: "showLabelWithLogo",
        type: "boolean",
        default: "false",
        description: "Show the first letter of title instead of logo",
        options: ["true", "false"]
      }
    ]
  },
  {
    category: "Event Handlers",
    props: [
      {
        name: "onSendMessage",
        type: "function",
        default: "undefined",
        description: "Callback when user sends a message",
        options: []
      },
      {
        name: "onReceiveMessage",
        type: "function",
        default: "undefined",
        description: "Callback when bot responds",
        options: []
      },
      {
        name: "onOpen",
        type: "function",
        default: "undefined",
        description: "Callback when chat is opened",
        options: []
      },
      {
        name: "onClose",
        type: "function",
        default: "undefined",
        description: "Callback when chat is closed",
        options: []
      }
    ]
  }
];

// The props table component
const PropsTable = ({ category, props, isDark }: { category: string, props: any[], isDark: boolean }) => {
  return (
    <div className="mb-10">
      <h3 className={`text-xl font-bold ${isDark ? 'text-purple-300' : 'text-purple-600'} mb-3`}>{category}</h3>
      <div className="overflow-x-auto">
        <table className={`w-full text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <thead>
            <tr className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <th className="py-3 px-4 text-left font-medium">Prop</th>
              <th className="py-3 px-4 text-left font-medium">Type</th>
              <th className="py-3 px-4 text-left font-medium">Default</th>
              <th className="py-3 px-4 text-left font-medium">Description</th>
              <th className="py-3 px-4 text-left font-medium">Available Options</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop, index) => (
              <tr
                key={prop.name}
                className={`${isDark
                  ? index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                  : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <td className="py-3 px-4 font-mono text-xs">
                  <span className={`${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                    {prop.name}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  <span className={`${isDark ? 'text-yellow-300' : 'text-yellow-600'}`}>
                    {prop.type}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  <span className={`${isDark ? 'text-green-300' : 'text-green-600'}`}>
                    {prop.default}
                  </span>
                </td>
                <td className="py-3 px-4">{prop.description}</td>
                <td className="py-3 px-4">
                  {prop.options && prop.options.length > 0 ? (
                    <div className="max-h-24 overflow-y-auto">
                      {prop.options.map((option: string, idx: number) => (
                        <div key={idx} className="text-xs">
                          {option.includes(":") ? (
                            <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{option}</div>
                          ) : (
                            <code className={`px-1 py-0.5 rounded ${isDark ? 'bg-gray-700 text-purple-300' : 'bg-gray-200 text-purple-600'} mr-1 inline-block mb-1`}>
                              {option}
                            </code>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 italic text-xs">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Code highlighting component with copy functionality
const CodeBlock = ({ code, language, isDark = true }: { code: string, language: string, isDark?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 p-2 rounded-md ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
        aria-label="Copy code"
      >
        {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
      </button>
      <Highlight
        theme={isDark ? themes.nightOwl : themes.github}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 pt-10 rounded-lg overflow-x-auto text-sm`} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line });
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, j) => {
                    const tokenProps = getTokenProps({ token });
                    return <span key={j} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

// Main LandingPage component
const LandingPage = () => {
  // Initialize dark mode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('pgpt-landing-theme');
    return savedTheme ? savedTheme === 'dark' : 'dark';
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<'success' | 'info'>('success');
  const [activeTab, setActiveTab] = useState("installation");
  const [showPropsTable, setShowPropsTable] = useState(true); // Default to open
  const [primaryColor, setPrimaryColor] = useState<'indigo' | 'teal'>(() => {
    const savedColor = localStorage.getItem('pgpt-primary-color');
    return (savedColor === 'indigo' || savedColor === 'teal') ? savedColor as ('indigo' | 'teal') : 'indigo';
  });

  // Demo themes and positions with proper typing
  const [demoTheme, setDemoTheme] = useState<ThemeType>('chatgpt');
  const [demoPosition, setDemoPosition] = useState<PositionType>('bottom-right');
  const [demoChatOpen, setDemoChatOpen] = useState(false);
  
  // New state for the persistent demo chat (visible when scrolling)
  const [persistentChatOpen, setPersistentChatOpen] = useState(false);
  const [showPersistentChat, setShowPersistentChat] = useState(false);

  // Define available demo themes - Update to include only supported themes from PGPT component
  const availableThemes: ThemeType[] = ['blue', 'green', 'red', 'purple', 'teal', 'chatgpt'];

  // Define available positions
  const availablePositions: PositionType[] = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'center'];

  // Define color variables based on selected primary color
  const primaryBg = primaryColor === 'indigo' ? 'bg-indigo-600' : 'bg-teal-600';
  const primaryHoverBg = primaryColor === 'indigo' ? 'hover:bg-indigo-700' : 'hover:bg-teal-700';
  const primaryText = primaryColor === 'indigo' ? 'text-indigo-600' : 'text-teal-600';
  const primaryTextLight = primaryColor === 'indigo' ? 'text-indigo-400' : 'text-teal-400';
  const primaryLightBg = primaryColor === 'indigo' ? 'bg-indigo-100' : 'bg-teal-100';
  const primaryHoverLightBg = primaryColor === 'indigo' ? 'hover:bg-indigo-200' : 'hover:bg-teal-200';
  const primaryLightText = primaryColor === 'indigo' ? 'text-indigo-800' : 'text-teal-800';
  const primaryBorder = primaryColor === 'indigo' ? 'border-indigo-500' : 'border-teal-500';
  const primaryGradient = primaryColor === 'indigo'
    ? 'bg-gradient-to-b from-indigo-500 to-indigo-700'
    : 'bg-gradient-to-b from-teal-500 to-teal-700';

  // Feature tags for hero section with improved styling
  const featureTags = [
    { label: "React", color: darkMode ? "bg-sky-900 text-sky-300 border-sky-700" : "bg-sky-100 text-sky-700 border-sky-300" },
    { label: "OpenAI", color: darkMode ? "bg-gray-900 text-gray-300 border-gray-700" : "bg-gray-100 text-gray-700 border-gray-300" },
    { label: "TypeScript", color: darkMode ? "bg-blue-900 text-blue-300 border-blue-700" : "bg-blue-100 text-blue-700 border-blue-300" },
    { label: "Modern UI", color: darkMode ? `bg-${primaryColor}-900 text-${primaryColor}-300 border-${primaryColor}-700` : `bg-${primaryColor}-100 text-${primaryColor}-700 border-${primaryColor}-300` },
    { label: "Themeable", color: darkMode ? "bg-pink-900 text-pink-300 border-pink-700" : "bg-pink-100 text-pink-700 border-pink-300" },
    { label: "Customizable", color: darkMode ? "bg-amber-900 text-amber-300 border-amber-700" : "bg-amber-100 text-amber-700 border-amber-300" },
    { label: "Lightweight", color: darkMode ? "bg-green-900 text-green-300 border-green-700" : "bg-green-100 text-green-700 border-green-300" },
    { label: "Easy to use", color: darkMode ? "bg-purple-900 text-purple-300 border-purple-700" : "bg-purple-100 text-purple-700 border-purple-300" },
  ];

  // Add new state for component re-rendering
  const [demoChatKey, setDemoChatKey] = useState<number>(0);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('pgpt-landing-theme', newMode ? 'dark' : 'light');
  };

  const togglePrimaryColor = () => {
    const newColor = primaryColor === 'indigo' ? 'teal' : 'indigo';
    setPrimaryColor(newColor as 'indigo' | 'teal');
    localStorage.setItem('pgpt-primary-color', newColor);
  };

  const togglePropsTable = () => {
    setShowPropsTable(!showPropsTable);
  };

  // Demo chat controls - Update to force re-render
  const handleThemeChange = (theme: ThemeType) => {
    setDemoTheme(theme);
    // Close chat first to ensure theme change takes effect
    setDemoChatOpen(false);
    
    // Add a small delay before re-rendering to ensure state updates properly
    setTimeout(() => {
      // Force component re-render by setting a key state
      setDemoChatKey(prev => prev + 1);
    }, 100);
  };

  const handlePositionChange = (position: PositionType) => {
    setDemoPosition(position);
    setDemoChatOpen(false);
    
    // Add a small delay before re-rendering
    setTimeout(() => {
      // Force component re-render
      setDemoChatKey(prev => prev + 1);
    }, 100);
  };

  const handleDemoChatOpen = () => {
    setDemoChatOpen(true);
  };

  const handleDemoChatClose = () => {
    setDemoChatOpen(false);
  };
  
  // Persistent demo chat handlers
  const handlePersistentChatOpen = () => {
    setPersistentChatOpen(true);
  };
  
  const handlePersistentChatClose = () => {
    setPersistentChatOpen(false);
  };
  
  // Add effect to show persistent chat when scrolling to demo section
  useEffect(() => {
    const handleScroll = () => {
      const demoSection = document.getElementById('demo');
      if (demoSection) {
        const rect = demoSection.getBoundingClientRect();
        // Show persistent chat when demo section is being scrolled away
        setShowPersistentChat(rect.top < 0 || rect.bottom > window.innerHeight);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tab data for navigation
  const tabs = [
    { id: "installation", label: "Installation", icon: <FaDownload /> },
    { id: "basic", label: "Basic Usage", icon: <FaCode /> },
    { id: "advanced", label: "Advanced", icon: <FaWrench /> },
    { id: "api", label: "Custom API", icon: <FaHeadset /> },
    { id: "themes", label: "Themes", icon: <FaGraduationCap /> },
    { id: "props", label: "Props Reference", icon: <FaTable /> },
  ];

  // Add this helper function near the other functions
  const getThemeColorClass = (theme: ThemeType): string => {
    switch (theme) {
      case 'blue': return 'text-blue-500';
      case 'green': return 'text-green-500';
      case 'red': return 'text-red-500';
      case 'purple': return 'text-purple-500';
      case 'teal': return 'text-teal-500';
      case 'chatgpt': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Navbar */}
      <nav className={`p-4 ${darkMode ? 'bg-gray-800/50' : primaryBg} text-white shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaRobot className="text-2xl" />
            <h1 className="text-xl font-bold">P-GPT</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePrimaryColor}
              className="flex items-center hover:text-blue-200 transition-colors duration-200"
              aria-label="Toggle primary color"
            >
              {primaryColor === 'indigo' ? 'Switch to Teal' : 'Switch to Indigo'}
            </button>
            <a
              href="https://github.com/code-abdulrehman/p-gpt"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center transition-colors duration-200`}
            >
              <span className={`${darkMode ? primaryText : 'text-white'} flex items-center gap-1`}>
                <FaGithub />
                GitHub
              </span>
            </a>
            <a
              href="https://www.npmjs.com/package/p-gpt"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center transition-colors duration-200 `}
            >
              <span className={`${darkMode ? primaryText : 'text-white'} flex items-center gap-1`}>
                <FaNpm />
                NPM
              </span>
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section - Simplified with animations */}
      <div className={`min-h-screen relative flex items-center justify-center px-4 
        ${darkMode ? 'bg-gray-900' : 'bg-white'} overflow-hidden`}>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Radial gradient background */}
          <div className="absolute inset-0"
            style={{
              background: darkMode
                ? 'radial-gradient(circle at center, #374151 0%, #1f2937 40%, #111827 100%)'
                : 'radial-gradient(circle at center, #ffffff 0%, #f9fafb 40%, #f3f4f6 100%)'
            }}>
          </div>

          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 animate-pulse"
            style={{
              background: `radial-gradient(circle, ${primaryColor === 'indigo' ? '#818cf8' : '#2dd4bf'}, transparent)`,
              animationDuration: '8s'
            }}>
          </div>

          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full opacity-20 animate-pulse"
            style={{
              background: `radial-gradient(circle, ${primaryColor === 'indigo' ? '#a78bfa' : '#0d9488'}, transparent)`,
              animationDuration: '12s',
            }}>
          </div>

          {/* Animated dots pattern (optional) */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(${primaryColor === 'indigo' ? '#6366f1' : '#14b8a6'} 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}>
          </div>
        </div>

        <div className="container mx-auto z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="mb-6 flex items-center justify-center md:justify-start">
                <div className={`mr-4 p-4 rounded-2xl ${primaryBg} text-white flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300`} style={{ transform: 'rotate(-5deg)' }}>
                  <FaRobot className="text-4xl" />
                </div>
                <h1 className="text-7xl md:text-8xl font-black tracking-tight">
                  <span className={`${darkMode ? primaryTextLight : primaryText}`}>P-GPT</span>
                </h1>
              </div>

              <p className={`text-xl md:text-2xl mb-6 max-w-lg opacity-90 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Beautiful AI chat interfaces for React apps with <span className={primaryText}>powerful customization</span> and <span className={primaryText}>minimal setup</span>.
              </p>

              {/* Feature tags with improved styling */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start 2xl:w-3/5 lg:w-3/4 w-full">
                {featureTags.map((tag, index) => (
                  <span key={index} className={`${tag.color} text-sm px-3 py-0.5 cursor-default rounded-full font-medium border transition-transform hover:scale-105`}>
                    {tag.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href="#get-started"
                  className={`px-6 py-3 rounded-lg font-medium text-lg transform transition hover:scale-105 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'} ${darkMode ? 'text-white' : 'text-gray-700'}`}
                >
                  <span className={`${primaryText} flex items-center gap-1`}>
                    Get Started
                  </span>
                </a>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} bg-opacity-90 backdrop-blur-lg p-8 rounded-xl shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transform hover:-rotate-0 rotate-1 transition-transform duration-300 relative`}>
              {/* Floating icons */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
                <FaHeadset className="text-sm" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                <FaCode className="text-sm" />
              </div>

              <div className="mb-4 flex justify-between items-center">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Setup</h3>
              </div>
              <div className={`rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <CodeBlock code={basicUsageCode} language="jsx" isDark={darkMode} />
              </div>
              <div className={`mt-6 text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} p-4 rounded-lg`}>
                <div className="flex items-start">
                  <FaInfoCircle className="mr-2 text-yellow-500 mt-1 flex-shrink-0" />
                  <span>After installation, import the component and CSS file. For faster setup, use the <code className={`px-1 py-0.5 rounded ${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>apiKey</code> prop directly, but for production apps, consider using <code className={`px-1 py-0.5 rounded ${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>routerConfig</code> to keep API keys secure.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16" id="get-started">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Side Navigation */}
          <div className="md:col-span-3">
            <div className={`sticky top-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <h2 className="text-2xl font-bold mb-4">Documentation</h2>
              <ul className="space-y-1">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                          ? (darkMode ? primaryBg + ' text-white' : primaryLightBg + ' ' + primaryLightText)
                          : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-100')
                        }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-9">
            {/* Installation */}
            <div id="installation" className={activeTab === 'installation' ? 'block' : 'hidden'}>
              <h2 className={`text-3xl font-bold mb-6 ${darkMode ? primaryTextLight : primaryText}`}>Installation</h2>

              <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">NPM</h3>
                </div>
                <CodeBlock code={basicInstallCode} language="bash" isDark={darkMode} />
              </div>

              <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className="text-xl font-semibold mb-4">Or using yarn</h3>
                <CodeBlock code="yarn add p-gpt" language="bash" isDark={darkMode} />
              </div>

              <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className="text-xl font-semibold mb-4">Required Dependencies</h3>
                <p className="mb-4">P-GPT requires the following peer dependencies:</p>
                <CodeBlock
                  code={`npm install react react-dom react-icons`}
                  language="bash"
                  isDark={darkMode}
                />

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Optional Dependencies</h4>
                  <p className="mb-4">For enhanced functionality, consider installing:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <code className={`${darkMode ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-200'} px-2 py-1 rounded`}>tailwindcss</code> - For styling customization
                    </li>
                    <li>
                      <code className={`${darkMode ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-200'} px-2 py-1 rounded`}>prism-react-renderer</code> - For code highlighting in chat
                    </li>
                    <li>
                      <code className={`${darkMode ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-200'} px-2 py-1 rounded`}>openai</code> - If using the OpenAI SDK directly
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-yellow-50 text-yellow-800'}`}>
                <h3 className="flex items-center text-xl font-semibold mb-2">
                  <FaInfoCircle className="mr-2" /> Quick Setup
                </h3>
                <p>
                  After installation, import the component and CSS file in your React application.
                  For faster setup, use the <code className={`${darkMode ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-200'} px-1 py-0.5 rounded bg-opacity-20 bg-gray-300`}>apiKey</code> prop directly,
                  but for production apps, consider using the <code className={`${darkMode ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-200'} px-1 py-0.5 rounded bg-opacity-20 bg-gray-300`}>routerConfig</code>.
                </p>
              </div>
            </div>

            {/* Basic Usage */}
            <div id="basic" className={activeTab === 'basic' ? 'block' : 'hidden'}>
              <h2 className={`text-3xl font-bold mb-6 ${darkMode ? primaryTextLight : primaryText}`}>Basic Usage</h2>
              <div className={`p-6 rounded-lg mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : primaryText}`}>Simple Implementation</h3>
                </div>
                <CodeBlock code={basicUsageCode} language="jsx" isDark={darkMode} />
              </div>

              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-yellow-50 text-yellow-800'}`}>
                <h3 className="flex items-center text-xl font-semibold mb-2">
                  <FaInfoCircle className="mr-2" /> Security Note
                </h3>
                <p>
                  Placing your API key directly in the frontend code exposes it to users. For production applications,
                  consider using the <code className={`px-1 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-purple-300' : 'bg-yellow-100 text-yellow-900'}`}>routerConfig</code> option to proxy requests through your backend.
                </p>
              </div>
            </div>

            {/* Advanced Usage */}
            <div id="advanced" className={activeTab === 'advanced' ? 'block' : 'hidden'}>
              <h2 className={`text-3xl font-bold mb-6 ${darkMode ? primaryTextLight : primaryText}`}>Advanced Customization</h2>
              <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : primaryText}`}>Custom Appearance</h3>
                </div>
                <CodeBlock code={advancedUsageCode} language="jsx" isDark={darkMode} />
              </div>

              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? primaryTextLight : primaryText}`}>Pre-built Bot Examples</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white shadow'}`}>
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : primaryText}`}>Customer Support Bot</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      A bot configured to handle customer service inquiries with a friendly tone.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white shadow'}`}>
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : primaryText}`}>Technical Documentation Bot</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      A bot that helps users navigate your technical documentation.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white shadow'}`}>
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : primaryText}`}>Product Recommendation Bot</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      A bot that suggests products based on user preferences.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white shadow'}`}>
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : primaryText}`}>FAQ Bot</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      A bot pre-loaded with frequently asked questions and answers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* API Route Usage */}
            <div id="api" className={activeTab === 'api' ? 'block' : 'hidden'}>
              <h2 className={`text-3xl font-bold mb-6 ${darkMode ? primaryTextLight : primaryText}`}>Custom API Endpoint</h2>
              <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : primaryText}`}>Using with a Backend Route</h3>
                </div>
                <CodeBlock code={routerUsageCode} language="jsx" isDark={darkMode} />
              </div>

              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-green-50 text-green-800'}`}>
                <h3 className="flex items-center text-xl font-semibold mb-2">
                  <FaInfoCircle className="mr-2" /> Backend Implementation
                </h3>
                <p className="mb-4">
                  Your backend route should accept the same parameters as the OpenAI API and return responses in the same format.
                  This allows you to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Keep your API key secure on the server</li>
                  <li>Add rate limiting and user authentication</li>
                  <li>Log and monitor usage</li>
                  <li>Implement custom logic before passing to OpenAI</li>
                </ul>
              </div>
            </div>

            {/* Themes */}
            <div id="themes" className={activeTab === 'themes' ? 'block' : 'hidden'}>
              <h2 className={`text-3xl font-bold mb-6 ${darkMode ? primaryTextLight : primaryText}`}>Theme Options</h2>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-6`}>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
                  <h3 className={`text-xl font-semibold mb-3 ${darkMode ? primaryTextLight : primaryText}`}>Basic Themes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-blue-500 mr-2"></span>
                      <span>blue (default)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-green-500 mr-2"></span>
                      <span>green</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-red-500 mr-2"></span>
                      <span>red</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-purple-500 mr-2"></span>
                      <span>purple</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-teal-500 mr-2"></span>
                      <span>teal</span>
                    </li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
                  <h3 className={`text-xl font-semibold mb-3 ${darkMode ? primaryTextLight : primaryText}`}>Premium Themes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 mr-2"></span>
                      <span>gradient-blue</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 mr-2"></span>
                      <span>gradient-purple</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-gray-800 mr-2"></span>
                      <span>chatgpt</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-gray-100 mr-2 border border-gray-300"></span>
                      <span>minimal</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-yellow-400 mr-2"></span>
                      <span>sunset</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? primaryTextLight : primaryText}`}>Appearances</h3>
                <p className="mb-4">Each theme supports these appearance modes:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white shadow'} text-center`}>
                    <h4 className={`font-medium mb-2`}>Light</h4>
                    <div className="w-full h-24 bg-white rounded-lg border"></div>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white shadow'} text-center`}>
                    <h4 className={`font-medium mb-2`}>Dark</h4>
                    <div className="w-full h-24 bg-gray-900 rounded-lg"></div>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white shadow'} text-center`}>
                    <h4 className={`font-medium mb-2`}>System</h4>
                    <div className="w-full h-24 bg-gradient-to-r from-white to-gray-900 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Props Reference */}
            <div id="props" className={activeTab === 'props' ? 'block' : 'hidden'}>
              <h2 className={`text-3xl font-bold mb-6 ${darkMode ? primaryTextLight : primaryText}`}>Props Reference</h2>

              <div className={`p-6 rounded-lg mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <p className="mb-4">
                  The PGPT component accepts various props to customize its appearance and behavior.
                  Props are grouped into logical categories below.
                </p>

                <button
                  onClick={togglePropsTable}
                  className={`px-4 py-2 rounded-lg mb-6 ${darkMode
                      ? primaryBg + ' hover:' + primaryHoverBg + ' text-white'
                      : primaryLightBg + ' hover:' + primaryHoverLightBg + ' ' + primaryLightText
                    } transition-colors`}
                >
                  {showPropsTable ? "Hide Props Table" : "Show Props Table"}
                </button>

                {showPropsTable && (
                  <div>
                    {propsData.map((category) => (
                      <PropsTable
                        key={category.category}
                        category={category.category}
                        props={category.props}
                        isDark={darkMode}
                      />
                    ))}
                  </div>
                )}

                {!showPropsTable && (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} text-center`}>
                    <p>Click the button above to display the complete props reference table.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Updated Demo Section - Fullscreen interactive demo with proper positioning */}
        <div id="demo" className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? primaryTextLight : primaryText}`}>Interactive Chatbot Demo</h2>
          <p className="text-center mb-12 max-w-3xl mx-auto text-lg">
            Explore different themes and positions. The chatbot will appear in fullscreen mode when open.
          </p>

          {/* Interactive demo with theme and position selectors */}
          <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} mb-16`}>
            <div className="flex flex-wrap gap-6 mb-8 justify-center">
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Theme</label>
                <div className="flex flex-wrap gap-2">
                  {availableThemes.map(theme => (
                    <button
                      key={theme}
                      onClick={() => handleThemeChange(theme)}
                      className={`px-3 py-1 rounded-lg text-white capitalize transition-all ${theme === demoTheme ? 'ring-2 ring-white ring-opacity-70 font-medium shadow-lg' : 'opacity-80 hover:opacity-100'
                        } ${theme === 'blue' ? 'bg-blue-500' :
                          theme === 'green' ? 'bg-green-500' :
                            theme === 'red' ? 'bg-red-500' :
                              theme === 'purple' ? 'bg-purple-500' :
                                theme === 'teal' ? 'bg-teal-500' :
                                  'bg-gray-800'
                        }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Position</label>
                <div className="flex flex-wrap gap-2">
                  {availablePositions.map(pos => (
                    <button
                      key={pos}
                      onClick={() => handlePositionChange(pos)}
                      className={`px-3 py-1 rounded-lg transition-all ${pos === demoPosition ? `${primaryBg} text-white font-medium shadow-lg` :
                          darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative h-[500px] bg-opacity-5 rounded-xl overflow-hidden border-2 border-dashed border-opacity-50 flex items-center justify-center">
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center absolute inset-0 flex items-center justify-center pointer-events-none ${demoChatOpen ? 'opacity-0' : 'opacity-100'} z-10`}>
                <div>
                  <p className="mb-4">Click on the chatbot button to interact with the demo</p>
                  <div className="animate-bounce">↘️</div>
                </div>
              </div>

              {/* Live PGPT Demo positioned in the demo container */}
              <div className="absolute inset-0">
                <PGPT
                  key={demoChatKey}
                  apiKey="YOUR_API_KEY"
                  theme={demoTheme}
                  bubbleStyle="modern"
                  appearance={darkMode ? "dark" : "light"}
                  content={{
                    title: "PGPT Demo",
                    subtitle: "React Component",
                    welcomeMessage: "👋 Hi there! I'm a demo of the PGPT component. Try asking about different features or customization options!",
                    systemMessage: "You are a helpful assistant demonstrating the PGPT React component. Provide enthusiastic, concise answers about how to use this component with the selected theme and position."
                  }}
                  enableTypingAnimation={true}
                  defaultOpen={false}
                  minHeight="400px"
                  maxHeight="400px"
                  position={demoPosition === 'center' ? 'center' : demoPosition}
                  chatLayout="popup"
                  buttonSize="medium"
                  onOpen={handleDemoChatOpen}
                  onClose={handleDemoChatClose}
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className={`inline-block px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} ${darkMode ? 'text-gray-300' : 'text-gray-700'} shadow-sm`}>
                <span className="font-medium">Current Configuration: </span>
                <span className="italic">Theme: <span className={getThemeColorClass(demoTheme)}>{demoTheme}</span></span> |
                <span className="italic">Position: {demoPosition}</span> |
                <span className="italic">Layout: popup</span> |
                <span className="italic">Key: {demoChatKey}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-16 py-12 ${darkMode ? 'bg-gray-800' : primaryBg + ' text-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FaRobot className="text-3xl mr-2" />
                <h2 className="text-2xl font-bold">P-GPT</h2>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-white text-opacity-90'}`}>
                A powerful, customizable ChatGPT component for React applications.
                Add AI chat capabilities with minimal setup and maximum flexibility.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/code-abdulrehman/p-gpt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    <span className={`${darkMode ? primaryText : "text-white"} flex items-center gap-1`}>
                      GitHub
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/p-gpt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    <span className={`${darkMode ? primaryText : "text-white"}  flex items-center gap-1`}>
                      NPM Package
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/code-abdulrehman/p-gpt/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    <span className={`${darkMode ? primaryText : "text-white"} flex items-center gap-1`}>
                      Report Issues
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-white text-opacity-90'}`}>
                Have questions or feedback? We'd love to hear from you!
              </p>
              <a
                href="mailto:code.abdulrehman@gmail.com"
                className={`inline-block px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white bg-opacity-20 hover:bg-opacity-30'} transition-colors`}
              >
                <span className={`${primaryText} flex items-center gap-1`}>
                  Contact Us
                </span>
              </a>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-white border-opacity-20 text-center">
            <p className={`${darkMode ? 'text-gray-400' : 'text-white text-opacity-80'}`}>
              © {new Date().getFullYear() === 2025 ? '2025 ' : `${new Date().getFullYear()} - ${new Date().getFullYear()} `}
               P-GPT. Developed by <a href="https://code-abdulrehman.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:underline"> <span className={darkMode ? primaryText : "text-white"}>Abdulrehman</span></a>. All rights reserved.
            </p>

          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default LandingPage; 