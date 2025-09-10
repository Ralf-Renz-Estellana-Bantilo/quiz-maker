'use client';

import { Question, Quiz } from '@/types';
import { ToastVariantProps, useDisclosure } from '@heroui/react';
import { createContext, ReactNode, useState } from 'react';
import { Context } from './types';

export const TOAST_PROPERTIES: ToastVariantProps & { title: string } = {
   title: 'Error Adding New Question',
   variant: 'bordered',
   color: 'warning',
};

export const ClientContext = createContext<Context>({
   quizzes: [],
   questions: [],
   addQuestionToList: () => {},
   editQuizFromList: () => {},
   removeQuizFromList: () => {},
   addQuizToList: () => {},
   editQuestionFromList: () => {},
   removeQuestionFromList: () => {},
   isPopupOpen: false,
   onPopupOpen: () => {},
   onPopupOpenChange: () => {},
});

export const ClientContextProvider = ({
   children,
}: {
   children: ReactNode;
}) => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
   const [questions, setQuestions] = useState<Question[]>([
      // {
      //    id: 1,
      //    quizId: 101,
      //    type: 'mcq',
      //    prompt: 'What is the capital of France?',
      //    options: [
      //       { id: 1, label: 'Berlin', isCorrect: false },
      //       { id: 2, label: 'Paris', isCorrect: true },
      //       { id: 3, label: 'Madrid', isCorrect: false },
      //       { id: 4, label: 'Rome', isCorrect: false },
      //    ],
      //    correctAnswer: '2',
      //    position: 1,
      //    createdAt: new Date().toISOString(),
      // },
      // {
      //    id: 2,
      //    quizId: 101,
      //    type: 'short',
      //    prompt: 'Who developed the theory of relativity?',
      //    options: [],
      //    correctAnswer: 'Albert Einstein',
      //    position: 2,
      //    createdAt: new Date().toISOString(),
      // },
      // {
      //    id: 3,
      //    quizId: 101,
      //    type: 'code',
      //    prompt:
      //       'Write a function in JavaScript that returns the square of a number.',
      //    options: [],
      //    correctAnswer: '',
      //    position: 3,
      //    createdAt: new Date().toISOString(),
      // },
   ]);

   const addQuizToList = (quiz: Quiz) => {
      setQuizzes((prev) => [...prev, quiz]);
   };
   const editQuizFromList = (quiz: Quiz) => {
      setQuizzes((prev) => prev.map((p) => (p.id === quiz.id ? quiz : p)));
   };
   const removeQuizFromList = (quizId: number) => {
      setQuizzes((prev) => prev.filter((p) => p.id !== quizId));
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
      addQuizToList,
      editQuizFromList,
      removeQuizFromList,
      addQuestionToList,
      editQuestionFromList,
      removeQuestionFromList,
      isPopupOpen: isOpen,
      onPopupOpen: onOpen,
      onPopupOpenChange: onOpenChange,
   };

   return (
      <ClientContext.Provider value={contextValue}>
         {children}
      </ClientContext.Provider>
   );
};
