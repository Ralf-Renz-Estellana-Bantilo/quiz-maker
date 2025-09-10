'use client';

import React, { useContext, useState } from 'react';
import Illustration from '@/public/assets/illustration_questions.svg';
import Image from 'next/image';
import { Button } from '@heroui/button';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@heroui/react';
import CreateQuizModal from './modals/CreateQuizModal';
import { ClientContext } from '../context/context';
import { Quiz } from '@/types';
import { setCookie } from '../utils/utils';
import { DEFAULT_QUIZ_FORM_VALUE } from '../utils/constants';
import { fetchData } from '../controller/controller';
import { createQuizMeta } from '../controller/quizzes';

const WelcomePage = () => {
   const router = useRouter();
   const { addQuizToList } = useContext(ClientContext);
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const createQuiz = async (form: Quiz) => {
      try {
         const newQuiz: Quiz = {
            ...form,
            timeLimitSeconds: form.timeLimitSeconds
               ? form.timeLimitSeconds * 60
               : null,
         };

         const response = await createQuizMeta(newQuiz);

         console.log({ response });

         setCookie('quizId', `${response.id}`);
         addQuizToList(newQuiz);
         router.push(`quizzes/create/${response.id}`);
      } catch (error) {
         console.log(error);
      }
   };

   const startQuiz = () => {
      router.push('quizzes/list');
   };

   const fetchRequest = async () => {
      const data = await fetchData('http://localhost:4000/quizzes');
      console.log({ data });
   };

   return (
      <>
         <CreateQuizModal
            title='Create Quiz Info'
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onContinue={createQuiz}
            initialValue={DEFAULT_QUIZ_FORM_VALUE}
         />
         <div className='flex flex-col gap-6 w-[600px] border-1 border-slate-700 rounded-md p-3'>
            <div className='flex flex-col gap-10'>
               <div className='flex flex-col items-center flex-grow gap-10'>
                  <div className='flex items-center justify-center mt-5'>
                     <Image
                        src={Illustration}
                        alt='Illustration'
                        width={300}
                        priority
                     />
                  </div>
                  <div className='flex flex-col items-center justify-center gap-1'>
                     <h3 className='text-2xl font-bold text-center'>
                        Simple Quiz Maker Application
                     </h3>
                     <p className='text-center'>
                        Test your skills by taking quizzes.
                     </p>
                  </div>
               </div>
               <div className='flex gap-5'>
                  <Button
                     className='flex-grow'
                     color='primary'
                     variant='bordered'
                     onPress={onOpen}>
                     Create Quiz
                  </Button>
                  <Button
                     className='flex-grow'
                     color='primary'
                     onPress={startQuiz}>
                     Start Quiz
                  </Button>
               </div>
               <Button
                  className='flex-grow'
                  color='primary'
                  variant='bordered'
                  onPress={fetchRequest}>
                  Fetch
               </Button>
            </div>
         </div>
      </>
   );
};

export default WelcomePage;
