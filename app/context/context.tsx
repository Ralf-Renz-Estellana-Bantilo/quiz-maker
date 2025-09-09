'use client';

import { Context, Question, Quiz } from '@/types';
import { createContext, ReactNode, useState } from 'react';

export const ClientContext = createContext<Context>({
   quizzes: [],
   questions: [],
   addQuestionToList: () => {},
   addQuizToList: () => {},
   editQuestionFromList: () => {},
   removeQuestionFromList: () => {},
});

export const ClientContextProvider = ({
   children,
}: {
   children: ReactNode;
}) => {
   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
   const [questions, setQuestions] = useState<Question[]>([
      {
         id: 1,
         quizId: 101,
         type: 'mcq',
         prompt: 'What is the capital of France?',
         options: [
            { id: 1, label: 'Berlin', isCorrect: false },
            { id: 2, label: 'Paris', isCorrect: true },
            { id: 3, label: 'Madrid', isCorrect: false },
            { id: 4, label: 'Rome', isCorrect: false },
         ],
         correctAnswer: '2', // reference option id or label depending on your logic
         position: 1,
         createdAt: new Date().toISOString(),
      },
      {
         id: 2,
         quizId: 101,
         type: 'short',
         prompt: 'Who developed the theory of relativity?',
         options: [],
         correctAnswer: 'Albert Einstein',
         position: 2,
         createdAt: new Date().toISOString(),
      },
      {
         id: 3,
         quizId: 101,
         type: 'code',
         prompt:
            'Write a function in JavaScript that returns the square of a number.',
         options: [],
         correctAnswer: '', // code-type has no single canonical answer
         position: 3,
         createdAt: new Date().toISOString(),
      },
   ]);

   const addQuizToList = (quiz: Quiz) => {
      setQuizzes((prev) => [...prev, quiz]);
   };

   const addQuestionToList = (question: Question) => {
      setQuestions((prev) => [...prev, question]);
   };
   const editQuestionFromList = (question: Question) => {
      setQuestions((prev) =>
         prev.map((p) => (p.id === question.id ? question : p))
      );
   };
   const removeQuestionFromList = (questionId: number) => {
      setQuestions((prev) => prev.filter((p) => p.id !== questionId));
   };

   const contextValue: Context = {
      quizzes,
      questions,
      addQuestionToList,
      addQuizToList,
      editQuestionFromList,
      removeQuestionFromList,
   };

   return (
      <ClientContext.Provider value={contextValue}>
         {children}
      </ClientContext.Provider>
   );
};
