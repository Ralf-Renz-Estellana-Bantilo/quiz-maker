import { NextResponse } from 'next/server';
import { Result } from '@/types/types';
import { submitAttempt } from '@/app/lib/db/attempts';

export async function POST(
   _: Request,
   { params }: { params: { attemptId: string } }
) {
   try {
      const attemptId = Number(params.attemptId);

      const result: Result = await submitAttempt(attemptId);

      return NextResponse.json(result);
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: 'Failed to submit attempt' },
         { status: 500 }
      );
   }
}
