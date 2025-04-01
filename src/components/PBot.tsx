import React from "react";
import EnhancedPBot from "./PBotNew";

// Legacy props interface for backward compatibility
interface LegacyPBotProps {
  apiKey: string;
  model?: string;
  placeholder?: string;
  title?: string;
  subtitle?: string;
  theme?: "light" | "dark" | "blue" | "purple" | "green" | "amber" | "teal" | "indigo" | "red" | "pink" | "slate" | "midnight" | "sunset";
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  welcomeMessage?: string;
  buttonSize?: 'small' | 'medium' | 'large';
  initiallyOpen?: boolean;
  role?: string;
  rules?: string[];
  customLogo?: React.ReactNode;
  chatLayout?: 'normal' | 'popup' | 'sidebar';
  minHeight?: string;
  maxHeight?: string;
  systemMessage?: string;
  customStyles?: any;
  showLabelWithLogo?: boolean;
  fixedHeight?: string;
  errorColor?: string;
  warningColor?: string;
  llmProvider?: string;
  isCloseable?: boolean;
}

/**
 * Backward compatible wrapper for the enhanced PBot component.
 * This ensures that existing code using the older props interface 
 * will continue to work with the new implementation.
 */
const PBot: React.FC<LegacyPBotProps> = ({
  apiKey,
  model = "gpt-4",
  placeholder = "Type your message here...",
  title = "PBot Assistant",
  subtitle = "AI-powered chat assistant",
  theme = "blue",
  position = "bottom-right",
  welcomeMessage = "Hello! How can I help you today?",
  buttonSize = "medium",
  initiallyOpen = false,
  role = "assistant",
  rules = [],
  customLogo,
  chatLayout = "normal",
  minHeight = "28rem",
  maxHeight = "80vh",
  systemMessage,
  customStyles = {},
  showLabelWithLogo = false,
  fixedHeight = "400px",
  errorColor = "#ef4444",
  warningColor = "#f59e0b",
  llmProvider = "OpenAI",
  isCloseable = true
}) => {
  return (
    <EnhancedPBot
      apiKey={apiKey}
      llmProvider={llmProvider}
      model={model}
      placeholder={placeholder}
      title={title}
      subtitle={subtitle}
      theme={theme}
      position={position}
      welcomeMessage={welcomeMessage}
      buttonSize={buttonSize}
      initiallyOpen={initiallyOpen}
      role={role}
      rules={rules}
      customLogo={customLogo}
      chatLayout={chatLayout}
      minHeight={minHeight}
      maxHeight={maxHeight}
      systemMessage={systemMessage}
      customStyles={customStyles}
      showLabelWithLogo={showLabelWithLogo}
      fixedHeight={fixedHeight}
      errorColor={errorColor}
      warningColor={warningColor}
      isCloseable={isCloseable}
    />
  );
};

export default PBot;
