import { Question } from '@/types';
import { deleteData, fetchData, inserData, patchData } from './controller';
import { QUESTIONS_URL } from '../utils/urls';

export const createQuestionMeta = async (
   quizId: number,
   payload: Question
): Promise<Question> => {
   return inserData<Question>(`${QUESTIONS_URL}/${quizId}/questions`, payload);
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
