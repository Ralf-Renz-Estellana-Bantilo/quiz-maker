'use client';

import { Textarea } from '@heroui/input';
import { ChangeEvent, memo, useCallback } from 'react';

const CodeQComponent = ({
   value,
   isDisabled,
   onChange,
}: {
   value: string;
   isDisabled?: boolean;
   onChange: (value: string) => void;
}) => {
   const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         onChange(e.target.value);
      },
      [onChange]
   );

   return (
      <div className='flex p-2 rounded-md border-1 border-slate-700 bg-slate-500/05 backdrop-filter backdrop-blur-sm'>
         <Textarea
            label='Code snippet'
            placeholder='Enter your code here...'
            variant='bordered'
            value={value}
            isDisabled={isDisabled}
            onChange={handleChange}
         />
      </div>
   );
};

export default memo(CodeQComponent);
