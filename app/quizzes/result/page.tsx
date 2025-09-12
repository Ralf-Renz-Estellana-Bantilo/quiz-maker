'use client';

import { createAttempSubmitMeta } from '@/app/controller/attempts';
import { useSuspension } from '@/app/hook/useSuspension';
import { QuestionSVG } from '@/app/icons/icons';
import { getCookie } from '@/app/utils/utils';
import { Result } from '@/types/types';
import { Button, Chip, ScrollShadow } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultsPage() {
   const router = useRouter();
   const { execute } = useSuspension();

   const [result, setResult] = useState<Result>({
      details: [],
      score: 0,
   });
   const getResult = () => {
      execute(async () => {
         try {
            const attemptIdFromCookie = getCookie<number>('attemptId', 0);
            const response = await createAttempSubmitMeta(attemptIdFromCookie);

            setResult(response);
         } catch (error) {
            router.push('/quizzes/list');
         }
      });
   };

   useEffect(() => {
      getResult();
   }, []);

   return (
      <div className='flex w-[50vw] h-[100dvh] justify-center py-3'>
         <div className='flex flex-col gap-5 px-4 py-5 rounded-md grow border-1 border-slate-700'>
            <div className='flex justify-center item-center'>
               <div className='flex flex-col item-center justify-center gap-3 p-2 w-[220px] h-[220px] rounded-full border-10 border-slate-500 bg-slate-500/10 backdrop-filter backdrop-blur-sm'>
                  <h3 className='text-center'>Your Score</h3>
                  <span className='text-5xl font-bold text-center'>
                     {result.score} / {result.details.length}
                  </span>
               </div>
            </div>

            <ScrollShadow
               hideScrollBar
               className='flex flex-col flex-grow gap-2 max-h-[50vh]'>
               {result.details.map((detail, index) => (
                  <div
                     key={detail.questionId}
                     className='flex items-center justify-between p-3 rounded-md border-1 border-slate-700 bg-slate-500/10 backdrop-filter backdrop-blur-sm'>
                     <div className='flex items-center gap-2'>
                        <QuestionSVG />
                        <h3 className='font-semibold'>Question {index + 1}</h3>
                     </div>

                     {detail.expected ? (
                        <>
                           <Chip
                              color={detail.correct ? 'success' : 'danger'}
                              variant='light'>
                              {detail.correct ? 'Correct' : 'Incorrect'}
                           </Chip>
                        </>
                     ) : (
                        <Chip color='default' variant='light'>
                           Under review
                        </Chip>
                     )}
                  </div>
               ))}
            </ScrollShadow>

            <Button
               color='primary'
               onPress={() => router.push('/quizzes/list')}>
               Close
            </Button>
         </div>
      </div>
   );
}
