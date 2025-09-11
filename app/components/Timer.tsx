'use client';

import { Chip } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { ClockSVG } from '../icons/icons';
import { setCookie } from '../utils/utils';

interface TimerProps {
   timeLimitSeconds: number;
   onFinish?: () => void;
}

const Timer: React.FC<TimerProps> = ({ timeLimitSeconds, onFinish }) => {
   const [timeLeft, setTimeLeft] = useState(timeLimitSeconds);

   useEffect(() => {
      if (timeLeft <= 0) {
         if (onFinish) onFinish();
         return;
      }

      const interval = setInterval(() => {
         setTimeLeft((prev) => {
            const value = Math.max(prev - 1, 0);
            setCookie('timeLeft', `${value}`);

            return value;
         });
      }, 1000);

      return () => {
         clearInterval(interval);
      };
   }, [timeLeft, onFinish]);

   let displayValue: string;

   if (timeLeft > 60) {
      const minutes = Math.ceil(timeLeft / 60);
      displayValue = `${minutes} min`;
   } else {
      displayValue = `${timeLeft} sec`;
   }

   return (
      <Chip
         className='pl-2'
         color={timeLeft <= 60 ? 'danger' : 'default'}
         startContent={<ClockSVG />}
         variant='faded'>
         {displayValue}
      </Chip>
   );
};

export default Timer;
