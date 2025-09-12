import { useEffect } from 'react';

export const useWindowFocusEvents = (
   onFocus: () => void,
   onBlur: () => void
) => {
   useEffect(() => {
      const handleFocus = () => {
         onFocus();
      };

      const handleBlur = () => {
         onBlur();
      };

      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);

      return () => {
         window.removeEventListener('focus', handleFocus);
         window.removeEventListener('blur', handleBlur);
      };
   }, [onFocus, onBlur]);
};
