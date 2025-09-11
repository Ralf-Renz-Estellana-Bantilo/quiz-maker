'use client';

import { ChangeHandler, Question, Quiz, QuizWithQuestions } from '@/types';
import { Button } from '@heroui/button';
import { addToast, Chip, ScrollShadow, useDisclosure } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { TOAST_PROPERTIES } from '../context/context';
import { updateQuizMeta } from '../controller/quizzes';
import { EditSVG } from '../icons/icons';
import { convertSecondsToMinutes, deleteAllCookies } from '../utils/utils';
import CreateQuizModal from './modals/CreateQuizModal';
import QuestionCard from './QuestionCard';

const QuestionForm = ({
   quiz,
   form,
   onAddQuestion,
   onChange,
   handleAfterUpdateQuiz,
}: {
   quiz: QuizWithQuestions;
   form: Question;
   onChange: ({ type, value }: ChangeHandler) => void;
   onAddQuestion: (form: Question) => void;
   handleAfterUpdateQuiz: (quiz: Quiz) => void;
}) => {
   const router = useRouter();
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const updateQuiz = async (form: Quiz) => {
      const updatedQuiz: Quiz = {
         ...form,
         timeLimitSeconds:
            form.timeLimitSeconds && form.timeLimitSeconds != 0
               ? Number(form.timeLimitSeconds) * 60
               : null,
      };

      console.log({
         form,
         updatedQuiz,
      });

      handleAfterUpdateQuiz(updatedQuiz);
   };

   const cancelQuizCreation = () => {
      deleteAllCookies();
      router.push('/');
   };

   const saveQuiz = async () => {
      if (quiz.questions.length === 0) return;

      const { questions: _, ...restValue } = quiz;
      const updatedQuiz: Quiz = {
         ...restValue,
         isPublished: true,
      };

      await updateQuizMeta(updatedQuiz);

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
         const options = form.options ?? [];
         const hasCorrectValue = options
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

      onAddQuestion(form);
   };

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
                        isDisabled={quiz.questions.length === 0}
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
