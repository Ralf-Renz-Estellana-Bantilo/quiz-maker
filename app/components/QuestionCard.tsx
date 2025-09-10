'use client';

import { ChangeHandler, Option, Question, QuestionType } from '@/types';
import {
   addToast,
   Button,
   Checkbox,
   Chip,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
   Input,
   Textarea,
} from '@heroui/react';
import { useState } from 'react';
import { DeleteSVG, EditSVG, QuestionSVG } from '../icons/icons';
import { numberToCharacter } from '../utils/utils';
import { TOAST_PROPERTIES } from '../context/context';

type ViewMode = 'read' | 'edit' | 'create' | 'list';
interface QuestionCardProps {
   value: Question;
   onChange: (arg: ChangeHandler) => void;
   title: string;
   mode: ViewMode;
   hasActionButtons?: boolean;
   onEditQuestion?: (question: Question) => void;
   onRemoveQuestion?: (questionId: number) => void;
}

const MAX_OPTION_LENGTH = 6;
const DEFAULT_OPTION: Option = {
   id: 0,
   label: '',
   isSelected: false,
};
const typeMap: Record<QuestionType, string> = {
   mcq: 'Multiple Choice',
   short: 'Short Answer',
   code: 'Code',
};

const QuestionCard = ({
   title,
   value,
   mode,
   hasActionButtons = false,
   onChange,
   onEditQuestion,
   onRemoveQuestion,
}: QuestionCardProps) => {
   const { type, id, options, prompt } = value;

   const [optionValue, setOptionValue] = useState<Option>(DEFAULT_OPTION);

   const handleChange = (arg: ChangeHandler) => {
      onChange(arg);
   };

   const addNewOption = () => {
      if (type === 'mcq' && options.length >= MAX_OPTION_LENGTH) {
         addToast({
            ...TOAST_PROPERTIES,
            description: 'The maximun number of options has been reached.',
         });
         setOptionValue(DEFAULT_OPTION);
         return;
      } else if (!Boolean(optionValue.label.trim())) {
         addToast({
            ...TOAST_PROPERTIES,
            description: 'The option field should have value.',
         });
         setOptionValue(DEFAULT_OPTION);
         return;
      }

      const newOption = {
         ...optionValue,
         id: Math.floor(Math.random() * 1000000),
         isCorrect: false,
      };

      let value = [...options, newOption];
      if (optionValue.id !== 0) {
         const updatedOption = options.map((opt) =>
            opt.id === optionValue.id ? optionValue : opt
         );

         value = updatedOption;
      }

      onChange({
         type: 'option',
         value,
      });
      setOptionValue(DEFAULT_OPTION);
   };

   const editOption = (option: Option) => {
      setOptionValue(option);
   };

   const removeOption = (optionId: number) => {
      const updatedOption = options.filter((opt) => opt.id !== optionId);

      onChange({
         type: 'option',
         value: updatedOption,
      });
      setOptionValue(DEFAULT_OPTION);
   };

   const selectCorrectAnswer = (optionId: number) => {
      const updatedOption = options.map((opt) => ({
         ...opt,
         isSelected: opt.id === optionId,
      }));

      onChange({
         type: 'option',
         value: updatedOption,
      });
   };

   const optionLabel = type === 'mcq' ? 'Option' : 'Correct answer';

   if (['read', 'list'].includes(mode)) {
      return (
         <QuestionCardReadOnly
            title={title}
            value={value}
            mode={mode}
            hasActionButtons={hasActionButtons}
            onEditQuestion={onEditQuestion}
            onRemoveQuestion={onRemoveQuestion}
         />
      );
   }

   return (
      <div className='flex flex-col gap-3 p-2 rounded-md border-1 border-slate-700 bg-slate-500/10 backdrop-filter backdrop-blur-sm'>
         <div className='flex items-center justify-between p-3 pt-1 border-b-1 border-b-slate-700'>
            <div className='flex items-center gap-2'>
               <QuestionSVG />
               <h3 className='font-semibold'>{title}</h3>
            </div>

            <div className='flex gap-3'>
               <Dropdown>
                  <DropdownTrigger>
                     <Button variant='bordered' value={type}>
                        {typeMap[type]}
                     </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label='Static Options'>
                     <DropdownItem
                        key='mcq'
                        onPress={(e) =>
                           handleChange({
                              type: 'type',
                              value: 'mcq',
                           })
                        }>
                        Multiple Choice
                     </DropdownItem>
                     <DropdownItem
                        key='short'
                        onPress={(e) =>
                           handleChange({
                              type: 'type',
                              value: 'short',
                           })
                        }>
                        Short Answer
                     </DropdownItem>
                  </DropdownMenu>
               </Dropdown>
               {mode != 'create' && (
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
               )}
            </div>
         </div>

         <div className='flex flex-col gap-2'>
            <Input
               label='Question'
               value={prompt}
               onChange={(e) =>
                  handleChange({
                     type: 'prompt',
                     value: e.target.value,
                  })
               }
               isRequired
               variant='bordered'
            />
            <div className='flex flex-col gap-2 p-2 rounded-md border-1 border-slate-700 bg-slate-500/05 backdrop-filter backdrop-blur-sm'>
               <div className='flex gap-2'>
                  <div className='flex-grow'>
                     <Input
                        value={optionValue.label}
                        label={optionLabel}
                        onChange={(e) =>
                           setOptionValue((prev) => ({
                              ...prev,
                              label: e.target.value,
                           }))
                        }
                        variant='bordered'
                        isRequired
                     />
                  </div>

                  {type === 'mcq' && (
                     <div className='flex'>
                        <Button
                           className='h-full'
                           color='primary'
                           onPress={addNewOption}>
                           {optionValue.id !== 0 ? 'Update' : 'Add'}
                        </Button>
                     </div>
                  )}
               </div>

               <div className='flex flex-col gap-1 p-2'>
                  {options.map((option, idx) => (
                     <div
                        className='flex items-center justify-between px-2 rounded-md bg-slate-500/10 backdrop-filter backdrop-blur-sm'
                        key={option.id}>
                        {type === 'mcq' ? (
                           <div className='flex items-center gap-5'>
                              <Checkbox
                                 className='border-r-1 border-r-slate-600'
                                 isSelected={option.isSelected}
                                 onValueChange={() =>
                                    selectCorrectAnswer(option.id)
                                 }>
                                 {numberToCharacter(idx)}
                              </Checkbox>
                              <span className='text-sm'>{option.label}</span>
                           </div>
                        ) : (
                           <span className='text-sm'>{option.label}</span>
                        )}

                        <div className='flex items-center'>
                           <Button
                              isIconOnly
                              onPress={() => editOption(option)}
                              aria-label='Edit question'
                              variant='light'>
                              <EditSVG />
                           </Button>
                           <Button
                              isIconOnly
                              onPress={() => removeOption(option.id)}
                              aria-label='Delete question'
                              variant='light'>
                              <DeleteSVG />
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

const QuestionCardReadOnly = ({
   title,
   value,
   mode,
   hasActionButtons,
   onEditQuestion,
   onRemoveQuestion,
}: {
   value: Question;
   title: string;
   mode: ViewMode;
   hasActionButtons?: boolean;
   onEditQuestion?: (question: Question) => void;
   onRemoveQuestion?: (questionId: number) => void;
}) => {
   const { type, id, options, prompt, correctAnswer } = value;
   const isReadOnly = mode === 'read';

   return (
      <div className='flex flex-col gap-3 p-2 rounded-md border-1 border-slate-700 bg-slate-500/10 backdrop-filter backdrop-blur-sm'>
         <div className='flex items-center justify-between p-3 pt-1 border-b-1 border-b-slate-700'>
            <div className='flex items-center gap-2'>
               <QuestionSVG />
               <h3 className='font-semibold'>{title}</h3>
            </div>

            {hasActionButtons && mode === 'list' && (
               <div className='flex items-center gap-3'>
                  <Chip>{typeMap[type]}</Chip>
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
               </div>
            )}
         </div>

         <div className='flex flex-col gap-2'>
            <h3 className='py-1 font-semibold text-center'>{prompt}</h3>

            <div className='flex flex-col gap-2 p-2 rounded-md border-1 border-slate-700 bg-slate-500/05 backdrop-filter backdrop-blur-sm'>
               {type === 'mcq' && (
                  <div className='flex flex-col gap-1 p-2'>
                     {options.map((option, idx) => (
                        <div
                           className='flex items-center justify-between px-2 rounded-md bg-slate-500/10 backdrop-filter backdrop-blur-sm'
                           key={option.id}>
                           {type === 'mcq' ? (
                              <div className='flex items-center gap-5'>
                                 <Checkbox
                                    className='border-r-1 border-r-slate-600'
                                    isSelected={option.isSelected}>
                                    {numberToCharacter(idx)}
                                 </Checkbox>
                                 <span className='p-2 text-sm'>
                                    {option.label}
                                 </span>
                              </div>
                           ) : (
                              <span className='p-2 text-sm'>
                                 {option.label}
                              </span>
                           )}
                        </div>
                     ))}
                  </div>
               )}

               {type === 'short' && (
                  <span className='flex gap-3'>
                     <p>Answer:</p>{' '}
                     <strong className='text-primary'>
                        {correctAnswer}
                     </strong>{' '}
                  </span>
               )}

               {type === 'code' && (
                  <Textarea
                     label='Code Snippet'
                     variant='bordered'
                     maxRows={70}
                     placeholder='Enter your code here...'
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default QuestionCard;
