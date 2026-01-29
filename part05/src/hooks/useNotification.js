import { useState, useCallback } from "react";

export const useNotification = (timeoutMs = 4000) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback(
    (message, type) => {
      setNotification({ message, type });
      setTimeout(() => {
        setNotification(null);
      }, timeoutMs);
    },
    [timeoutMs],
  );

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return [notification, showNotification, dismissNotification];
};

export const useErrorHandler = (showNotification) => {
  return useCallback(
    (error) => {
      const errorMessage =
        error.response?.data?.error || "An unknown error occurred";
      showNotification(errorMessage, "error");
    },
    [showNotification],
  );
};
