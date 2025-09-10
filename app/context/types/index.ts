import { Question, Quiz } from '@/types';

export interface Context {
   quizzes: Quiz[];
   questions: Question[];
   addQuizToList: (quiz: Quiz) => void;
   editQuizFromList: (quiz: Quiz) => void;
   removeQuizFromList: (quizId: number) => void;
   addQuestionToList: (questions: Question) => void;
   editQuestionFromList: (question: Question) => void;
   removeQuestionFromList: (questionId: number) => void;
   isPopupOpen: boolean;
   onPopupOpen: () => void;
   onPopupOpenChange: () => void;
}
