'use client';

import QuestionCard from '@/app/components/QuestionCard';
import { getQuizWithQuestionsMeta } from '@/app/controller/quizzes';
import { QuestionSVG } from '@/app/icons/icons';
import { convertSecondsToMinutes, numberToCharacter } from '@/app/utils/utils';
import { Question, QuestionRaw, QuizWithRawQuestions } from '@/types';
import { Button, Checkbox, Chip, Input, Textarea } from '@heroui/react';
import { useParams } from 'next/navigation';
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
   const [quizInfo, setQuizInfo] = useState<QuizWithRawQuestions>();

   const [tab, setTab] = useState(0);
   const [question, setQuestion] = useState<QuestionRaw>(
      QUESTION_INITIAL_VALUE
   );
   const [answerList, setAnswerList] = useState<Record<number, string>>({});

   const params = useParams();
   const { id: quizId } = params;
   const questionId = question.id;

   const getQuizWithQuestions = async () => {
      const response = await getQuizWithQuestionsMeta(Number(quizId));

      console.log({ response });

      setQuestion(response.questions[tab]);
      setQuizInfo(response);
   };

   const handleAnswerChange = (questionId: number, value: string) => {
      setAnswerList((prev) => ({
         ...prev,
         [questionId]: value,
      }));
   };

   useEffect(() => {
      (async () => await getQuizWithQuestions())();
   }, []);

   if (!quizInfo) {
      return null;
   }

   const handlePrevQuestion = () => {
      const prevTab = tab - 1;

      if (prevTab >= 0) {
         setQuestion(quizInfo.questions[prevTab]);
         setTab(prevTab);
      }
   };

   const handleNextQuestion = () => {
      const nextTab = tab + 1;

      if (nextTab <= quizInfo.questions.length - 1) {
         setQuestion(quizInfo.questions[nextTab]);
         setTab(nextTab);
      }
   };

   const navigateTab = (index: number) => {
      setQuestion(quizInfo.questions[index]);
      setTab(index);
   };

   return (
      <div className='flex flex-col w-[50vw] h-[100dvh] justify-center gap-5 py-3'>
         <div className='flex flex-col gap-3 p-3 rounded-md grow border-1 border-slate-700'>
            <div className='flex items-center justify-between pb-3 border-b-1 border-b-slate-700'>
               <div className='flex flex-col gap-1 max-w-[80%]'>
                  <h3 className='text-xl font-bold'>{quizInfo.title}</h3>
                  <p>{quizInfo.description}</p>
                  <p>Time left: {convertSecondsToMinutes(130)} mins</p>
               </div>

               <div className='flex flex-col items-center gap-3'>
                  <Chip color='success'>On-going</Chip>
                  <Button color='primary'>Submit</Button>
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
                                             answerList[questionId] === `${idx}`
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
                              value={answerList[questionId]}
                              onChange={(e) =>
                                 handleAnswerChange(questionId, e.target.value)
                              }
                           />
                        )}

                        {question.type === 'code' && (
                           <Textarea
                              label='Code Snippet'
                              variant='bordered'
                              maxRows={70}
                              placeholder='Enter your code here...'
                              value={answerList[questionId]}
                              onChange={(e) =>
                                 handleAnswerChange(questionId, e.target.value)
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
                     onPress={handlePrevQuestion}>
                     Previous
                  </Button>

                  <Button
                     color='primary'
                     onPress={handleNextQuestion}
                     isDisabled={tab === quizInfo.questions.length - 1}>
                     Next
                  </Button>
               </div>
            </div>
         </div>
         <div className='flex items-center justify-center gap-2 p-3'>
            {Array.from({ length: quizInfo.questions.length }, (_, index) => {
               return (
                  <Button
                     key={index}
                     color='primary'
                     variant={
                        tab === index
                           ? 'solid'
                           : Boolean(answerList[questionId])
                             ? 'bordered'
                             : 'light'
                     }
                     className='max-w-[80px]'
                     onPress={() => navigateTab(index)}>
                     {index + 1}
                  </Button>
               );
            })}
         </div>
      </div>
   );
}
