import { saveAttemptAnswer } from '@/app/lib/db/attempts';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
   req: NextRequest,
   { params }: { params: { attemptId: string } }
) {
   try {
      const attemptId = Number(params.attemptId);
      const payload: {
         questionId: number;
         value: string;
      } = await req.json();

      if (!payload.questionId || !payload.value) {
         return NextResponse.json(
            { error: 'Invalid payload' },
            { status: 400 }
         );
      }

      await saveAttemptAnswer(attemptId, payload);

      return NextResponse.json({ success: true });
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: 'Failed to save answer' },
         { status: 500 }
      );
   }
}
