import { Quiz, QuizWithQuestions } from '@/types';

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
