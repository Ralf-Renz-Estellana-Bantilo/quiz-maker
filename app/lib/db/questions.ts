import { deleteData, inserData, patchData } from '@/app/controller/controller';
import { questionsUrl, quizzesUrl } from '@/app/utils/urls';
import { Question } from '@/types/types';

export async function createQuestion(
   quizId: number,
   payload: Question
): Promise<Question> {
   return inserData<Question>(`${quizzesUrl}/${quizId}/questions`, payload);
}

export async function updateQuestion(
   questionId: number,
   payload: Partial<Question>
): Promise<Question> {
   return patchData<Question>(`${questionsUrl}/${questionId}`, payload);
}

export async function deleteQuestion(questionId: number): Promise<Question> {
   return deleteData<Question>(`${questionsUrl}/${questionId}`);
}
