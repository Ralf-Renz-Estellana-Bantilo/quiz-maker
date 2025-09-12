'use client';

import React, { useEffect } from 'react';
import CreateQuizModal from './components/modals/CreateQuizModal';
import { addToast, Button, useDisclosure } from '@heroui/react';
import { deleteAllCookies, setCookie } from './utils/utils';
import { createQuizMeta } from './controller/quizzes';
import { Quiz } from '@/types/types';
import Image from 'next/image';
import Illustration from '@/public/assets/illustration_questions.svg';
import { DEFAULT_QUIZ_FORM_VALUE } from './utils/constants';
import { useRouter } from 'next/navigation';

export default function Home() {
   const router = useRouter();
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const createQuiz = async (form: Quiz) => {
      if (Boolean(form.title) && Boolean(form.description)) {
         try {
            const newQuiz: Quiz = {
               ...form,
               timeLimitSeconds: form.timeLimitSeconds
                  ? form.timeLimitSeconds * 60
                  : null,
            };

            const response = await createQuizMeta(newQuiz);

            setCookie('quizId', `${response.id}`);
            router.push(`quizzes/create`);
         } catch (error) {
            console.log(error);
         }
      } else {
         addToast({
            title: 'Error Adding New Quiz',
            description: 'Missing information. Please try again.',
            variant: 'bordered',
            color: 'warning',
         });
      }
   };

   const startQuiz = () => {
      router.push('quizzes/list');
   };

   useEffect(() => {
      deleteAllCookies();
   }, []);

   return (
      <section className='flex items-center justify-center h-screen'>
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
            </div>
         </div>
      </section>
   );
}
