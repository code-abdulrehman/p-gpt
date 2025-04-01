import { useState, useEffect } from 'react';

/**
 * Custom hook for using localStorage with PBot conversations
 * @param key - The localStorage key to use
 * @param initialValue - Initial value to use if no value exists in localStorage
 * @returns A tuple containing the stored value and a function to update it
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Get stored value from localStorage
  const readValue = (): T => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Update localStorage when the state changes
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to localStorage in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

/**
 * Get all PBot conversations from localStorage
 * @returns An object with conversation IDs as keys and conversations as values
 */
export function getAllPBotConversations(): Record<string, any> {
  const conversations: Record<string, any> = {};
  
  if (typeof window === 'undefined') {
    return conversations;
  }
  
  // Loop through all localStorage items
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('pbot-messages-')) {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          conversations[key] = JSON.parse(value);
        }
      } catch (error) {
        console.warn(`Error parsing conversation from localStorage key "${key}":`, error);
      }
    }
  }
  
  return conversations;
}

/**
 * Clear a specific PBot conversation from localStorage
 * @param id - The conversation ID to clear
 */
export function clearPBotConversation(id: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(`pbot-messages-${id}`);
}

/**
 * Clear all PBot conversations from localStorage
 */
export function clearAllPBotConversations(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  // Loop through all localStorage items
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('pbot-messages-')) {
      localStorage.removeItem(key);
    }
  }
} 