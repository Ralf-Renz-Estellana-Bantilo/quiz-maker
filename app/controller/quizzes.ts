import { Quiz, QuizWithRawQuestions } from '@/types/types';
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

export const updateQuizMeta = async (payload: Partial<Quiz>): Promise<Quiz> => {
   return patchData<Quiz>(`${QUIZZES_URL}/${payload.id}`, payload);
};

export const getQuizzesMetaNew = async () => {
   const res = await fetch('/api/quizzes');
   return res.json();
};

export const getQuizWithQuestionsMetaNew = async (quizId: number) => {
   const res = await fetch(`/api/quizzes/${quizId}`);
   return res.json();
};

export const createQuizMetaNew = async (payload: Quiz) => {
   const res = await fetch('/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
   });

   return res.json();
};

export const updateQuizMetaNew = async (payload: Partial<Quiz>) => {
   const res = await fetch(`/api/quizzes/${payload.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
   });

   return res.json();
};
