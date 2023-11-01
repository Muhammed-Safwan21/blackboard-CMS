import React from 'react';
import { useParams } from 'react-router-dom';
import CreateQuiz from './CreateQuiz';
import { useGetQuizByIdQuery } from '../../slices/quizApiSlice';

const EditQuiz = () => {

 const {id} = useParams()

  const { data: quiz, isLoading, error } = useGetQuizByIdQuery(id);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <CreateQuiz quiz={quiz}  />
      )}
    </div>
  );
};

export default EditQuiz;
