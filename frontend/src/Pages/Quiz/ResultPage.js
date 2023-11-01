import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useGetQuizResultQuery, } from '../../slices/quizApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const ResultPage = () => {
    const [view, setView] = useState(false)
    const {userInfo} = useSelector(state=>state.auth)
    const {id:quizId} = useParams()
    const {data,isLoading,error} =useGetQuizResultQuery(quizId);
    
   
  return (
    <>
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
        <div className='container text-center flex flex-column items-center justify-center '>
        <div className='w-2/3 bg-blue-100 p-4 rounded-lg my-3'>
                <h1>{data?.title}</h1><hr/>
                <h6 className='bg-white p-3 mb-1 rounded'>Name : <strong>{userInfo.name}</strong></h6>
                <div className='flex justify-between'>
                <h6 className='bg-white p-3 mb-1 rounded w-1/2 mr-1'>Total Questions : <strong>{data?.result?.userAnswers?.length} </strong></h6>
                <h6 className='bg-white p-3 mb-1 rounded w-1/2'>Total Quiz Mark : <strong>{((data?.result?.userAnswers?.length)*10)} </strong></h6>
                </div>
                
                <h6 className='bg-white p-3 mb-1 rounded'>Total Mark Scored : <strong>{data?.result?.mark} </strong></h6>
                <hr/>
                <h6>Quiz Result</h6>
                <div className='bg-success p-2 mx-4 text-white rounded-md'><strong>{data?.result?.mark === 0 ? 'Oops😓!!!' : 'Congratulations🤩!!!'}</strong><br/> You have scored <strong>{data?.result?.mark || 0} </strong> marks out of  
                <strong> {((data?.result?.userAnswers?.length)*10)} </strong><br/>
                 Accuracy : <strong>{(((data.result?.mark)/((data.result?.userAnswers?.length)*10))*100).toFixed(0)}%</strong></div>
           
        </div>
        <div className='flex justify-between w-2/3 '>
        <Link to='/quizzes'><Button>Go to Quiz Home</Button></Link>
        <Button onClick={()=>setView(!view)}>{view ? 'Hide' : 'View'} Details</Button>
        </div>
        {view && (

          <div className='w-2/3 bg-blue-100 my-3 p-3 rounded-lg'>
          {data?.result?.userAnswers?.map((q,i)=>(
            <div key={i} className='bg-white p-1 mx-2 my-2 rounded-md'>
            <h5 className='mb-1'>{i+1}.{q?.question}</h5>
            <h6 className='mb-1'>Your answer : {q?.userAnswer}</h6>
            </div>
          ))}
          <div className='bg-success mx-2 mt-3 text-white rounded-md'>
          <h6 className='py-3 mb-1'>Answers : {data?.questions?.map((a,i)=>(
            <>[{i+1}. {a.correctAnswer} ] , </>
            ))}</h6>
          </div>
          </div>

        )}
        
        </div>

    )}
        </>
  )
}

export default ResultPage