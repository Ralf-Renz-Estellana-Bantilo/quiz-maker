import { Question } from '@/types/types';
import { QUESTIONS_URL, QUIZZES_URL } from '../utils/urls';
import { deleteData, inserData, patchData } from './controller';

export const createQuestionMeta = async (
   quizId: number,
   payload: Question
): Promise<Question> => {
   return inserData<Question>(`${QUIZZES_URL}/${quizId}/questions`, payload);
};

export const updateQuestionMeta = async (
   questionId: number,
   payload: Partial<Question>
): Promise<Question> => {
   return patchData<Question>(`${QUESTIONS_URL}/${questionId}`, payload);
};

export const deleteQuestionMeta = async (
   questionId: number
): Promise<Question> => {
   return deleteData<Question>(`${QUESTIONS_URL}/${questionId}`);
};

export const createQuestionMetaNew = async (
   quizId: number,
   payload: Question
) => {
   const res = await fetch(`/api/quizzes/${quizId}/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
   });

   return res.json();
};

export const updateQuestionMetaNew = async (
   questionId: number,
   payload: Partial<Question>
) => {
   const res = await fetch(`/api/questions/${questionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
   });

   return res.json();
};

export const deleteQuestionMetaNew = async (questionId: number) => {
   const res = await fetch(`/api/questions/${questionId}`, {
      method: 'DELETE',
   });

   return res.json();
};
