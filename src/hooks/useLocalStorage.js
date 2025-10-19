import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage persistence
 * @param {string} key - The localStorage key
 * @param {any} initialValue - The initial value if no value is stored
 * @returns {[any, function]} - [value, setValue] tuple
 */
const useLocalStorage = (key, initialValue) => {
  // Initialize state from localStorage or with initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
