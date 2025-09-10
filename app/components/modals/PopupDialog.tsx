'use client';

import { ClientContext } from '@/app/context/context';
import {
   Button,
   Input,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
} from '@heroui/react';
import React, { ReactNode, useContext } from 'react';

interface PopupDialogProps {
   title: string;
   cancelText?: string;
   continueText?: string;
   children: ReactNode;
   onCancelHandler: () => void;
   onContinueHandler: () => void;
}

const PopupDialog = ({
   title,
   children,
   cancelText = 'Cancel',
   continueText = 'Continue',
   onCancelHandler,
   onContinueHandler,
}: PopupDialogProps) => {
   const { isPopupOpen, onPopupOpenChange } = useContext(ClientContext);

   const onContinue = (onClose: () => void) => {
      onContinueHandler();
      onClose();
   };

   const onCancel = (onClose: () => void) => {
      onCancelHandler();
      onClose();
   };

   return (
      <Modal
         isDismissable={false}
         backdrop='blur'
         isOpen={isPopupOpen}
         onOpenChange={onPopupOpenChange}>
         <ModalContent>
            {(onClose) => (
               <>
                  <ModalHeader className='flex flex-col gap-1'>
                     {title}
                  </ModalHeader>
                  <ModalBody>{children}</ModalBody>
                  <ModalFooter>
                     <Button
                        color='danger'
                        variant='light'
                        onPress={() => onCancel(onClose)}>
                        {cancelText}
                     </Button>
                     <Button
                        color='primary'
                        onPress={() => onContinue(onClose)}>
                        {continueText}
                     </Button>
                  </ModalFooter>
               </>
            )}
         </ModalContent>
      </Modal>
   );
};

export default PopupDialog;
