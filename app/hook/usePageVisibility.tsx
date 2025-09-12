import { useEffect } from 'react';

export const usePageVisibility = (onHide: () => void, onShow: () => void) => {
   useEffect(() => {
      const handleVisibilityChange = () => {
         if (document.visibilityState === 'hidden') {
            onHide();
         } else if (document.visibilityState === 'visible') {
            onShow();
         }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
         document.removeEventListener(
            'visibilitychange',
            handleVisibilityChange
         );
      };
   }, [onHide, onShow]);
};
