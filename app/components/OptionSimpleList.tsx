'use client';

import { Checkbox } from '@heroui/react';
import React from 'react';
import { numberToCharacter } from '../utils/utils';

interface OptionListProps {
   options: string[];
   value: string;
   onSelect: (optionId: number, index: number) => void;
}

const OptionSimpleList = ({ options, value, onSelect }: OptionListProps) => {
   return (
      <div className='flex flex-col gap-1'>
         {options.map((option, idx) => (
            <div
               className='flex items-center justify-between px-2 rounded-md cursor-pointer bg-slate-500/10 backdrop-filter backdrop-blur-sm hover:bg-slate-500/15'
               key={option}
               onClick={() => onSelect(idx, idx)}>
               <div className='flex items-center gap-5'>
                  <Checkbox
                     className='border-r-1 border-r-slate-600'
                     isSelected={value === `${idx}`}
                     onValueChange={() => onSelect(idx, idx)}>
                     {numberToCharacter(idx)}
                  </Checkbox>
                  <span className='p-2 text-sm'>{option}</span>
               </div>
            </div>
         ))}
      </div>
   );
};

export default OptionSimpleList;
