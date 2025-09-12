import { useEffect } from 'react';

export const useBeforeUnload = (shouldPrompt: boolean) => {
   useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
         if (!shouldPrompt) return;
         event.preventDefault();
         event.returnValue = ''; // Required for Chrome to show confirmation dialog
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
         window.removeEventListener('beforeunload', handleBeforeUnload);
      };
   }, [shouldPrompt]);
};
