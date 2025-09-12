'use client';

import { Mode } from '@/types/types';
import { Input } from '@heroui/input';
import React, { memo, useCallback } from 'react';

const ShortQComponent = ({
   value,
   mode,
   onChange,
   onEnterKey,
}: {
   value: string;
   mode: Mode;
   onChange: (value: string) => void;
   onEnterKey?: () => void;
}) => {
   const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         onChange(e.target.value);
      },
      [onChange]
   );

   const handleKeyUp = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (e.key === 'Enter') {
            onEnterKey?.();
         }
      },
      [onEnterKey]
   );

   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (mode === 'read') return e.preventDefault();
   };

   return (
      <div className='flex p-2 rounded-md border-1 border-slate-700 bg-slate-500/05 backdrop-filter backdrop-blur-sm'>
         <Input
            label='Correct answer'
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
            variant='bordered'
            isRequired
         />
      </div>
   );
};

export default memo(ShortQComponent);
