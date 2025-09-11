import { Option, Question } from '@/types';
import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { addToast, Checkbox, Chip } from '@heroui/react';
import { useState } from 'react';
import { TOAST_PROPERTIES } from '../context/context';
import { DeleteSVG, EditSVG } from '../icons/icons';
import { numberToCharacter } from '../utils/utils';
import QuestionCard from './QuestionCard';

const Questionnaire = ({ questions }: { questions: Question[] }) => {
   return (
      <div className='flex flex-col gap-3'>
         {questions.map((question, index) => (
            <QuestionCard
               key={index}
               title={`Question ${index + 1}`}
               value={question}
               onChange={() => {}}
               mode='read'
            />
         ))}
      </div>
   );
};

export default Questionnaire;

const DEFAULT_OPTION: Option = {
   id: 0,
   label: '',
   isSelected: false,
};
const MAX_OPTION_LENGTH = 6;

export const MCQComponent = ({
   options: opts,
   onChange,
   onSelectCorrectAnswer,
}: {
   options?: Option[];
   onChange: (value: Option[]) => void;
   onSelectCorrectAnswer: (index: number) => void;
}) => {
   const [option, setOption] = useState<Option>(DEFAULT_OPTION);

   const options = opts ?? [];

   const addNewOption = () => {
      if (options.length >= MAX_OPTION_LENGTH) {
         addToast({
            ...TOAST_PROPERTIES,
            description: 'The maximun number of options has been reached.',
         });
         setOption(DEFAULT_OPTION);
         return;
      } else if (!Boolean(option.label.trim())) {
         addToast({
            ...TOAST_PROPERTIES,
            description: 'The option field should have value.',
         });
         setOption(DEFAULT_OPTION);
         return;
      }

      const newOption: Option = {
         ...option,
         id: Math.floor(Math.random() * 1000000),
         isSelected: false,
      };

      let value = [...options, newOption];
      if (option.id !== 0) {
         const updatedOption = options.map((opt) =>
            opt.id === option.id ? option : opt
         );

         value = updatedOption;
      }

      onChange(value);
      setOption(DEFAULT_OPTION);
   };

   const editOption = (option: Option) => {
      setOption(option);
   };

   const removeOption = (optionId: number) => {
      const updatedOption = options.filter((opt) => opt.id !== optionId);

      onChange(updatedOption);
      setOption(DEFAULT_OPTION);
   };

   const selectCorrectAnswer = (optionId: number, index: number) => {
      const updatedOption = options.map((opt) => ({
         ...opt,
         isSelected: opt.id === optionId,
      }));

      onSelectCorrectAnswer(index);

      onChange(updatedOption);
   };

   return (
      <div className='flex flex-col gap-2 p-2 rounded-md border-1 border-slate-700 bg-slate-500/05 backdrop-filter backdrop-blur-sm'>
         <div className='flex gap-2'>
            <div className='flex-grow'>
               <Input
                  label='Option'
                  value={option.label}
                  onChange={(e) =>
                     setOption((prev) => ({
                        ...prev,
                        label: e.target.value,
                     }))
                  }
                  variant='bordered'
                  isRequired
               />
            </div>

            <div className='flex'>
               <Button
                  className='h-full'
                  color='primary'
                  onPress={addNewOption}>
                  {option.id !== 0 ? 'Update' : 'Add'}
               </Button>
            </div>
         </div>

         <div className='flex flex-col gap-1 p-2'>
            {options.map((option, idx) => (
               <div
                  className='flex items-center justify-between px-2 rounded-md bg-slate-500/10 backdrop-filter backdrop-blur-sm'
                  key={option.id}>
                  <div className='flex items-center gap-5'>
                     <Checkbox
                        className='border-r-1 border-r-slate-600'
                        isSelected={option.isSelected}
                        onValueChange={() =>
                           selectCorrectAnswer(option.id, idx)
                        }>
                        {numberToCharacter(idx)}
                     </Checkbox>
                     <span className='text-sm'>{option.label}</span>
                  </div>

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

            {options.length === 0 && (
               <div className='flex justify-center'>
                  <Chip variant='light' color='warning'>
                     No options yet!
                  </Chip>
               </div>
            )}
         </div>
      </div>
   );
};

export const ShortQComponent = ({
   value,
   onChange,
}: {
   value: string;
   onChange: (value: string) => void;
}) => {
   return (
      <div className='flex flex-col gap-2 p-2 rounded-md border-1 border-slate-700 bg-slate-500/05 backdrop-filter backdrop-blur-sm'>
         <Input
            label='Correct answer'
            value={value}
            onChange={(e) => {
               onChange(e.target.value);
            }}
            variant='bordered'
            isRequired
         />
      </div>
   );
};

export const CodeQComponent = ({
   value,
   onChange,
}: {
   value: string;
   onChange: (value: string) => void;
}) => {
   return (
      <div className='flex'>
         <Textarea
            label='Code snippet'
            placeholder='Enter your code here...'
            variant='bordered'
            value={value}
            onChange={(e) => {
               onChange(e.target.value);
            }}
         />
      </div>
   );
};
