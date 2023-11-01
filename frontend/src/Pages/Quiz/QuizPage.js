import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useGetQuizByIdQuery, useUpdateQuizResultMutation, } from '../../slices/quizApiSlice';
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {toast } from 'react-toastify'

const QuizPage = () => {
  const navigate = useNavigate()
  const {id:quizId} = useParams()
  const {data:quiz,isLoading,error} = useGetQuizByIdQuery(quizId)
  const [userAnswers, setUserAnswers] = useState(Array(quiz?.questions.length).fill({ question: '', userAnswer: '' }));


  const [updateQuizResult,{isLoading:loadingUpdate}] = useUpdateQuizResultMutation()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < quiz?.questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleAnswerSelect = (selectedAnswer) => {
    if (currentQuestionIndex < quiz?.questions.length) {
      const updatedUserAnswers = [...userAnswers];
      updatedUserAnswers[currentQuestionIndex] = {
        question: currentQuestion.question,
        userAnswer: selectedAnswer,
      };
      setUserAnswers(updatedUserAnswers);
    }
  };
  

  const handleFinish = async () => {

        const result = await updateQuizResult({quizId,userAnswers});
        if(result.error){
            toast.error(result.error)
        }else{
            toast.success("Quiz Finished");
            navigate(`/quizzes/${quizId}/result`)
        }
  };
 
  const currentQuestion = quiz?.questions[currentQuestionIndex];


  return (
    <>
     <Link to={`/quizzes/${quizId}`} className="btn btn-light mb-3 ml-2">
        Go Back
      </Link>
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
      <div className='flex justify-center'>
      <div className='w-2/3 bg-blue-100 p-4 rounded'>
      <h2 className=''>{quiz.title}</h2>
      {loadingUpdate && <Loader/>}
      {currentQuestion && (
        <>
          <h4 className='bg-blue-200 p-3 rounded-lg'>{currentQuestionIndex + 1}. {currentQuestion.question}</h4>
          <div className='flex flex-wrap justify-between'>
            {currentQuestion.options.map((option, optionIndex) => (
              <div key={optionIndex} onClick={() => handleAnswerSelect(option)} 
              className=' p-2 w-1/2  block'>
                <label
                className={`p-3 rounded-lg block font-medium cursor-pointer hover:bg-blue-300 ${
                  userAnswers[currentQuestionIndex]?.userAnswer === option
                    ? 'bg-blue-400 border text-black'
                    : 'bg-blue-200' 
                } rounded-lg`}
                >

                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  
                  value={option}
                  checked={userAnswers[currentQuestionIndex]?.userAnswer === option}
                  onChange={(e)=>e.target.value}
                  className='appearance-none'
                />
                {option}
                </label>
              </div>
            ))}
          </div>
        </>
      )}
      <div className='flex justify-between m-2'>
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>{" "}
        {!(currentQuestionIndex === quiz.questions.length - 1 ) ? (
           <Button className='px-4' onClick={handleNext} >
           Next
         </Button>
        ) : (<Button className='btn-success px-3' onClick={handleFinish}>Finish</Button>)}
       
        
      </div>
    </div>
    </div>
    )}
    
    </>
  );
};

export default QuizPage;
