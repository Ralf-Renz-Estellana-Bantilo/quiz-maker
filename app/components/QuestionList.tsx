'use client';

import { Question } from '@/types';
import { ScrollShadow } from '@heroui/scroll-shadow';
import QuestionCard from './QuestionCard';

const QuestionList = ({
   questions,
   onEditQuestion,
   onRemoveQuestion,
}: {
   questions: Question[];
   onEditQuestion: (question: Question) => void;
   onRemoveQuestion: (questionId: number) => void;
}) => {
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
            <div className='flex flex-col gap-8'>
               {questions.map((question, index) => (
                  <QuestionCard
                     key={index}
                     title={`Question ${index + 1}`}
                     value={question}
                     onChange={() => {}}
                     mode='list'
                     hasActionButtons
                     onEditQuestion={onEditQuestion}
                     onRemoveQuestion={onRemoveQuestion}
                  />
               ))}
            </div>
         </ScrollShadow>
      </div>
   );
};

export default QuestionList;
