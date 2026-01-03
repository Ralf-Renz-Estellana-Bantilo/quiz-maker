import { QuizWithRawQuestions, Result } from '@/types/types';
import { ATTEMPTS_URL } from '../utils/urls';
import { inserData } from './controller';

export interface Attempt {
   answers: any[];
   id: number;
   quiz: QuizWithRawQuestions;
   quizId: number;
   startedAt: string;
   submittedAt: string;
}

export const createAttempMeta = async (quizId: number): Promise<Attempt> => {
   return inserData<Attempt, { quizId: number }>(ATTEMPTS_URL, { quizId });
};

export const createAttempAnswerMeta = async (
   attemptId: number,
   payload: {
      questionId: number;
      value: string;
   }
): Promise<unknown> => {
   return inserData<unknown>(`${ATTEMPTS_URL}/${attemptId}/answer`, payload);
};

export const createAttempSubmitMeta = async (
   attemptId: number
): Promise<Result> => {
   return inserData<Result>(`${ATTEMPTS_URL}/${attemptId}/submit`);
};

export const createAttempMetaNew = async (quizId: number) => {
   const res = await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId }),
   });

   return res.json();
};

export const createAttempAnswerMetaNew = async (
   attemptId: number,
   payload: { questionId: number; value: string }
) => {
   await fetch(`/api/attempts/${attemptId}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
   });
};

export const createAttempSubmitMetaNew = async (attemptId: number) => {
   const res = await fetch(`/api/attempts/${attemptId}/submit`, {
      method: 'POST',
   });

   return res.json();
};
