import { Question } from '@/types';
import React, { useContext, useState } from 'react';
import QuestionCard from './QuestionCard';
import { ClientContext } from '../context/context';

const QUESTION_INITIAL_VALUE: Question = {
   id: 0,
   quizId: 0,
   type: 'short',
   prompt: '',
   options: [],
   correctAnswer: '',
   position: 1,
   createdAt: new Date(Date.now()).toDateString(),
};

const Questionnaire = ({ questions }: { questions: Question[] }) => {
   return (
      <div className='flex flex-col gap-3'>
         {questions.map((question, index) => (
            <QuestionCard
               key={index}
               title={`Question ${index + 1}`}
               value={question}
               onChange={() => {}}
               mode='read'
            />
         ))}
      </div>
   );
};

export default Questionnaire;
