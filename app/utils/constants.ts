import { Question, Quiz, QuizWithQuestions } from '@/types/types';

export const DEFAULT_QUIZ_FORM_VALUE: Quiz = {
   createdAt: '',
   description: '',
   id: 0,
   isPublished: false,
   title: '',
   timeLimitSeconds: undefined,
};

export const DEFAULT_QUIZWITHQUESTIONS_FORM_VALUE: QuizWithQuestions = {
   ...DEFAULT_QUIZ_FORM_VALUE,
   questions: [],
};

export const QUESTION_INITIAL_VALUE: Question = {
   id: 0,
   quizId: 0,
   type: 'short',
   prompt: '',
   options: [],
   correctAnswer: '',
   position: 1,
};
