
import { Row ,Col, Table,} from 'react-bootstrap';
import Loader from "../../components/Loader";
import {BiUserCircle} from 'react-icons/bi'
import { useGetSubjectByCreatorQuery } from "../../slices/subjectApiSlice";
import Message from "../../components/Message";
import { useGetUserDetailsQuery } from '../../slices/usersApiSlice';
import { Link, useParams } from 'react-router-dom';
import { useGetAllLessonsQuery } from '../../slices/lessonApiSlice';
import { useGetQuizByCreatorQuery, useGetQuizProgressQuery } from '../../slices/quizApiSlice';
import moment from 'moment';


const UserDetailsPage = () => {
    const {id} = useParams()

    const {data:subjectsByCreator,isLoading:loadingCreatorSubjects,creatorSubjectError} = useGetSubjectByCreatorQuery(id)
    const {data:user,isLoading:loadingUser,error:userError} = useGetUserDetailsQuery(id)
    const {data:subjects,isLoading,error} = useGetAllLessonsQuery()
    const {data:quiz,isLoading:loadingQuiz} = useGetQuizByCreatorQuery(id)
    const {data,isLoading:loadingQuizProgress} = useGetQuizProgressQuery(id)


  return (
  <>
   <Link to={user?.role === 'teacher' ?  '/teachers' : user?.role === 'student' ? '/students' : '/admins'
        } className="btn btn-light my-3">
        Go Back
    </Link>
    <Row>
       
        {loadingUser ?  (<Loader/>) : userError ? (<Message variant='danger'>{error}</Message>) :(
             <Col md={6} >
             <h2>Profile Details</h2>
                  <div className="w-4/5 bg-blue-100 p-4 flex flex-column items-center border border-gray-300 rounded">
                  <div className="mb-4"><BiUserCircle size={64}/></div>
                  <div>
                    <h4>Name : {user?.name}</h4>
                    <h4>Email : {user?.email}</h4>
                    <h4>Role : {user?.role}</h4>
                  </div>
                   
                 </div>
              </Col>
        ) }     
    </Row>
    { user?.role === 'student' ? (
        <Row className="mt-3">
        <h2>Activities</h2>
        {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
          <>
           <Col>
  
  <h4 className="mt-3">Subject Related-Read Lessons</h4>
  {subjects.length === 0 && (<p className='ml-3'>No Subjects/Lessons</p>)}
  {subjects?.map((sub)=>(
    <div  className="bg-blue-100 w-3/4 rounded border border-gray-300 mb-3 ">
    <h4 className="bg-red-100 p-2 text-black-900 font-medium text-center border border-gray-300">{sub.name}</h4>
    { // Filter lessons read by the current user
    sub.lessons.filter(lesson => lesson.lessonProgress.some(progress => progress.readBy === user?._id)).length === 0 ?
    (<p className='ml-2'>No Lessons</p>) :( 
        sub.lessons.filter(lesson => lesson.lessonProgress.some(progress => progress.readBy === user?._id))
          .map((lesson, j) => (
            <h6 key={j} className="p-2 bg-white m-1 font-medium border-y border-gray-300 rounded">
              {j + 1} - {lesson.title}
            </h6>
          ))
      )}
    </div>
   ))}
  
  </Col>
  <Col>
<h4 className="mt-3">Quiz Related</h4>
      {loadingQuizProgress && <Loader/>}
    <div  className="bg-blue-100 rounded border border-gray-300 mb-3 ">
    <h4 className="bg-red-100 p-2 text-black-900 font-medium text-center border border-gray-300">Attended Quizzes</h4>
    <Table  hover responsive className='table-sm text-black text-center'>
        <thead>
          <tr>
            <th>SL No.</th>
            <th>Name</th>
            <th>Mark</th>
            <th>Accuracy</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
           {data.length === 0 && (<p className='ml-3'>No results</p>)}
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
    </div>
</Col>
          </>
        ) }
          
            
      </Row>
    ) : 
    (
        <Row className="mt-5">
      <h2 className='mb-1'>Activities</h2>
      {loadingCreatorSubjects ? (<Loader/>) : creatorSubjectError ? (<Message variant='danger'>{error?.data?.message}</Message>) : (
        <>
         <Col>

<h4 className="mt-3">Subject Related - Lessons</h4>
{subjectsByCreator.length === 0 && (<p className='ml-3'>No Subjects/Lessons</p>)}
{subjectsByCreator?.map((sub)=>(
  <div  className="bg-blue-100 w-3/4 rounded border border-gray-300 mb-3 ">
  <h4 className="bg-red-100 p-2 text-black-900 font-medium text-center border border-gray-300">{sub.name}</h4>
    {sub?.lessons?.map((lesson,i)=>(
      <>
      <h6 className=" p-2 bg-white m-1 font-medium border-y border-gray-300 rounded">{i+1} - {lesson.title}</h6>
      </>
    ))}
  
  </div>
))}

</Col>
<Col>
<h4 className="mt-3">Quiz Related</h4>
    {loadingQuiz && <Loader/>}
  <div  className="bg-blue-100 w-3/4 rounded border border-gray-300 mb-3 ">
  <h4 className="bg-red-100 p-2 text-black-900 font-medium text-center border border-gray-300">Created Quizzes</h4>
  {quiz?.length === 0 ? (<p className='ml-3'>No quiz</p>) : (quiz?.map((q,i)=>(
      <h6 className=" p-2 bg-white m-1 font-medium border-y border-gray-300 rounded">{i+1} - {q.title}</h6>
    )))}
  </div>

</Col>
        </>
      ) }  
    </Row>
    )  }
    
    </>
  )
}

export default UserDetailsPage