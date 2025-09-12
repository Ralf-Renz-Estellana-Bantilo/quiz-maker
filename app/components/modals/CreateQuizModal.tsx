'use client';

import { Quiz } from '@/types/types';
import {
   Button,
   Form,
   Input,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
} from '@heroui/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

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

   const onSubmit = (e: FormEvent<HTMLFormElement>, onClose: () => void) => {
      e.preventDefault();

      onContinue(form);
      onClose();
   };

   useEffect(() => {
      const isEditing = initialValue.id !== 0;
      const timeLimitSeconds = isEditing
         ? Number(initialValue.timeLimitSeconds) / 60
         : initialValue.timeLimitSeconds;

      setForm({ ...initialValue, timeLimitSeconds });
   }, [initialValue]);

   return (
      <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
         <ModalContent>
            {(onClose) => (
               <Form
                  className='flex flex-col'
                  onSubmit={(e) => onSubmit(e, onClose)}>
                  <ModalHeader>{title}</ModalHeader>
                  <ModalBody className='flex flex-col w-full'>
                     <Input
                        label='Title'
                        isRequired
                        id='title'
                        value={form.title ?? ''}
                        onChange={onChangeInput}
                     />
                     <Input
                        label='Description'
                        id='description'
                        isRequired
                        value={form.description ?? ''}
                        onChange={onChangeInput}
                     />
                     <Input
                        label='Time limit (mins)'
                        id='timeLimitSeconds'
                        type='number'
                        value={form.timeLimitSeconds?.toString() ?? ''}
                        onChange={onChangeInput}
                     />
                  </ModalBody>
                  <ModalFooter className='flex items-center justify-end w-full border-t-1 border-t-slate-700'>
                     <Button color='danger' variant='light' onPress={onClose}>
                        Close
                     </Button>
                     <Button color='primary' type='submit'>
                        Continue
                     </Button>
                  </ModalFooter>
               </Form>
            )}
         </ModalContent>
      </Modal>
   );
};

export default CreateQuizModal;
