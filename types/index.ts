import { Dispatch, SetStateAction, SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
   size?: number;
};

export interface Context {
   quizzes: Quiz[];
   questions: Question[];
   addQuizToList: (quiz: Quiz) => void;
   addQuestionToList: (questions: Question) => void;
   editQuestionFromList: (question: Question) => void;
   removeQuestionFromList: (questionId: number) => void;
}

export interface Quiz {
   id: number;
   title: string;
   description: string;
   timeLimitSeconds?: number | null;
   isPublished: boolean;
   createdAt: string;
}

export type QuestionType = 'mcq' | 'short' | 'code';
export interface Option {
   id: number;
   label: string;
   isCorrect: boolean;
}

export interface Question {
   id: number;
   quizId: number;
   type: QuestionType;
   prompt: string;
   options: Option[];
   correctAnswer: string;
   position: number;
   createdAt: string;
}

export interface Attempt {
   id: number;
   quizId: number;
   startedAt: string;
   submittedAt?: string | null;
   score?: number | null;
}

export interface AttemptAnswer {
   attemptId: number;
   questionId: number;
   value: string;
}

export interface AttemptEvent {
   id: number;
   attemptId: number;
   event: string;
   timestamp: string;
}

export interface QuestionCardProps {
   value: Question;
   onChange: (arg: ChangeHandler) => void;
   title: string;
   mode: 'read' | 'edit' | 'create';
   onEditQuestion?: (question: Question) => void;
   onRemoveQuestion?: (questionId: number) => void;
}

export type ChangeHandler =
   | {
        type: 'prompt' | 'type';
        value: string;
     }
   | {
        type: 'option';
        value: Option[];
     };
