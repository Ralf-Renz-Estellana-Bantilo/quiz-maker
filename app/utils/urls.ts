import { config } from 'dotenv';

config({ path: __dirname + '/.env' });

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_PORT}`;

const composeUrl = (url: `/${string}`) => {
   return `${BASE_URL}${url}`;
};

export const QUIZZES_URL = composeUrl('/quizzes');
export const QUESTIONS_URL = composeUrl('/questions');
export const ATTEMPTS_URL = composeUrl('/attempts');
