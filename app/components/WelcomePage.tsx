'use client';

import React from 'react';
import Illustration from '@/public/assets/illustration_questions.svg';
import Image from 'next/image';
import { Button } from '@heroui/button';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@heroui/react';
import CreateQuizModal from './modals/CreateQuizModal';

const WelcomePage = () => {
   const router = useRouter();
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const createQuizHandler = () => {
      router.push('quizzes/create');
   };

   const startQuizHandler = () => {
      router.push('quizzes');
   };

   return (
      <>
         <CreateQuizModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onContinue={createQuizHandler}
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
                     onPress={startQuizHandler}>
                     Start Quiz
                  </Button>
               </div>
            </div>
         </div>
      </>
   );
};

export default WelcomePage;
