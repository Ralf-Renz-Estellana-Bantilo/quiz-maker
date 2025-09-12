import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
   size?: number;
};

export interface Context {
   isPopupOpen: boolean;
   onPopupOpen: () => void;
   onPopupOpenChange: () => void;
}

export interface Quiz {
   id: number;
   title: string;
   description: string;
   timeLimitSeconds?: number | null;
   isPublished: boolean;
   createdAt: string;
}

export type Mode = 'edit' | 'read';
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
   options?: Option[];
   correctAnswer: string;
   position: number;
}

export interface QuestionRaw extends Omit<Question, 'options'> {
   options: string[];
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

interface ResultDetail {
   questionId: number;
   correct: boolean;
   expected: string;
}

export interface Result {
   details: ResultDetail[];
   score: number;
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
        type: 'correctAnswer';
        value: string;
     }
   | {
        type: 'option';
        value: Option[];
     };
