import { Quiz, QuizWithRawQuestions } from '@/types';
import { QUIZZES_URL } from '../utils/urls';
import { fetchData, inserData, patchData } from './controller';

export const getQuizzesMeta = async (): Promise<Quiz[]> => {
   return fetchData<Quiz[]>(QUIZZES_URL);
};

export const getQuizWithQuestionsMeta = async (
   quizId: number
): Promise<QuizWithRawQuestions> => {
   return fetchData<QuizWithRawQuestions>(`${QUIZZES_URL}/${quizId}`);
};

export const createQuizMeta = async (payload: Quiz): Promise<Quiz> => {
   return inserData<Quiz>(QUIZZES_URL, payload);
};

export const updateQuizMeta = async (
   quizId: number,
   payload: Partial<Quiz>
): Promise<Quiz> => {
   return patchData<Quiz>(`${QUIZZES_URL}/${quizId}`, payload);
};
