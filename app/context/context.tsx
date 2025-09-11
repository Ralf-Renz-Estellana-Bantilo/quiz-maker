'use client';

import { ToastVariantProps, useDisclosure } from '@heroui/react';
import { createContext, ReactNode } from 'react';
import { Context } from 'vm';

export const TOAST_PROPERTIES: ToastVariantProps & { title: string } = {
   title: 'Error Adding New Question',
   variant: 'bordered',
   color: 'warning',
};

export const ClientContext = createContext<Context>({
   isPopupOpen: false,
   onPopupOpen: () => {},
   onPopupOpenChange: () => {},
});

export const ClientContextProvider = ({
   children,
}: {
   children: ReactNode;
}) => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const contextValue: Context = {
      isPopupOpen: isOpen,
      onPopupOpen: onOpen,
      onPopupOpenChange: onOpenChange,
   };

   return (
      <ClientContext.Provider value={contextValue}>
         {children}
      </ClientContext.Provider>
   );
};
