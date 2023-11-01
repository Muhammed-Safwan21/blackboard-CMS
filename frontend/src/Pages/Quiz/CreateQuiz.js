import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateQuizMutation, useUpdateQuizMutation } from '../../slices/quizApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const CreateQuiz = ({ quiz }) => {
  const [quizTitle, setQuizTitle] = useState(quiz ? quiz.title : '');
  const [questions, setQuestions] = useState(
    quiz
      ? quiz.questions.map((question) => ({
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
        }))
      : [                                           // empty - []
          {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: null,
          },
        ]
  );

  const navigate = useNavigate()
  const [createQuiz,{isLoading,refetch,error}] = useCreateQuizMutation()
  const [updateQuiz,{isLoading:loadingUpdate}] = useUpdateQuizMutation()

  const handleQuestionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, optionValue) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = optionValue;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: null }]);
  };

  const removeLastQuestion = () => {
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.pop();
      setQuestions(updatedQuestions);
    }
  };

  const validateCheckbox = () => {
    // Validate that at least one checkbox is checked for each question
    for (const question of questions) {
      if ((question?.correctAnswer === undefined)) {
        toast.error('Please select a correct answer for each question.');
        return false;
      }
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      if(quiz){
        if (validateCheckbox()) {
          const updatedQuiz = { quizId: quiz._id, quizTitle, questions };
          const result = await updateQuiz(updatedQuiz);
          if (result.error) {
            toast.error(result.error);
          } else {
            navigate('/quizzes');
            toast.success("Quiz Updated");
            refetch();
          }
        }
      }else{
        if(validateCheckbox()){
          navigate('/quizzes')
          toast.success("Quiz Created");
          await createQuiz({ quizTitle, questions });
          refetch()
         }
      }

    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  return (
    <>
      {loadingUpdate && <Loader/>}
      {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error.data?.message}</Message>) : (
        <>
         <h1>{quiz ? 'Edit Quiz' : 'Create quiz'}</h1>
      <div className='flex justify-center mb-4'>
        <Form onSubmit={submitHandler} className="text-black w-2/3 p-3 bg-blue-100 rounded-lg">
          <Form.Group controlId="title" className="my-2">
            <Form.Label>Quiz Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter quiz title"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className='bg-red-100 p-2 rounded-lg mb-2'>
              <Form.Group controlId={`question${questionIndex + 1}`} className='my-2'>
                <Form.Label>Question {questionIndex + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Question"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                  required />
              </Form.Group>
              
              <div className='flex flex-wrap'>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className='my-1 w-1/2 block p-2'>
                    <Form.Check
                      type="checkbox"
                      name={`correctAnswer${questionIndex}`}
                      id={`option${optionIndex + 1}`}
                      label={`Option ${optionIndex + 1}`}
                      checked={question.correctAnswer === option}
                      onChange={() => handleCorrectAnswerChange(questionIndex, option)}
                    />
                    <Form.Control
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      required
                    />
                  </div>
                ))}
              </div>
             
            </div>
          ))}
          <div className='flex justify-between mt-3'>
            <Button onClick={addQuestion}>Add Question</Button>
            <Button onClick={removeLastQuestion} disabled={questions.length<2}>Remove Last Question</Button>
            {quiz ? (<Button type='submit' className='px-4'>Update</Button>) : (<Button type='submit' className='px-4'>Create</Button>)}
          </div>
        </Form>
      </div>
        </>
      ) }
      </>
  );
};

export default CreateQuiz;
