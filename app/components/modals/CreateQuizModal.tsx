'use client';

import {
   Button,
   Input,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
} from '@heroui/react';
import React from 'react';

const CreateQuizModal = ({
   isOpen,
   onContinue,
   onOpenChange,
}: {
   isOpen: boolean;
   onContinue: () => void;
   onOpenChange: () => void;
}) => {
   const continueHandler = (onClose: () => void) => {
      onContinue();
      onClose();
   };

   return (
      <Modal
         isDismissable={false}
         backdrop='blur'
         isOpen={isOpen}
         onOpenChange={onOpenChange}>
         <ModalContent>
            {(onClose) => (
               <>
                  <ModalHeader className='flex flex-col gap-1'>
                     Create Quiz
                  </ModalHeader>
                  <ModalBody>
                     <Input label='Title' isRequired />
                     <Input label='Description' isRequired />
                     <Input
                        label='Time limit (mins)'
                        isRequired
                        type='number'
                     />
                  </ModalBody>
                  <ModalFooter>
                     <Button color='danger' variant='light' onPress={onClose}>
                        Close
                     </Button>
                     <Button
                        color='primary'
                        onPress={() => continueHandler(onClose)}>
                        Continue
                     </Button>
                  </ModalFooter>
               </>
            )}
         </ModalContent>
      </Modal>
   );
};

export default CreateQuizModal;
