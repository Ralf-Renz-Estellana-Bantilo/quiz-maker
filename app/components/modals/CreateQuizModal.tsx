'use client';

import { Quiz } from '@/types';
import {
   Button,
   Input,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
} from '@heroui/react';
import { ChangeEvent, useEffect, useState } from 'react';

const CreateQuizModal = ({
   isOpen,
   title,
   initialValue,
   onContinue,
   onOpenChange,
}: {
   isOpen: boolean;
   title: string;
   onContinue: (form: Quiz) => void;
   onOpenChange: () => void;
   initialValue: Quiz;
}) => {
   const [form, setForm] = useState(initialValue);

   const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      const { value, id } = e.target;
      setForm((prev) => ({
         ...prev,
         [id]: value,
      }));
   };

   const continueHandler = (onClose: () => void) => {
      onContinue(form);
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
                     {title}
                  </ModalHeader>
                  <ModalBody>
                     <Input
                        label='Title'
                        isRequired
                        id='title'
                        value={form.title}
                        onChange={onChangeInput}
                     />
                     <Input
                        label='Description'
                        id='description'
                        isRequired
                        value={form.description}
                        onChange={onChangeInput}
                     />
                     <Input
                        label='Time limit (mins)'
                        id='timeLimitSeconds'
                        type='number'
                        value={form.timeLimitSeconds?.toString()}
                        onChange={onChangeInput}
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
