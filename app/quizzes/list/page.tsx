'use client';

import { Quiz } from '@/types';
import QuizListTable from './QuizListTable';
import { useEffect, useState } from 'react';
import { getQuizzesMeta } from '@/app/controller/quizzes';
import { fetchData } from '@/app/controller/controller';
import { useRouter } from 'next/navigation';

export const quizzes: Quiz[] = [
   {
      id: 1,
      title: 'General Knowledge Quiz',
      description:
         'A fun quiz to test your general knowledge across various topics.',
      timeLimitSeconds: 600, // 10 minutes
      isPublished: true,
      createdAt: new Date().toISOString(),
   },
   {
      id: 2,
      title: 'JavaScript Basics',
      description: 'Check your understanding of JavaScript fundamentals.',
      timeLimitSeconds: 900, // 15 minutes
      isPublished: false,
      createdAt: new Date().toISOString(),
   },
   {
      id: 3,
      title: 'World History Challenge',
      description: 'A quiz to test your knowledge of major historical events.',
      timeLimitSeconds: null, // no time limit
      isPublished: true,
      createdAt: new Date().toISOString(),
   },
];

export default function CreateQuizPage() {
   const router = useRouter();

   const [quizzes, setQuizzes] = useState<Quiz[]>([]);

   const getQuizzes = async () => {
      const response = await getQuizzesMeta();

      setQuizzes(response);
   };

   const onSelectQuiz = (quizId: number) => {
      router.push(`/quizzes/exam/${quizId}`);
   };

   const onEditQuiz = (quizId: number) => {
      router.push(`/quizzes/create/${quizId}`);
   };

   useEffect(() => {
      (async () => await getQuizzes())();
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
