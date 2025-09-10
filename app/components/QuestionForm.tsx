'use client';

import { ChangeHandler, Question, Quiz, QuizWithQuestions } from '@/types';
import { Button } from '@heroui/button';
import { addToast, Chip, ScrollShadow, useDisclosure } from '@heroui/react';
import { useContext, useEffect, useState } from 'react';
import { ClientContext, TOAST_PROPERTIES } from '../context/context';
import { EditSVG } from '../icons/icons';
import { DEFAULT_QUIZ_FORM_VALUE } from '../utils/constants';
import {
   convertSecondsToMinutes,
   deleteAllCookies,
   getCookie,
} from '../utils/utils';
import CreateQuizModal from './modals/CreateQuizModal';
import QuestionCard from './QuestionCard';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getQuizWithQuestionsMeta } from '../controller/quizzes';

const QuestionForm = ({
   quiz,
   form,
   onAddQuestion,
   onChange,
}: {
   quiz: QuizWithQuestions;
   form: Question;
   onChange: ({ type, value }: ChangeHandler) => void;
   onAddQuestion: () => void;
}) => {
   const router = useRouter();
   const {
      quizzes,
      questions,
      editQuizFromList,
      removeQuizFromList,
      removeQuestionFromList,
   } = useContext(ClientContext);
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const [currentQuiz, setCurrentQuiz] = useState<Quiz>(
      DEFAULT_QUIZ_FORM_VALUE
   );

   const params = useParams();
   const { id: quizId } = params;

   const updateQuiz = (form: Quiz) => {
      const updatedQuiz: Quiz = {
         ...form,
         timeLimitSeconds:
            form.timeLimitSeconds && form.timeLimitSeconds != 0
               ? Number(form.timeLimitSeconds)
               : null,
      };
      setCurrentQuiz(updatedQuiz);
      editQuizFromList(updatedQuiz);
   };

   const cancelQuizCreation = () => {
      removeQuizFromList(Number(quizId));
      const allQuestionsRelatedToQuiz = questions.filter(
         (q) => q.quizId === Number(quizId)
      );

      allQuestionsRelatedToQuiz.forEach(({ id }) => {
         removeQuestionFromList(id);
      });

      deleteAllCookies();
      router.push('/');
   };

   const saveQuiz = () => {
      const updatedQuiz: Quiz = {
         ...currentQuiz,
         isPublished: true,
      };

      editQuizFromList(updatedQuiz);
      deleteAllCookies();
      router.push('/quizzes/list');
   };

   const addQuestion = () => {
      if (!Boolean(form.prompt.trim())) {
         addToast({
            ...TOAST_PROPERTIES,
            description: 'The question field should have value.',
         });
         return;
      } else if (form.type === 'mcq') {
         const hasCorrectValue = form.options
            .map((opt) => opt.isSelected)
            .includes(true);

         if (!hasCorrectValue) {
            addToast({
               ...TOAST_PROPERTIES,
               description: 'No correct answer selected yet.',
            });
            return;
         }
      }

      onAddQuestion();
   };

   const getQuizWithQuestions = async () => {
      const response = await getQuizWithQuestionsMeta(Number(quizId));
      setCurrentQuiz(response);
   };

   useEffect(() => {
      (async () => await getQuizWithQuestions())();
   }, []);

   return (
      <>
         <CreateQuizModal
            title='Update Quiz Info'
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onContinue={updateQuiz}
            initialValue={quiz}
         />
         <div className='flex flex-col gap-3 w-[45vw] border-1 border-slate-700 rounded-md p-3'>
            <div className='flex items-center justify-between pb-3 border-b-1 border-b-slate-700'>
               <div className='flex flex-col gap-2 max-w-[80%]'>
                  <div className='flex items-center gap-3'>
                     <h3 className='text-xl font-bold'>{quiz.title}</h3>
                     <Button
                        isIconOnly
                        onPress={onOpen}
                        aria-label='Edit question'
                        variant='light'>
                        <EditSVG />
                     </Button>
                  </div>
                  <p>{quiz.description}</p>
                  {Boolean(quiz.timeLimitSeconds) && (
                     <Chip>
                        Time limit:{' '}
                        {convertSecondsToMinutes(Number(quiz.timeLimitSeconds))}{' '}
                        mins
                     </Chip>
                  )}
               </div>

               <div className='flex flex-col items-center gap-3'>
                  <Chip color={quiz.isPublished ? 'success' : 'default'}>
                     {quiz.isPublished ? 'Published' : 'Unpublished'}
                  </Chip>
                  <div className='flex gap-2'>
                     <Button
                        className='flex-grow'
                        onPress={cancelQuizCreation}
                        color='primary'
                        variant='bordered'>
                        Cancel
                     </Button>
                     <Button
                        className='flex-grow'
                        onPress={saveQuiz}
                        color='primary'>
                        Save
                     </Button>
                  </div>
               </div>
            </div>

            <div className='flex flex-col justify-between h-full'>
               <ScrollShadow
                  hideScrollBar
                  className=' overflow-y-auto max-h-[65vh] pb-10'>
                  <QuestionCard
                     title={
                        form.id === 0 ? 'Create Question' : 'Modify Question'
                     }
                     value={form}
                     onChange={onChange}
                     mode='create'
                  />
               </ScrollShadow>

               <Button color='primary' onPress={addQuestion}>
                  {form.id === 0 ? 'Add Question' : 'Update Question'}
               </Button>
            </div>
         </div>
      </>
   );
};

export default QuestionForm;
