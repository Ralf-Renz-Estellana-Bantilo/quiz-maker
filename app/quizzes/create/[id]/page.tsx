'use client';

import QuestionForm from '@/app/components/QuestionForm';
import QuestionList from '@/app/components/QuestionList';
import { ClientContext } from '@/app/context/context';
import { getQuizWithQuestionsMeta } from '@/app/controller/quizzes';
import { ChangeHandler, Option, Question, QuizWithQuestions } from '@/types';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const QUESTION_INITIAL_VALUE: Question = {
   id: 0,
   quizId: 0,
   type: 'short',
   prompt: '',
   options: [],
   correctAnswer: '',
   position: 1,
};

export default function CreateQuizPage() {
   const {
      questions,
      addQuestionToList,
      removeQuestionFromList,
      editQuestionFromList,
   } = useContext(ClientContext);

   const [form, setForm] = useState<Question>(QUESTION_INITIAL_VALUE);
   const [quiz, setQuiz] = useState<QuizWithQuestions>();

   const params = useParams();
   const { id: quizId } = params;

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

   const getQuizWithQuestions = async () => {
      const response = await getQuizWithQuestionsMeta(Number(quizId));

      let refactoredQuestion = response.questions.map((question) => {
         const { type, options, correctAnswer } = question;

         if (type === 'mcq') {
            const refactoredOption: Option[] = Array.from(
               options,
               (option, index) => {
                  return {
                     id: Math.floor(Math.random() * 1000000),
                     isSelected: Number(correctAnswer) === index,
                     label: option,
                  };
               }
            );

            return {
               ...question,
               options: refactoredOption,
            };
         } else {
            return question;
         }
      });

      const refactoredQuiz: QuizWithQuestions = {
         ...response,
         questions: refactoredQuestion as unknown as Question[],
      };

      console.log({
         response,
         refactoredQuiz,
      });

      setQuiz(refactoredQuiz);
   };

   useEffect(() => {
      (async () => await getQuizWithQuestions())();
   }, []);

   if (!quiz) {
      return null;
   }

   return (
      <div className='flex w-[90vw] h-[100dvh] gap-5 py-3'>
         <QuestionForm
            quiz={quiz}
            form={form}
            onAddQuestion={addQuestion}
            onChange={onChange}
         />

         <QuestionList
            questions={quiz.questions}
            onEditQuestion={editQuestion}
            onRemoveQuestion={removeQuestion}
         />
      </div>
   );
}
