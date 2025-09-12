'use client';

import { Option } from '@/types/types';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Checkbox, Chip } from '@heroui/react';
import React from 'react';
import { DeleteSVG, EditSVG } from '../icons/icons';
import { numberToCharacter } from '../utils/utils';

interface OptionListProps {
   option: Option;
   options: Option[];
   addNewOption: () => void;
   onEditOption: (option: Option) => void;
   onRemoveOption: (optionId: number) => void;
   onSelect: (optionId: number, index: number) => void;
   setOption: (value: React.SetStateAction<Option>) => void;
}

const OptionList = ({
   options,
   option,
   onEditOption,
   onRemoveOption,
   onSelect,
   addNewOption,
   setOption,
}: OptionListProps) => {
   return (
      <>
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
                  onKeyUp={(e) => {
                     if (e.key === 'Enter') {
                        addNewOption();
                     }
                  }}
                  variant='bordered'
                  isRequired={options.length < 2}
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
         <div className='flex flex-col gap-1'>
            {options.map((option, idx) => (
               <div
                  className='flex items-center justify-between px-2 rounded-md cursor-pointer bg-slate-500/10 backdrop-filter backdrop-blur-sm hover:bg-slate-500/15'
                  key={option.id}
                  onClick={() => onSelect(option.id, idx)}>
                  <div className='flex items-center gap-5'>
                     <Checkbox
                        className='border-r-1 border-r-slate-600'
                        isSelected={option.isSelected}
                        onValueChange={() => onSelect(option.id, idx)}>
                        {numberToCharacter(idx)}
                     </Checkbox>
                     <span className='text-sm'>{option.label}</span>
                  </div>

                  <div className='flex items-center'>
                     <Button
                        isIconOnly
                        onPress={() => onEditOption(option)}
                        aria-label='Edit question'
                        variant='light'>
                        <EditSVG />
                     </Button>
                     <Button
                        isIconOnly
                        onPress={() => onRemoveOption(option.id)}
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
      </>
   );
};

export default OptionList;
