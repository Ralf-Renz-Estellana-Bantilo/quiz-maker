import { NextRequest, NextResponse } from 'next/server';
import { QuizWithRawQuestions } from '@/types/types';
import { createAttempt } from '@/app/lib/db/attempts';

interface Attempt {
   answers: any[];
   id: number;
   quiz: QuizWithRawQuestions;
   quizId: number;
   startedAt: string;
   submittedAt: string | null;
}

export async function POST(req: NextRequest) {
   try {
      const { quizId } = await req.json();

      if (!quizId) {
         return NextResponse.json(
            { error: 'quizId is required' },
            { status: 400 }
         );
      }

      const attempt: Attempt = await createAttempt(quizId);

      return NextResponse.json(attempt, { status: 201 });
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: 'Failed to create attempt' },
         { status: 500 }
      );
   }
}
