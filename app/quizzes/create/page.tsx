'use client';

import QuestionForm from '@/app/components/QuestionForm';
import QuestionList from '@/app/components/QuestionList';
import {
   createQuestionMeta,
   deleteQuestionMeta,
   updateQuestionMeta,
} from '@/app/controller/questions';
import {
   getQuizWithQuestionsMeta,
   updateQuizMeta,
} from '@/app/controller/quizzes';
import { useSuspension } from '@/app/hook/useSuspension';
import { DEFAULT_QUIZWITHQUESTIONS_FORM_VALUE } from '@/app/utils/constants';
import { getCookie } from '@/app/utils/utils';
import {
   ChangeHandler,
   Option,
   Question,
   Quiz,
   QuizWithQuestions,
} from '@/types';
import { useEffect, useState } from 'react';

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
   const { execute } = useSuspension();

   const [form, setForm] = useState<Question>(QUESTION_INITIAL_VALUE);
   const [quiz, setQuiz] = useState<QuizWithQuestions>(
      DEFAULT_QUIZWITHQUESTIONS_FORM_VALUE
   );

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

   const addQuestion = async (formValue: Question) => {
      const quizIdFromCookie = getCookie<number>('quizId', 0);
      const updatedForm: Question = {
         ...formValue,
         quizId: quizIdFromCookie,
      };

      let payload: any = updatedForm;
      if (formValue.type === 'short') {
         const { options: _, ...restValue } = updatedForm;

         payload = restValue;
      } else if (formValue.type === 'mcq') {
         payload = {
            ...updatedForm,
            options: updatedForm.options?.map((opt) => opt.label),
         };
      }

      const parseResponse = (response: Question) => {
         return formValue.type === 'mcq'
            ? {
                 ...response,
                 options: formValue.options,
              }
            : response;
      };

      if (formValue.id === 0) {
         const response = await createQuestionMeta(quizIdFromCookie, payload);

         console.log({
            newQuizValue: {
               ...quiz,
               questions: [...quiz.questions, parseResponse(response)],
            },
            quiz,
            formValue,
            updatedForm,
            response,
         });

         setQuiz((prev) => ({
            ...prev,
            questions: [...prev.questions, parseResponse(response)],
         }));
      } else {
         const questionId = formValue.id;
         const response = await updateQuestionMeta(questionId, payload);

         const updatedQuestions = quiz.questions.map((q) =>
            q.id === questionId ? parseResponse(response) : q
         );

         setQuiz((prev) => ({
            ...prev,
            questions: updatedQuestions,
         }));
      }

      setForm(QUESTION_INITIAL_VALUE);
   };

   const editQuestion = (question: Question) => {
      setForm(question);
   };

   const removeQuestion = async (questionId: number) => {
      await deleteQuestionMeta(questionId);
      getQuizWithQuestions();
   };

   const getQuizWithQuestions = () => {
      execute(async () => {
         const quizIdFromCookie = getCookie<number>('quizId', 0);
         const response = await getQuizWithQuestionsMeta(quizIdFromCookie);

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

         setQuiz(refactoredQuiz);
      });
   };
   const handleAfterUpdateQuiz = async (quiz: Quiz) => {
      await updateQuizMeta(quiz);
      getQuizWithQuestions();
   };

   useEffect(() => {
      getQuizWithQuestions();
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
            handleAfterUpdateQuiz={handleAfterUpdateQuiz}
         />

         <QuestionList
            questions={quiz.questions}
            onEditQuestion={editQuestion}
            onRemoveQuestion={removeQuestion}
         />
      </div>
   );
}
