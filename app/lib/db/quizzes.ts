import { fetchData, inserData, patchData } from '@/app/controller/controller';
import { quizzesUrl } from '@/app/utils/urls';
import { Quiz, QuizWithRawQuestions } from '@/types/types';

export async function getQuizzes(): Promise<Quiz[]> {
   return fetchData<Quiz[]>(quizzesUrl);
}

export async function getQuizWithQuestions(
   quizId: number
): Promise<QuizWithRawQuestions> {
   return fetchData<QuizWithRawQuestions>(`${quizzesUrl}/${quizId}`);
}

export async function createQuiz(payload: Quiz): Promise<Quiz> {
   return inserData<Quiz>(quizzesUrl, payload);
}

export async function updateQuiz(
   quizId: number,
   payload: Partial<Quiz>
): Promise<Quiz> {
   return patchData<Quiz>(`${quizzesUrl}/${quizId}`, payload);
}
