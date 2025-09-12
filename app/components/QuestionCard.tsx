'use client';

import { ChangeHandler, Mode, Question, QuestionType } from '@/types/types';
import {
   Button,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
   Input,
} from '@heroui/react';
import { memo, useCallback, useMemo } from 'react';
import { DeleteSVG, EditSVG, QuestionSVG } from '../icons/icons';
import CodeQComponent from './CodeQComponent';
import MCQComponent from './MCQComponent';
import ShortQComponent from './ShortQComponent';
interface QuestionCardProps {
   mode: Mode;
   value: Question;
   title: string;
   isBordered?: boolean;
   hasActionButtons?: boolean;
   onChange: (arg: ChangeHandler) => void;
   onEditQuestion?: (question: Question) => void;
   onRemoveQuestion?: (questionId: number) => void;
   onEnterKey?: () => void;
}

const typeMap: Record<QuestionType, string> = {
   mcq: 'Multiple Choice',
   short: 'Short Answer',
   code: 'Code',
};

const QUESTION_TYPES: {
   id: number;
   type: QuestionType;
   label: string;
}[] = [
   {
      id: 1,
      type: 'mcq',
      label: 'Multiple Choice',
   },
   {
      id: 2,
      type: 'short',
      label: 'Short Question',
   },
   {
      id: 3,
      type: 'code',
      label: 'Code',
   },
];

const QuestionCard = ({
   title,
   value,
   mode,
   isBordered,
   onChange,
   onEnterKey,
   onEditQuestion,
   onRemoveQuestion,
}: QuestionCardProps) => {
   const { type, id, prompt, correctAnswer } = value;

   const options = value.options ?? [];

   const handleChange = useCallback(
      (arg: ChangeHandler) => {
         onChange(arg);
      },
      [onChange]
   );

   const dropdownItems = useMemo(
      () =>
         QUESTION_TYPES.map((questionType) => (
            <DropdownItem
               key={questionType.id}
               onPress={() =>
                  handleChange({
                     type: 'type',
                     value: questionType.type,
                  })
               }>
               {questionType.label}
            </DropdownItem>
         )),
      [handleChange]
   );

   return (
      <div
         className={`flex flex-col gap-3 p-2 rounded-md border-1 bg-slate-500/10 backdrop-filter backdrop-blur-sm ${isBordered ? 'border-[#1b62b3]' : ' border-slate-700'}`}>
         <div className='flex items-center justify-between p-3 pt-1 border-b-1 border-b-slate-700'>
            <div className='flex items-center gap-2'>
               <QuestionSVG />
               <h3 className='font-semibold'>{title}</h3>
            </div>

            <div className='flex gap-3'>
               {mode === 'edit' && (
                  <Dropdown>
                     <DropdownTrigger>
                        <Button variant='bordered' value={type}>
                           {typeMap[type]}
                        </Button>
                     </DropdownTrigger>
                     <DropdownMenu aria-label='Dynamic Options'>
                        {dropdownItems}
                     </DropdownMenu>
                  </Dropdown>
               )}

               {mode === 'read' && (
                  <>
                     <Button variant='bordered' value={type}>
                        {typeMap[type]}
                     </Button>
                     <div className='flex items-center pl-2 border-l-1 border-l-slate-700'>
                        <Button
                           isIconOnly
                           onPress={() => onEditQuestion?.(value)}
                           aria-label='Edit question'
                           variant='light'>
                           <EditSVG />
                        </Button>

                        <Button
                           isIconOnly
                           onPress={() => onRemoveQuestion?.(id)}
                           aria-label='Delete question'
                           variant='light'>
                           <DeleteSVG />
                        </Button>
                     </div>
                  </>
               )}
            </div>
         </div>

         <div className='flex flex-col gap-2'>
            {mode === 'read' ? (
               <h3 className='py-1 font-semibold text-center select-none'>
                  {prompt}
               </h3>
            ) : (
               <Input
                  label='Question'
                  value={prompt}
                  onChange={(e) =>
                     handleChange({
                        type: 'prompt',
                        value: e.target.value,
                     })
                  }
                  onKeyUp={(e) => {
                     if (e.key === 'Enter') {
                        onEnterKey?.();
                     }
                  }}
                  isRequired
                  variant='bordered'
               />
            )}

            {type === 'mcq' && (
               <>
                  {mode === 'edit' && (
                     <MCQComponent
                        mode={mode}
                        options={options}
                        onChange={(value) =>
                           handleChange({
                              type: 'option',
                              value: value,
                           })
                        }
                        onSelectCorrectAnswer={(value) =>
                           handleChange({
                              type: 'correctAnswer',
                              value: `${value}`,
                           })
                        }
                     />
                  )}

                  {mode === 'read' && (
                     <MCQComponent
                        mode={mode}
                        value={correctAnswer}
                        options={options.map((o) => o.label)}
                        onChange={(value) =>
                           handleChange({
                              type: 'option',
                              value: value,
                           })
                        }
                        onSelectCorrectAnswer={(value) =>
                           handleChange({
                              type: 'correctAnswer',
                              value: `${value}`,
                           })
                        }
                     />
                  )}
               </>
            )}

            {type === 'short' && (
               <ShortQComponent
                  mode={mode}
                  value={correctAnswer}
                  onChange={(value) =>
                     handleChange({
                        type: 'correctAnswer',
                        value: value,
                     })
                  }
                  onEnterKey={() => {
                     onEnterKey?.();
                  }}
               />
            )}

            {type === 'code' && (
               <CodeQComponent isDisabled value={''} onChange={() => {}} />
            )}
         </div>
      </div>
   );
};

export default memo(QuestionCard);
