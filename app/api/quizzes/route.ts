import { createQuiz, getQuizzes } from '@/app/lib/db/quizzes';
import { Quiz } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
   try {
      const quizzes: Quiz[] = await getQuizzes();
      return NextResponse.json(quizzes);
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: 'Failed to fetch quizzes' },
         { status: 500 }
      );
   }
}

export async function POST(req: NextRequest) {
   try {
      const payload: Quiz = await req.json();

      const quiz = await createQuiz(payload);

      return NextResponse.json(quiz, { status: 201 });
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: 'Failed to create quiz' },
         { status: 500 }
      );
   }
}
