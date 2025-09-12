import { useEffect } from 'react';

export const useDisableBackButton = () => {
   useEffect(() => {
      window.history.pushState(null, '', window.location.href);

      const handlePopState = () => {
         window.history.pushState(null, '', window.location.href);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
         window.removeEventListener('popstate', handlePopState);
      };
   }, []);
};
