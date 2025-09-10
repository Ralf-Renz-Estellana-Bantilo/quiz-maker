import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
   size?: number;
};

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
   isSelected: boolean;
}

export interface Question {
   id: number;
   quizId: number;
   type: QuestionType;
   prompt: string;
   options: Option[];
   correctAnswer: string;
   position: number;
}

export interface QuestionRaw {
   id: number;
   quizId: number;
   type: QuestionType;
   prompt: string;
   options: string[];
   correctAnswer: string;
   position: number;
}

export interface QuizWithQuestions extends Quiz {
   questions: Question[];
}
export interface QuizWithRawQuestions extends Quiz {
   questions: QuestionRaw[];
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

export type ChangeHandler =
   | {
        type: 'prompt';
        value: string;
     }
   | {
        type: 'type';
        value: string;
     }
   | {
        type: 'option';
        value: Option[];
     };
