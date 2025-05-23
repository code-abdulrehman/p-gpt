import axios from 'axios';
import { getLlmCdnProvider } from './common';

/**
 * Interface for chat message objects
 */
export interface ChatMessage {
  role: string;
  content: string;
}

/**
 * Interface for router configuration
 */
export interface RouterConfig {
  route: string;
  model?: string;
  tokens?: number;
  schema?: any; // For custom payload schema
}

/**
 * Interface for sending a message to an LLM provider
 */
export interface SendMessageOptions {
  provider: string;
  apiKey: string;
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  routerConfig?: RouterConfig; // Replace route with RouterConfig
}

/**
 * Error responses from LLM providers
 */
export const API_ERROR_MESSAGES = {
  INVALID_API_KEY: "Invalid API key. Please check your API key and try again.",
  RATE_LIMIT: "Rate limit exceeded. Please try again later.",
  SERVER_ERROR: "Server error from the provider. Please try again later.",
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  MODEL_NOT_AVAILABLE: "Selected model is not available. Please try a different model.",
  PROMPT_TOO_LONG: "Your message is too long. Please shorten it and try again.",
  DEFAULT: "An error occurred. Please try again."
};

/**
 * LLM Provider definitions
 */
export const LLM_PROVIDERS = {
  OPENAI: "openai"
};

/**
 * Models by provider
 */
export const PROVIDER_MODELS = {
  [LLM_PROVIDERS.OPENAI]: [
    'gpt-4o',
    'gpt-4-turbo',
    'gpt-4',
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-16k'
  ]
};

/**
 * Format error based on provider and error type
 */
const formatErrorResponse = (error: any): string => {
  if (!error.response) {
    return API_ERROR_MESSAGES.NETWORK_ERROR;
  }

  const status = error.response.status;
  
  if (status === 401) return API_ERROR_MESSAGES.INVALID_API_KEY;
  if (status === 429) return API_ERROR_MESSAGES.RATE_LIMIT;
  if (status === 400) {
    if (error.response.data?.error?.message?.includes("maximum context length")) {
      return API_ERROR_MESSAGES.PROMPT_TOO_LONG;
    }
  }
  
  return error.response.data?.error?.message || API_ERROR_MESSAGES.DEFAULT;
};

/**
 * Format messages for OpenAI API
 */
const formatMessages = (messages: ChatMessage[]): any => {
  return messages.map(msg => ({
    role: msg.role === 'bot' ? 'assistant' : msg.role,
    content: msg.content
  }));
};

/**
 * Parse response from OpenAI API
 */
const parseResponse = (response: any): ChatMessage => {
  if (response?.data?.bot || response?.data?.role === 'bot') {
    return response.data;
  }
  
  if (response?.data?.choices?.[0]?.message) {
    return { 
      role: 'bot', 
      content: response.data.choices[0].message.content 
    };
  }
  
  return { 
    role: 'bot', 
    content: response?.data?.content || "I received your message but couldn't generate a proper response."
  };
};

/**
 * Send a message to LLM provider or custom API endpoint and get a response
 * @param options The options for sending the message
 * @returns The response message from the API
 */
export const sendMessage = async (options: SendMessageOptions): Promise<ChatMessage | null> => {
  const { provider, apiKey, model, messages, temperature = 0.7, maxTokens = 1000, routerConfig } = options;
  
  if (routerConfig) {
    try {
      const headers = { 
        'Content-Type': 'application/json'
      };
      
      // Prepare data for custom endpoint
      let data;
      
      // Use custom schema if provided
      if (routerConfig.schema) {
        data = {
          ...routerConfig.schema,
          messages: messages
        };
      } else {
        // Default schema
        data = {
          messages: messages,
          model: routerConfig.model || model,
          temperature,
          max_tokens: routerConfig.tokens || maxTokens
        };
      }
      
      const response = await axios.post(routerConfig.route, data, { headers });
      return parseResponse(response);
    } catch (error: any) {
      console.error('Error calling custom API endpoint:', error);
      const errorMessage = formatErrorResponse(error);
      return {
        role: 'bot',
        content: `Error: ${errorMessage}`
      };
    }
  } else {
    if (!apiKey) {
      console.error('API key is required when not using a custom endpoint');
      return {
        role: 'bot',
        content: 'Error: API key is required'
      };
    }
    
    const providerConfig = getLlmCdnProvider(provider);
    if (!providerConfig) {
      console.error(`Provider "${provider}" not found`);
      return null;
    }

    try {
      const endpoint = 'https://api.openai.com/v1/chat/completions';
      const headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` 
      };
      const data = {
        model,
        messages: formatMessages(messages),
        temperature,
        max_tokens: maxTokens
      };
      
      const response = await axios.post(endpoint, data, { headers });
      return parseResponse(response);
    } catch (error: any) {
      console.error('Error calling OpenAI API:', error);
      const errorMessage = formatErrorResponse(error);
      return {
        role: 'bot',
        content: `Error: ${errorMessage}`
      };
    }
  }
};

/**
 * Get available models for the provider
 * @param provider The provider name
 * @returns Array of model names
 */
export const getModelsForProvider = (provider: string): string[] => {
  const normalizedProvider = provider.toLowerCase();
  
  if (normalizedProvider === LLM_PROVIDERS.OPENAI.toLowerCase()) {
    return PROVIDER_MODELS[LLM_PROVIDERS.OPENAI];
  }
  
  return [];
};
