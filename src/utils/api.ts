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
  SAFETY_ERROR: "Content was blocked due to safety policies. Please try rephrasing your message.",
  DEFAULT: "An error occurred. Please try again."
};

/**
 * LLM Provider definitions
 */
export const LLM_PROVIDERS = {
  OPENAI: "OpenAI",
  GEMINI: "Gemini"
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
  ],
  [LLM_PROVIDERS.GEMINI]: [
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-pro',
    'gemini-pro-vision'
  ]
};

/**
 * API endpoints by provider
 */
export const PROVIDER_ENDPOINTS = {
  [LLM_PROVIDERS.OPENAI]: 'https://api.openai.com/v1/chat/completions',
  [LLM_PROVIDERS.GEMINI]: 'https://generativelanguage.googleapis.com/v1beta/models'
};

/**
 * Format error based on provider and error type
 */
const formatErrorResponse = (error: any, provider: string): string => {
  if (!error.response) {
    return API_ERROR_MESSAGES.NETWORK_ERROR;
  }

  const status = error.response.status;
  
  if (status === 401 || status === 403) return API_ERROR_MESSAGES.INVALID_API_KEY;
  if (status === 429) return API_ERROR_MESSAGES.RATE_LIMIT;
  if (status === 400) {
    if (error.response.data?.error?.message?.includes("maximum context length") ||
        error.response.data?.error?.message?.includes("too long")) {
      return API_ERROR_MESSAGES.PROMPT_TOO_LONG;
    }
    // Gemini safety error
    if (provider === LLM_PROVIDERS.GEMINI && 
        error.response.data?.error?.message?.includes("SAFETY")) {
      return API_ERROR_MESSAGES.SAFETY_ERROR;
    }
  }
  
  return error.response.data?.error?.message || 
         error.response.data?.message || 
         API_ERROR_MESSAGES.DEFAULT;
};

/**
 * Format messages for OpenAI API
 */
const formatMessagesForOpenAI = (messages: ChatMessage[]): any => {
  return messages.map(msg => ({
    role: msg.role === 'bot' ? 'assistant' : msg.role,
    content: msg.content
  }));
};

/**
 * Format messages for Gemini API
 */
const formatMessagesForGemini = (messages: ChatMessage[]): any => {
  // Gemini uses a different format - contents array with parts
  const contents = [];
  
  for (const msg of messages) {
    if (msg.role === 'system') {
      // System messages are handled differently in Gemini
      continue;
    }
    
    contents.push({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    });
  }
  
  return contents;
};

/**
 * Get system instruction for Gemini (combines system messages)
 */
const getGeminiSystemInstruction = (messages: ChatMessage[]): string => {
  const systemMessages = messages.filter(msg => msg.role === 'system');
  return systemMessages.map(msg => msg.content).join('\n\n');
};

/**
 * Parse response from OpenAI API
 */
const parseOpenAIResponse = (response: any): ChatMessage => {
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
 * Parse response from Gemini API
 */
const parseGeminiResponse = (response: any): ChatMessage => {
  if (response?.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
    return {
      role: 'bot',
      content: response.data.candidates[0].content.parts[0].text
    };
  }
  
  return {
    role: 'bot',
    content: response?.data?.content || "I received your message but couldn't generate a proper response."
  };
};

/**
 * Parse response from custom API endpoint
 */
const parseCustomResponse = (response: any): ChatMessage => {
  // Handle various response formats from custom APIs
  if (response?.data?.bot || response?.data?.role === 'bot') {
    return response.data;
  }
  
  if (response?.data?.message) {
    return {
      role: 'bot',
      content: response.data.message
    };
  }
  
  if (response?.data?.response) {
    return {
      role: 'bot',
      content: response.data.response
    };
  }
  
  // Try OpenAI format
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
 * Send message to OpenAI API
 */
const sendToOpenAI = async (options: SendMessageOptions): Promise<ChatMessage | null> => {
  const { apiKey, model, messages, temperature, maxTokens } = options;
  
  try {
    const endpoint = PROVIDER_ENDPOINTS[LLM_PROVIDERS.OPENAI];
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}` 
    };
    const data = {
      model,
      messages: formatMessagesForOpenAI(messages),
      temperature,
      max_tokens: maxTokens
    };
    
    const response = await axios.post(endpoint, data, { headers });
    return parseOpenAIResponse(response);
  } catch (error: any) {
    console.error('Error calling OpenAI API:', error);
    const errorMessage = formatErrorResponse(error, LLM_PROVIDERS.OPENAI);
    return {
      role: 'bot',
      content: `Error: ${errorMessage}`
    };
  }
};

/**
 * Send message to Gemini API
 */
const sendToGemini = async (options: SendMessageOptions): Promise<ChatMessage | null> => {
  const { apiKey, model, messages, temperature, maxTokens } = options;
  
  try {
    const endpoint = `${PROVIDER_ENDPOINTS[LLM_PROVIDERS.GEMINI]}/${model}:generateContent?key=${apiKey}`;
    const headers = { 
      'Content-Type': 'application/json'
    };
    
    const systemInstruction = getGeminiSystemInstruction(messages);
    const contents = formatMessagesForGemini(messages);
    
    const data: any = {
      contents,
      generationConfig: {
        temperature: temperature || 0.7,
        maxOutputTokens: maxTokens || 1000,
        candidateCount: 1
      }
    };
    
    // Add system instruction if present
    if (systemInstruction) {
      data.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }
    
    const response = await axios.post(endpoint, data, { headers });
    return parseGeminiResponse(response);
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    const errorMessage = formatErrorResponse(error, LLM_PROVIDERS.GEMINI);
    return {
      role: 'bot',
      content: `Error: ${errorMessage}`
    };
  }
};

/**
 * Send message to custom REST API endpoint
 */
const sendToCustomAPI = async (options: SendMessageOptions): Promise<ChatMessage | null> => {
  const { messages, model, temperature, maxTokens, routerConfig } = options;
  
  if (!routerConfig) {
    return {
      role: 'bot',
      content: 'Error: Router configuration is required for custom API'
    };
  }
  
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
    return parseCustomResponse(response);
  } catch (error: any) {
    console.error('Error calling custom API endpoint:', error);
    const errorMessage = formatErrorResponse(error, 'custom');
    return {
      role: 'bot',
      content: `Error: ${errorMessage}`
    };
  }
};

/**
 * Send a message to LLM provider or custom API endpoint and get a response
 * @param options The options for sending the message
 * @returns The response message from the API
 */
export const sendMessage = async (options: SendMessageOptions): Promise<ChatMessage | null> => {
  const { provider, apiKey, routerConfig } = options;
  
  // Use custom API if routerConfig is provided
  if (routerConfig) {
    return sendToCustomAPI(options);
  }
  
  // Validate API key for direct provider calls
  if (!apiKey) {
    console.error('API key is required when not using a custom endpoint');
    return {
      role: 'bot',
      content: 'Error: API key is required'
    };
  }
  
  // Route to appropriate provider
  switch (provider) {
    case LLM_PROVIDERS.OPENAI:
      return sendToOpenAI(options);
    
    case LLM_PROVIDERS.GEMINI:
      return sendToGemini(options);
    
    default:
      console.error(`Provider "${provider}" not supported`);
      return {
        role: 'bot',
        content: `Error: Provider "${provider}" not supported. Available providers: ${Object.values(LLM_PROVIDERS).join(', ')}`
      };
  }
};

/**
 * Get available models for the provider
 * @param provider The provider name
 * @returns Array of model names
 */
export const getModelsForProvider = (provider: string): string[] => {
  const normalizedProvider = provider;
  
  if (normalizedProvider === LLM_PROVIDERS.OPENAI) {
    return PROVIDER_MODELS[LLM_PROVIDERS.OPENAI];
  }
  
  if (normalizedProvider === LLM_PROVIDERS.GEMINI) {
    return PROVIDER_MODELS[LLM_PROVIDERS.GEMINI];
  }
  
  return [];
};

/**
 * Get default model for provider
 * @param provider The provider name
 * @returns Default model name
 */
export const getDefaultModelForProvider = (provider: string): string => {
  const models = getModelsForProvider(provider);
  return models.length > 0 ? models[0] : 'gpt-4o';
};

/**
 * Validate API key format
 * @param provider The provider name
 * @param apiKey The API key to validate
 * @returns Boolean indicating if format is valid
 */
export const validateApiKeyFormat = (provider: string, apiKey: string): boolean => {
  if (!apiKey) return false;
  
  switch (provider) {
    case LLM_PROVIDERS.OPENAI:
      return apiKey.startsWith('sk-') && apiKey.length > 20;
    
    case LLM_PROVIDERS.GEMINI:
      return apiKey.length > 20; // Gemini keys don't have a specific prefix
    
    default:
      return apiKey.length > 0;
  }
};
