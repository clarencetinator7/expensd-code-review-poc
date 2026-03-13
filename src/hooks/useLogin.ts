import { useState } from "react";

interface UseLoginParams {
  email: string;
  password: string;
}

interface UseLoginReturn {
  isLoading: boolean;
  error: string | null;
  handleSubmit: (
    e: React.FormEvent,
    credentials: UseLoginParams,
    onSuccess: () => void,
    onError?: (error: string) => void,
  ) => Promise<void>;
}

/**
 * Custom hook for handling login authentication logic.
 *
 * Separates authentication business logic from the UI component,
 * making it easier to test, extend, and handle edge cases like
 * invalid credentials or API failures.
 *
 * Handles both success and failure scenarios explicitly, allowing
 * proper error display and user feedback.
 *
 * @returns Object containing loading state, error state, and submit handler
 */
export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    e: React.FormEvent,
    credentials: UseLoginParams,
    onSuccess: () => void,
    onError?: (error: string) => void,
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate credentials before attempting authentication
      if (!credentials.email || !credentials.password) {
        throw new Error("Email and password are required");
      }

      // Simulate authentication attempt - in a real app, this would call an API
      // TODO: Replace with actual API call:
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      // if (!response.ok) {
      //   throw new Error('Invalid credentials');
      // }
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Authentication succeeded
      onSuccess();
    } catch (err) {
      // Handle authentication failures explicitly
      const errorMessage =
        err instanceof Error ? err.message : "Authentication failed";
      setError(errorMessage);

      // Call optional error callback
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleSubmit,
  };
}
