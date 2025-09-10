import { Question } from '@/types';
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
