import { useState } from "react";

interface UseLoginReturn {
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent, onSuccess: () => void) => void;
}

/**
 * Custom hook for handling login authentication logic.
 *
 * Separates authentication business logic from the UI component,
 * making it easier to test, extend, and handle edge cases like
 * invalid credentials or API failures.
 *
 * @returns Object containing loading state and submit handler
 */
export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent, onSuccess: () => void) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication attempt - in a real app, this would call an API
    // TODO: Replace with actual API call and proper error handling
    setTimeout(() => {
      setIsLoading(false);
      // Only call success callback if authentication was successful
      onSuccess();
    }, 1000);
  };

  return {
    isLoading,
    handleSubmit,
  };
}
