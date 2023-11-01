import React from 'react'
import { useGetAllSubjectsQuery } from "../../slices/subjectApiSlice"
import { useGetAllQuizQuery } from '../../slices/quizApiSlice';
import { useGetStudentsQuery, } from '../../slices/usersApiSlice';
import { useGetTeachersQuery, } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import { useGetAllNoticesQuery } from '../../slices/noticeApiSlice';
import Message from '../../components/Message';
import moment from 'moment';



const AdminHome = () => {
const {data:subjects,isLoading} = useGetAllSubjectsQuery()
const {data:quiz,isLoading:loadingQuiz} = useGetAllQuizQuery()
const {data:students,isLoading:loadingStudent } = useGetStudentsQuery();
const {data:teachers , isLoading:loadingTeacher} = useGetTeachersQuery();
const {data:notices,isLoading:loadingNotice,error} = useGetAllNoticesQuery()

  return (
    <>
    <div className="flex justify-around text-center mt-3">
     
        <div className="w-1/4 pt-3 border-2 m-3 border-gray-200 rounded-lg shadow-xl flex flex-column items-center">
          <img src='/images/img1.png' alt="Students" width='80' height='80'/>
          <h3 className='my-2'>Total Students</h3>
          <h4>{students?.length} {loadingStudent && <Loader/>}</h4>
        </div>
        <div className="w-1/4 pt-3 border-2 m-3 border-gray-200 rounded-lg shadow-xl flex flex-column items-center">
          <img src='/svg/subjects.svg' alt="subject"  width='80' height='80'/>
          <h3 className='my-2'>Total Subjects</h3>
          <h4>{subjects?.length} {isLoading && <Loader/>}</h4>
        </div>
        <div className="w-1/4 pt-3 border-2 m-3 border-gray-200 rounded-lg shadow-xl flex flex-column items-center">
          <img src='/images/img3.png' alt="teacher"  width='80' height='80'/>
          <h3 className='my-2'>Total Teachers</h3>
          <h4>{teachers?.length}  {loadingTeacher && <Loader/>}</h4>
        </div>
        <div className="w-1/4 pt-3 border-2 m-3  border-gray-200 rounded-lg shadow-xl flex flex-column items-center">
          <img src='/svg/assignment.svg' alt="quiz"  width='80' height='80'/>
          <h3 className='my-2'>Total Quizzes</h3>
          <h4>{quiz?.length} {loadingQuiz && <Loader/>}</h4>
        </div>
      
    </div>
    {loadingNotice ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
      <>
    <div className='flex justify-between items-center mt-4 mx-3'>
    <h1 >Notices</h1>
    </div>
    {notices?.length > 0 ? (
      <>
      {notices.map((notice)=>(
       <div className='bg-blue-100 rounded border border-gray-300 m-3'>
       <div className='flex p-2 justify-around items-center bg-red-100 text-black-900 font-medium text-center border border-gray-300'>
           <h3 className='mb-0'>{notice.title}</h3>
           <h4 className='mb-0'>{moment(notice.createdAt).format("DD/MM/YYYY hh:mm A")}</h4>
       </div>
       <div className='p-3'>{notice.description}</div>
       </div>

    ))}
   
      </>

    ) : (<p className='m-3'>No notices</p>)}



  </>
 
  )
}</>)
}

export default AdminHome