import { NextRequest, NextResponse } from 'next/server';
import { Question } from '@/types/types';
import { deleteQuestion, updateQuestion } from '@/app/lib/db/questions';

export async function PATCH(
   req: NextRequest,
   { params }: { params: { questionId: string } }
) {
   try {
      const questionId = Number(params.questionId);
      const payload: Partial<Question> = await req.json();

      const question = await updateQuestion(questionId, payload);

      return NextResponse.json(question);
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: 'Failed to update question' },
         { status: 500 }
      );
   }
}

export async function DELETE(
   _: Request,
   { params }: { params: { questionId: string } }
) {
   try {
      const questionId = Number(params.questionId);

      const question = await deleteQuestion(questionId);

      return NextResponse.json(question);
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: 'Failed to delete question' },
         { status: 500 }
      );
   }
}
