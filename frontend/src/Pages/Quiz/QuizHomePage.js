import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useGetQuizByIdQuery, useGetQuizHistoryByUserQuery } from '../../slices/quizApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import moment from 'moment'

const QuizHomePage = () => {
  const {id:quizId} = useParams()

  const {data:quiz,isLoading,error} = useGetQuizByIdQuery(quizId)
  const {data,isLoading:loadingHistory,refetch} = useGetQuizHistoryByUserQuery(quizId)
  useEffect(()=>{
    refetch()
  },[data,refetch])

    
  return (
    <>
     <Link to='/quizzes' className="btn btn-light my-3 ml-2">
        Go Back
      </Link>
    <div className='flex justify-center'>
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
      <div className='w-2/3 bg-blue-100 p-4 rounded mt-3'>
      <h1 className='ml-2'>{quiz.title}</h1>
  
      <ul className="list-disc text-lg">
          <li>You will be asked {quiz.questions.length} questions one after another.</li>
          <li>10 points is awarded for the correct answer.</li>
          <li>Each question has four options. You can choose only one option.</li>
          <li>You can review and change answers before the quiz finish.</li>
          <li>The result will be declared at the end of the quiz.</li>
      </ul>
      <div className='ml-2'>
              <Link  to='start' ><Button>Start Quiz</Button></Link>
        </div>
      </div>
    )}
    </div>
    <div className='flex justify-center'>
    <div className='mt-5 ml-3 text-center w-2/3'>
      <h2>Previous Quiz History</h2>
      {loadingHistory && <Loader/>}
      <Table  hover responsive className='table-sm text-black mt-3'>
        <thead>
          <tr>
            <th>SL No.</th>
            <th>Quiz Name</th>
            <th>Mark Obtained</th>
            <th>Accuracy</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((q,i)=>(
            <tr key={q._id}>
              <td>{i+1}</td>
              <td>{q.title}</td>
              <td>{q.result?.mark}/{(q.result?.userAnswers?.length)*10}</td>
              <td>{(((q.result?.mark)/((q.result?.userAnswers?.length)*10))*100).toFixed(0)}%</td>
              <td>{moment(q.result?.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data?.length === 0 && (<> No Previous Results</>)}
    </div>
    </div>
    </>
  )
}

export default QuizHomePage


//  .quiz-container ol li{
//      font-size: 1.4em;
//      color: #cecece;
//  }
 
//  .start{
//      display: flex;
//      justify-content: center;
//      padding-top: 2em;
//  }
 
//  .start .btn{
//      padding: .2em 1.7em;
//      border: none;
//      border-radius: .5em;
//      font-size: 1.2em;
//      font-weight: bold;
//      color: white;
//      text-decoration: none;
//      background-color: green;
//  }
//  .start .btn:hover{
//      color: green;
//      background-color: white;
//  }
//  .options{
//      width: 400px;
//      height: 40px;
//      display: flex;
//      justify-content: center; /* Horizontally center */
//      align-items: center;
//      color:white;
//      background-color: blue;
//      margin: 5px;
//      border: 1px solid white;
//      border-radius: 5px;
//      text-align: center;
//  }
 
 