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
import {
   DEFAULT_QUIZWITHQUESTIONS_FORM_VALUE,
   QUESTION_INITIAL_VALUE,
} from '@/app/utils/constants';
import { getCookie } from '@/app/utils/utils';
import {
   ChangeHandler,
   Option,
   Question,
   Quiz,
   QuizWithQuestions,
} from '@/types/types';
import { useCallback, useEffect, useState } from 'react';

export default function CreateQuizPage() {
   const { execute } = useSuspension();

   const [form, setForm] = useState<Question>(QUESTION_INITIAL_VALUE);
   const [quiz, setQuiz] = useState<QuizWithQuestions>(
      DEFAULT_QUIZWITHQUESTIONS_FORM_VALUE
   );

   const onChange = useCallback(({ type, value }: ChangeHandler) => {
      setForm((prev) =>
         type === 'option'
            ? { ...prev, options: value }
            : { ...prev, [type]: value }
      );
   }, []);

   const addQuestion = useCallback(
      async (formValue: Question) => {
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

         const parseResponse = (response: Question) =>
            formValue.type === 'mcq'
               ? { ...response, options: formValue.options }
               : response;

         if (formValue.id === 0) {
            const response = await createQuestionMeta(
               quizIdFromCookie,
               payload
            );
            setQuiz((prev) => ({
               ...prev,
               questions: [...prev.questions, parseResponse(response)],
            }));
         } else {
            const questionId = formValue.id;
            const response = await updateQuestionMeta(questionId, payload);

            setQuiz((prev) => ({
               ...prev,
               questions: prev.questions.map((q) =>
                  q.id === questionId ? parseResponse(response) : q
               ),
            }));
         }

         setForm(QUESTION_INITIAL_VALUE);
      },
      [quiz]
   );

   const cancelUpdateQuestion = () => {
      setForm(QUESTION_INITIAL_VALUE);
   };

   const editQuestion = useCallback((question: Question) => {
      setForm(question);
   }, []);

   const removeQuestion = useCallback(async (questionId: number) => {
      await deleteQuestionMeta(questionId);
      getQuizWithQuestions();
   }, []);

   const getQuizWithQuestions = useCallback(() => {
      execute(async () => {
         const quizIdFromCookie = getCookie<number>('quizId', 0);
         const response = await getQuizWithQuestionsMeta(quizIdFromCookie);

         const refactoredQuestion = response.questions.map((question) => {
            const { type, options, correctAnswer } = question;

            if (type === 'mcq') {
               const refactoredOption: Option[] = options.map(
                  (option, index) => ({
                     id: Math.floor(Math.random() * 1000000),
                     isSelected: Number(correctAnswer) === index,
                     label: option,
                  })
               );

               return { ...question, options: refactoredOption };
            }
            return question;
         });

         const refactoredQuiz: QuizWithQuestions = {
            ...response,
            questions: refactoredQuestion as Question[],
         };

         setQuiz(refactoredQuiz);
      });
   }, [execute]);

   const handleAfterUpdateQuiz = useCallback(
      async (quiz: Quiz) => {
         await updateQuizMeta(quiz);
         getQuizWithQuestions();
      },
      [getQuizWithQuestions]
   );

   useEffect(() => {
      getQuizWithQuestions();
   }, [getQuizWithQuestions]);

   if (!quiz) return null;

   return (
      <div className='flex w-[90vw] h-[100dvh] gap-5 py-3'>
         <QuestionForm
            quiz={quiz}
            form={form}
            onAddQuestion={addQuestion}
            onCancelUpdateQuestion={cancelUpdateQuestion}
            onChange={onChange}
            handleAfterUpdateQuiz={handleAfterUpdateQuiz}
         />

         <QuestionList
            questions={quiz.questions}
            formId={form.id}
            onEditQuestion={editQuestion}
            onRemoveQuestion={removeQuestion}
         />
      </div>
   );
}
