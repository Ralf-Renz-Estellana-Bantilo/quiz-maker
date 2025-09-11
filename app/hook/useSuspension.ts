import { useRef } from 'react';

export function useSuspension() {
   const ref = useRef(false);

   const execute = (callback: () => void) => {
      if (!ref.current) {
         ref.current = true;

         Promise.resolve(callback()).finally(() => {
            setTimeout(() => {
               ref.current = false;
            }, 1000);
         });
      }
      return;
   };

   return { execute };
}
