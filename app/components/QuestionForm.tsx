'use client';

import React, { useContext, useState } from 'react';
import QuestionCard from './QuestionCard';
import { Button } from '@heroui/button';
import { EditSVG } from '../icons/icons';
import { Chip, ScrollShadow } from '@heroui/react';
import { ChangeHandler, Question } from '@/types';
import { ClientContext } from '../context/context';

const QuestionForm = ({
   form,
   onAddQuestion,
   onChange,
}: {
   form: Question;
   onChange: ({ type, value }: ChangeHandler) => void;
   onAddQuestion: () => void;
}) => {
   return (
      <div className='flex flex-col gap-3 w-[45vw] border-1 border-slate-700 rounded-md p-3'>
         <div className='flex items-center justify-between pb-3 border-b-1 border-b-slate-700'>
            <div className='flex flex-col gap-2 max-w-[400px]'>
               <div className='flex items-center gap-3'>
                  <h3 className='text-xl font-bold'>React Quiz (Basic)</h3>
                  <Button isIconOnly aria-label='Edit question' variant='light'>
                     <EditSVG />
                  </Button>
               </div>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis nam eum vel perspiciatis voluptates recusandae
                  maiores.
               </p>
               <Chip>Time limit: 20 mins</Chip>
            </div>

            <div className='flex items-center gap-3'>
               <Chip>Unpublished</Chip>
               <Button className='flex-grow' color='primary' variant='bordered'>
                  Cancel
               </Button>
               <Button className='flex-grow' color='primary'>
                  Save
               </Button>
            </div>
         </div>

         <div className='flex flex-col justify-between h-full'>
            <ScrollShadow
               hideScrollBar
               className=' overflow-y-auto max-h-[65vh] pb-10'>
               <QuestionCard
                  title={form.id === 0 ? 'Create Question' : 'Modify Question'}
                  value={form}
                  onChange={onChange}
                  mode='create'
               />
            </ScrollShadow>

            <Button color='primary' onPress={onAddQuestion}>
               {form.id === 0 ? 'Add Question' : 'Update Question'}
            </Button>
         </div>
      </div>
   );
};

export default QuestionForm;
