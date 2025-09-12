'use client';

import { Question } from '@/types/types';
import { ScrollShadow } from '@heroui/scroll-shadow';
import QuestionCard from './QuestionCard';
import React, { memo, useMemo } from 'react';

interface QuestionListProps {
   questions: Question[];
   formId: number;
   onEditQuestion: (question: Question) => void;
   onRemoveQuestion: (questionId: number, questions: Question[]) => void;
}

const QuestionList = ({
   questions,
   formId,
   onEditQuestion,
   onRemoveQuestion,
}: QuestionListProps) => {
   const questionCards = useMemo(() => {
      const sortedQuestions = questions.sort((a, b) => a.position - b.position);

      return sortedQuestions.map((question, index) => (
         <QuestionCard
            key={question.id}
            title={`Question ${index + 1}`}
            value={question}
            onChange={() => {}}
            mode='read'
            isBordered={formId === question.id}
            hasActionButtons
            onEditQuestion={onEditQuestion}
            onRemoveQuestion={() =>
               onRemoveQuestion(question.id, sortedQuestions)
            }
         />
      ));
   }, [questions, formId, onEditQuestion, onRemoveQuestion]);

   return (
      <div className='flex flex-col gap-3 w-[45vw] border-1 border-slate-700 rounded-md p-3'>
         <div className='flex items-center justify-between pb-3 border-b-1 border-b-slate-700'>
            <h3 className='text-xl font-bold text-center'>
               Question List Preview
            </h3>
            <h3 className='text-xl font-bold text-center'>
               Count: ({questions.length})
            </h3>
         </div>

         <ScrollShadow
            hideScrollBar
            className='flex flex-col h-full gap-2 pb-10 overflow-y-auto'>
            <div className='flex flex-col gap-8'>{questionCards}</div>
         </ScrollShadow>
      </div>
   );
};

export default memo(QuestionList);
