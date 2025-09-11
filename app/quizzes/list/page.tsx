'use client';

import { getQuizzesMeta } from '@/app/controller/quizzes';
import { deleteAllCookies, setCookie } from '@/app/utils/utils';
import { Quiz } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import QuizListTable from './QuizListTable';
import { useSuspension } from '@/app/hook/useSuspension';

export default function ListQuizPage() {
   const router = useRouter();
   const { execute } = useSuspension();

   const [quizzes, setQuizzes] = useState<Quiz[]>([]);

   const getQuizzes = () => {
      execute(async () => {
         const response = await getQuizzesMeta();

         deleteAllCookies();
         setQuizzes(response);
      });
   };

   const onSelectQuiz = async (quizId: number) => {
      setCookie('quizId', `${quizId}`);

      router.push(`/quizzes/exam`);
   };

   const onEditQuiz = (quizId: number) => {
      setCookie('quizId', `${quizId}`);

      router.push(`/quizzes/create`);
   };

   useEffect(() => {
      getQuizzes();
   }, []);

   return (
      <div className='flex flex-col w-full h-[100dvh] gap-1 py-3'>
         <QuizListTable
            quizzes={quizzes}
            onEdit={onEditQuiz}
            onSelect={onSelectQuiz}
         />
      </div>
   );
}
