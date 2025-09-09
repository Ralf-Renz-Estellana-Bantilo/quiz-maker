'use client';

import QuestionCard from '@/app/components/QuestionCard';
import QuestionForm from '@/app/components/QuestionForm';
import QuestionList from '@/app/components/QuestionList';
import Questionnaire from '@/app/components/Questionnaire';
import { ClientContext } from '@/app/context/context';
import { DeleteSVG, EditSVG, QuestionSVG } from '@/app/icons/icons';
import { ChangeHandler, Question } from '@/types';
import {
   Button,
   Checkbox,
   Chip,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
   Input,
   ScrollShadow,
} from '@heroui/react';
import { useContext, useState } from 'react';

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

export default function CreateQuizPage() {
   const {
      questions,
      addQuestionToList,
      removeQuestionFromList,
      editQuestionFromList,
   } = useContext(ClientContext);
   const [form, setForm] = useState<Question>(QUESTION_INITIAL_VALUE);

   const onChange = ({ type, value }: ChangeHandler) => {
      if (type === 'option') {
         setForm((prev) => ({
            ...prev,
            options: value,
         }));
      } else {
         setForm((prev) => ({
            ...prev,
            [type]: value,
         }));
      }
   };

   const addQuestion = () => {
      if (form.id === 0) {
         const updatedForm: Question = {
            ...form,
            id: Math.floor(Math.random() * 1000000),
         };
         addQuestionToList(updatedForm);
      } else {
         editQuestionFromList(form);
      }

      setForm(QUESTION_INITIAL_VALUE);
   };

   const editQuestion = (question: Question) => {
      console.log({ question });
      setForm(question);
   };
   const removeQuestion = (questionId: number) => {
      removeQuestionFromList(questionId);
   };

   return (
      <div className='flex w-[90vw] h-[100dvh] gap-5 py-3'>
         <QuestionForm
            form={form}
            onAddQuestion={addQuestion}
            onChange={onChange}
         />

         <QuestionList
            questions={questions}
            onEditQuestion={editQuestion}
            onRemoveQuestion={removeQuestion}
         />
      </div>
   );
}
