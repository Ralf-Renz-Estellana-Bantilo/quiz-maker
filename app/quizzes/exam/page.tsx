'use client';

import Timer from '@/app/components/Timer';
import {
   createAttempAnswerMeta,
   createAttempMeta,
} from '@/app/controller/attempts';
import { useSuspension } from '@/app/hook/useSuspension';
import { QuestionSVG } from '@/app/icons/icons';
import { getCookie, numberToCharacter, setCookie } from '@/app/utils/utils';
import { QuestionRaw, QuizWithRawQuestions } from '@/types';
import {
   addToast,
   Button,
   Checkbox,
   Chip,
   Input,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   Textarea,
   useDisclosure,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const QUESTION_INITIAL_VALUE: QuestionRaw = {
   id: 0,
   quizId: 0,
   type: 'short',
   prompt: '',
   options: [],
   correctAnswer: '',
   position: 1,
};

export default function ExamPage() {
   const router = useRouter();
   const { execute } = useSuspension();

   const [quizInfo, setQuizInfo] = useState<QuizWithRawQuestions | null>(null);

   const [tab, setTab] = useState(0);
   const [question, setQuestion] = useState<QuestionRaw>(
      QUESTION_INITIAL_VALUE
   );
   const [answerList, setAnswerList] = useState<Record<number, string>>({});
   const [timeLeft, setTimeLeft] = useState(0);

   const [submitPopupConfirmation, setSubmitPopupConfirmation] = useState({
      questionLength: 0,
      answerLength: 0,
   });
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const questionId = question.id;

   const handleAnswerChange = (questionId: number, value: string) => {
      setAnswerList((prev) => ({
         ...prev,
         [questionId]: value,
      }));
   };

   const onSubmit = () => {
      const questionLength = quizInfo!.questions.length;
      const answerLength = Object.values(answerList).length;

      console.log({ answerList, quizInfo });
      if (questionLength !== answerLength) {
         setSubmitPopupConfirmation({
            answerLength,
            questionLength,
         });

         onOpen();

         return;
      }

      processSubmission();
   };

   const processSubmission = async () => {
      const attemptIdFromCookie = getCookie<number>('attemptId', 0);

      try {
         const keys = Object.keys(answerList).map((k) => Number(k));
         const values = Object.values(answerList);

         await Promise.allSettled(
            keys.map((questionId, index) =>
               createAttempAnswerMeta(attemptIdFromCookie, {
                  questionId,
                  value: values[index],
               })
            )
         );

         router.push('/quizzes/result');
      } catch (error) {
         console.log(error);
      }
   };

   const navigateTab = (index: number) => {
      setQuestion(quizInfo!.questions[index]);
      setTab(index);
   };

   const onTimeExpire = () => {
      addToast({
         title: 'Time limit reached',
         variant: 'bordered',
         color: 'warning',
         description: 'Your time is up, answers are auto-saved.',
      });
      processSubmission();
   };

   const getQuizWithQuestions = () => {
      execute(async () => {
         const quizIdFromCookie = getCookie<number>('quizId', 0);
         const response = await createAttempMeta(quizIdFromCookie);
         const { id, quiz } = response;

         setCookie('attemptId', `${id}`);
         if (quiz.timeLimitSeconds) {
            const timeLeftFromCookie = getCookie<number>(
               'timeLeft',
               quiz.timeLimitSeconds
            );
            setTimeLeft(timeLeftFromCookie);
         }

         setQuestion(quiz.questions[tab]);
         setQuizInfo(quiz);
      });
   };

   useEffect(() => {
      getQuizWithQuestions();
   }, []);

   if (!quizInfo) return null;

   return (
      <>
         <div className='flex flex-col w-[50vw] h-[100dvh] justify-center gap-5 py-3'>
            <div className='flex flex-col gap-3 p-3 rounded-md grow border-1 border-slate-700'>
               <div className='flex items-center justify-between pb-3 border-b-1 border-b-slate-700'>
                  <div className='flex flex-col gap-1 max-w-[80%]'>
                     <h3 className='text-xl font-bold'>{quizInfo.title}</h3>
                     <p>{quizInfo.description}</p>
                     {quizInfo.timeLimitSeconds && (
                        <Timer
                           timeLimitSeconds={timeLeft}
                           onFinish={onTimeExpire}
                        />
                     )}
                  </div>

                  <div className='flex flex-col items-center gap-3'>
                     <Chip color='success' variant='light'>
                        On-going
                     </Chip>
                     <Button color='primary' onPress={onSubmit}>
                        Submit
                     </Button>
                  </div>
               </div>

               <div className='flex flex-col justify-between h-full'>
                  <div className='flex flex-col gap-3 p-2 rounded-md border-1 border-slate-700 bg-slate-500/10 backdrop-filter backdrop-blur-sm'>
                     <div className='flex items-center justify-between p-3 pt-1 border-b-1 border-b-slate-700'>
                        <div className='flex items-center gap-2'>
                           <QuestionSVG />
                           <h3 className='font-semibold'>Question {tab + 1}</h3>
                        </div>
                     </div>

                     <div className='flex flex-col gap-2'>
                        <h3 className='py-1 font-semibold text-center'>
                           {question.prompt}
                        </h3>

                        <div className='flex flex-col gap-2 p-2 rounded-md border-1 border-slate-700 bg-slate-500/05 backdrop-filter backdrop-blur-sm'>
                           {question.type === 'mcq' && (
                              <div className='flex flex-col gap-1 p-2'>
                                 {question.options.map((option, idx) => (
                                    <div
                                       className='flex items-center justify-between px-2 rounded-md bg-slate-500/10 backdrop-filter backdrop-blur-sm'
                                       key={option}>
                                       <div className='flex items-center gap-5'>
                                          <Checkbox
                                             className='border-r-1 border-r-slate-600'
                                             isSelected={
                                                answerList[questionId] ===
                                                `${idx}`
                                             }
                                             onValueChange={() =>
                                                handleAnswerChange(
                                                   questionId,
                                                   `${idx}`
                                                )
                                             }>
                                             {numberToCharacter(idx)}
                                          </Checkbox>
                                          <span className='p-2 text-sm'>
                                             {option}
                                          </span>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}

                           {question.type === 'short' && (
                              <Input
                                 label='Answer'
                                 placeholder='Enter your answer here...'
                                 variant='bordered'
                                 value={answerList[questionId] ?? ''}
                                 onChange={(e) =>
                                    handleAnswerChange(
                                       questionId,
                                       e.target.value
                                    )
                                 }
                              />
                           )}

                           {question.type === 'code' && (
                              <Textarea
                                 label='Code Snippet'
                                 variant='bordered'
                                 maxRows={70}
                                 placeholder='Enter your code here...'
                                 value={answerList[questionId] ?? ''}
                                 onChange={(e) =>
                                    handleAnswerChange(
                                       questionId,
                                       e.target.value
                                    )
                                 }
                              />
                           )}
                        </div>
                     </div>
                  </div>

                  <div className='flex items-center justify-end gap-3'>
                     <Button
                        variant='bordered'
                        color='primary'
                        isDisabled={tab === 0}
                        onPress={() => navigateTab(tab - 1)}>
                        Previous
                     </Button>

                     <Button
                        color='primary'
                        onPress={() => navigateTab(tab + 1)}
                        isDisabled={tab === quizInfo?.questions?.length - 1}>
                        Next
                     </Button>
                  </div>
               </div>
            </div>
            <div className='flex items-center justify-center gap-2 p-3'>
               {quizInfo.questions.map((q, i) => (
                  <Button
                     key={i}
                     color='primary'
                     variant={
                        tab === i
                           ? 'solid'
                           : Boolean(answerList[q.id])
                             ? 'bordered'
                             : 'light'
                     }
                     className='max-w-[80px]'
                     onPress={() => navigateTab(i)}>
                     {i + 1}
                  </Button>
               ))}
            </div>
         </div>
         <Modal
            isDismissable={false}
            backdrop='blur'
            isOpen={isOpen}
            onOpenChange={onOpenChange}>
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className='flex flex-col gap-1'>
                        Confirm Submission
                     </ModalHeader>
                     <ModalBody>
                        <div className='flex flex-col gap-3'>
                           <div className='flex flex-col'>
                              <h3 className='text-xl font-semibold text-center'>
                                 Are you sure you want to submit?
                              </h3>
                              <small className='text-center'>
                                 Some questions haven't been answered yet.
                              </small>
                           </div>
                           <p className='text-center'>
                              Answered:{' '}
                              <strong>{`${submitPopupConfirmation.answerLength}/${submitPopupConfirmation.questionLength}`}</strong>
                           </p>
                        </div>
                     </ModalBody>
                     <ModalFooter>
                        <Button color='danger' onPress={onClose}>
                           Cancel
                        </Button>
                        <Button
                           color='primary'
                           variant='light'
                           onPress={() => {
                              onClose();
                              processSubmission();
                           }}>
                           Confirm
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>
      </>
   );
}
