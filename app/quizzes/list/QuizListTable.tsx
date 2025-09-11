'use client';

import { CodeSVG, EditSVG } from '@/app/icons/icons';
import { Quiz } from '@/types';
import {
   Button,
   Chip,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow,
   Tooltip,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const columns = [
   { name: 'TITLE', uid: 'title' },
   { name: 'DESCRIPTION', uid: 'description' },
   { name: 'TIME LIMIT', uid: 'timeLimitSeconds' },
   { name: 'STATUS', uid: 'isPublished' },
   { name: 'ACTIONS', uid: 'actions' },
];

const statusColorMap = {
   published: 'success',
   unpublished: 'warning',
};

const QuizListTable = ({
   quizzes,
   onEdit,
   onSelect,
}: {
   quizzes: Quiz[];
   onSelect: (quizId: number) => void;
   onEdit: (quizId: number) => void;
}) => {
   const router = useRouter();
   const selectQuiz = useCallback(
      (quizId: number) => {
         onSelect(quizId);
      },
      [onSelect]
   );
   const editQuiz = useCallback(
      (quizId: number) => {
         onEdit(quizId);
      },
      [onEdit]
   );

   const renderCell = useCallback((quiz: Quiz, columnKey: any) => {
      const cellValue = quiz[columnKey as keyof Quiz];

      switch (columnKey) {
         case 'title':
            return <h3>{cellValue}</h3>;
         case 'timeLimitSeconds':
            const limit = Number(cellValue);
            return (
               <h3>{Boolean(limit) ? `${limit / 60} mins` : `No limit`}</h3>
            );
         case 'isPublished':
            return (
               <Chip
                  className='capitalize'
                  color={
                     statusColorMap[
                        quiz.isPublished ? 'published' : 'unpublished'
                     ] as any
                  }
                  size='sm'
                  variant='flat'>
                  {cellValue ? 'Published' : 'Unpublished'}
               </Chip>
            );
         case 'actions':
            return (
               <div className='relative flex items-center'>
                  <Tooltip content='Take quiz'>
                     <Button
                        isDisabled={!quiz.isPublished}
                        isIconOnly
                        size='sm'
                        onPress={() => {
                           if (quiz.isPublished) {
                              selectQuiz(quiz.id);
                           }
                        }}
                        aria-label='Take quiz'
                        variant='light'>
                        <CodeSVG />
                     </Button>
                  </Tooltip>

                  <Tooltip content='Edit'>
                     <Button
                        isIconOnly
                        size='sm'
                        onPress={() => editQuiz(quiz.id)}
                        aria-label='Edit'
                        variant='light'>
                        <EditSVG />
                     </Button>
                  </Tooltip>
               </div>
            );
         default:
            return cellValue;
      }
   }, []);

   return (
      <div className='flex flex-col gap-2'>
         <div className='flex items-center justify-between'>
            <h3 className='text-xl font-bold text-center'>Quiz List</h3>
            <Button
               color='primary'
               variant='bordered'
               onPress={() => router.push('/')}>
               Back
            </Button>
         </div>
         <Table aria-label='Example table with custom cells' removeWrapper>
            <TableHeader columns={columns}>
               {(column) => (
                  <TableColumn
                     key={column.uid}
                     align={column.uid === 'actions' ? 'center' : 'start'}>
                     {column.name}
                  </TableColumn>
               )}
            </TableHeader>
            <TableBody items={quizzes}>
               {(item) => (
                  <TableRow key={item.id}>
                     {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                     )}
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
   );
};

export default QuizListTable;
