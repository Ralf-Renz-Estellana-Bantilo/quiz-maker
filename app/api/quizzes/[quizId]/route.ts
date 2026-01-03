import { NextRequest, NextResponse } from 'next/server';
import { QuizWithRawQuestions, Quiz } from '@/types/types';
import { getQuizWithQuestions, updateQuiz } from '@/app/lib/db/quizzes';

export async function GET(
   _: Request,
   { params }: { params: { quizId: string } }
) {
   try {
      const quizId = Number(params.quizId);

      const quiz: QuizWithRawQuestions = await getQuizWithQuestions(quizId);

      return NextResponse.json(quiz);
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: 'Failed to fetch quiz' },
         { status: 500 }
      );
   }
}

export async function PATCH(req: NextRequest) {
   try {
      const payload: Partial<Quiz> = await req.json();

      if (!payload.id) {
         return NextResponse.json(
            { error: 'Quiz ID is required' },
            { status: 400 }
         );
      }

      const quiz = await updateQuiz(payload.id, payload);

      return NextResponse.json(quiz);
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: 'Failed to update quiz' },
         { status: 500 }
      );
   }
}
