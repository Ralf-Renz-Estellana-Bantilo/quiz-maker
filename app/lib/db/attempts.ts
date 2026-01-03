import { inserData } from '@/app/controller/controller';
import { attemptsUrl } from '@/app/utils/urls';
import { QuizWithRawQuestions, Result } from '@/types/types';

interface Attempt {
   answers: any[];
   id: number;
   quiz: QuizWithRawQuestions;
   quizId: number;
   startedAt: string;
   submittedAt: string;
}

export async function createAttempt(quizId: number) {
   return inserData<Attempt, { quizId: number }>(attemptsUrl, { quizId });
}

export async function saveAttemptAnswer(
   attemptId: number,
   payload: {
      questionId: number;
      value: string;
   }
) {
   return inserData<unknown>(`${attemptsUrl}/${attemptId}/answer`, payload);
}

export async function submitAttempt(attemptId: number) {
   return inserData<Result>(`${attemptsUrl}/${attemptId}/submit`);
}
