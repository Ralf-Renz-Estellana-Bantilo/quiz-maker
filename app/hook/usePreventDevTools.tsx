import { addToast } from '@heroui/react';
import { useEffect } from 'react';

export function usePreventDevTools() {
   useEffect(() => {
      let threshold = 160; // devtools window width/height detection threshold

      const checkDevTools = () => {
         if (
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
         ) {
            addToast({
               title: 'Developer Tools',
               description: 'DevTools are not allowed while taking the quiz',
               variant: 'bordered',
               color: 'warning',
            });
         }
      };

      const interval = setInterval(checkDevTools, 1000);

      const handleKeyDown = (e: KeyboardEvent) => {
         if (
            e.key === 'F12' ||
            (e.ctrlKey &&
               e.shiftKey &&
               (e.key === 'I' || e.key === 'J' || e.key === 'C'))
         ) {
            e.preventDefault();
            addToast({
               title: 'Developer Tools',
               description: 'DevTools are disabled while taking the quiz',
               variant: 'bordered',
               color: 'warning',
            });
         }
      };

      const handleContextMenu = (e: MouseEvent) => {
         e.preventDefault();
         addToast({
            title: 'Right Click Detected',
            description: 'Right click is disabled while taking the quiz',
            variant: 'bordered',
            color: 'warning',
         });
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('contextmenu', handleContextMenu);

      return () => {
         clearInterval(interval);
         window.removeEventListener('keydown', handleKeyDown);
         window.addEventListener('contextmenu', handleContextMenu);
      };
   }, []);
}
