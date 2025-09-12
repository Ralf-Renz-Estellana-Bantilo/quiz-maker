'use client';

import { Option } from '@/types/types';
import { addToast, ToastVariantProps } from '@heroui/react';
import React, { memo, useCallback, useMemo, useState } from 'react';
import OptionList from './OptionList';
import OptionSimpleList from './OptionSimpleList';

const DEFAULT_OPTION: Option = {
   id: 0,
   label: '',
   isSelected: false,
};
const MAX_OPTION_LENGTH = 6;

interface BaseOption<T> {
   onChange: (value: T[]) => void;
   onSelectCorrectAnswer: (index: number) => void;
}

interface FullOption extends BaseOption<Option> {
   mode: 'edit';
   options: Option[];
}

interface SimpleOption extends BaseOption<Option> {
   mode: 'read';
   value: string;
   options: string[];
}

type MCQOption = FullOption | SimpleOption;

const MCQComponent = ({
   mode,
   onChange,
   onSelectCorrectAnswer,
   ...rest
}: MCQOption) => {
   const [option, setOption] = useState<Option>(DEFAULT_OPTION);

   const options = useMemo(() => rest.options ?? [], [rest.options]);
   const optionValue = useMemo(
      () => ('value' in rest ? `${rest.value}` : ''),
      [rest]
   );

   const addNewOption = useCallback(() => {
      if (mode === 'read') return;

      const currentOptions = rest.options as Option[];
      const tempOption = option as Option;

      const toastInfo: ToastVariantProps & { title: string } = {
         title: 'Error Adding New Question',
         variant: 'bordered',
         color: 'warning',
      };

      if (currentOptions.length >= MAX_OPTION_LENGTH) {
         addToast({
            ...toastInfo,
            description: 'The maximum number of options has been reached.',
         });
         setOption(DEFAULT_OPTION);
         return;
      } else if (!Boolean(tempOption.label.trim())) {
         addToast({
            ...toastInfo,
            description: 'The option field should have value.',
         });
         setOption(DEFAULT_OPTION);
         return;
      }

      const newOption: Option = {
         ...tempOption,
         id: Math.floor(Math.random() * 1000000),
         isSelected: false,
      };

      let value = [...currentOptions, newOption];
      if (tempOption.id !== 0) {
         value = currentOptions.map((opt) =>
            opt.id === tempOption.id ? tempOption : opt
         );
      }

      onChange(value);
      setOption(DEFAULT_OPTION);
   }, [mode, rest.options, option, onChange]);

   const editOption = (option: Option) => {
      if (mode === 'read') return;

      setOption(option);
   };

   const removeOption = (optionId: number) => {
      if (mode === 'read') return;

      const options = rest.options as Option[];
      const updatedOption = options.filter((opt) => opt.id !== optionId);

      onChange(updatedOption);
      setOption(DEFAULT_OPTION);
   };

   const selectCorrectAnswer = (optionId: number, index: number) => {
      if (mode === 'read') {
         onSelectCorrectAnswer(index);
         return;
      }

      const options = rest.options as Option[];
      const updatedOption = options.map((opt) => ({
         ...opt,
         isSelected: opt.id === optionId,
      }));

      onSelectCorrectAnswer(index);
      onChange(updatedOption);
   };

   return (
      <div className='flex flex-col gap-2 p-2 rounded-md border-1 border-slate-700 bg-slate-500/05 backdrop-filter backdrop-blur-sm'>
         {mode === 'edit' && (
            <OptionList
               option={option}
               options={options as Option[]}
               setOption={setOption}
               addNewOption={addNewOption}
               onEditOption={editOption}
               onRemoveOption={removeOption}
               onSelect={selectCorrectAnswer}
            />
         )}

         {mode === 'read' && (
            <OptionSimpleList
               value={optionValue}
               options={options as string[]}
               onSelect={selectCorrectAnswer}
            />
         )}
      </div>
   );
};

export default memo(MCQComponent);
