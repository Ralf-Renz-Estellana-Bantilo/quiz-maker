import { QuizWithRawQuestions, Result } from '@/types';
import { ATTEMPTS_URL } from '../utils/urls';
import { inserData } from './controller';

interface Attempt {
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
