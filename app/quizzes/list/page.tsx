'use client';

import { DeleteSVG, EditSVG, EyeSVG } from '@/app/icons/icons';
import { Quiz } from '@/types';
import {
   Chip,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow,
   Tooltip,
   User,
} from '@heroui/react';
import { Key } from '@react-types/shared';
import { useCallback } from 'react';

export const columns = [
   { name: 'TITLE', uid: 'title' },
   { name: 'DESCRIPTION', uid: 'description' },
   { name: 'TIME LIMIT', uid: 'timeLimitSeconds' },
   { name: 'STATUS', uid: 'isPublished' },
   { name: 'ACTIONS', uid: 'actions' },
];

export const quizzes: Quiz[] = [
   {
      id: 1,
      title: 'General Knowledge Quiz',
      description:
         'A fun quiz to test your general knowledge across various topics.',
      timeLimitSeconds: 600, // 10 minutes
      isPublished: true,
      createdAt: new Date().toISOString(),
   },
   {
      id: 2,
      title: 'JavaScript Basics',
      description: 'Check your understanding of JavaScript fundamentals.',
      timeLimitSeconds: 900, // 15 minutes
      isPublished: false,
      createdAt: new Date().toISOString(),
   },
   {
      id: 3,
      title: 'World History Challenge',
      description: 'A quiz to test your knowledge of major historical events.',
      timeLimitSeconds: null, // no time limit
      isPublished: true,
      createdAt: new Date().toISOString(),
   },
];

const statusColorMap = {
   published: 'success',
   unpublished: 'warning',
};

export default function CreateQuizPage() {
   const renderCell = useCallback((quiz: Quiz, columnKey: any) => {
      const cellValue = quiz[columnKey as keyof Quiz];

      console.log({ quiz, cellValue, columnKey });

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
               <div className='relative flex items-center gap-2'>
                  <span className='text-lg cursor-pointer text-default-400 active:opacity-50'>
                     <EyeSVG />
                  </span>
                  <span className='text-lg cursor-pointer text-default-400 active:opacity-50'>
                     <EditSVG />
                  </span>
                  <span className='text-lg cursor-pointer text-danger active:opacity-50'>
                     <DeleteSVG />
                  </span>
               </div>
            );
         default:
            return cellValue;
      }
   }, []);

   return (
      <div className='flex flex-col w-full h-[100dvh] gap-1 py-3'>
         <h3 className='text-xl font-bold text-center'>Quiz List</h3>
         <Table aria-label='Example table with custom cells'>
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
}
