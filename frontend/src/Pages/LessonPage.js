import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useGetLessonDetailsQuery, useReadLessonMutation } from '../slices/lessonApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useSelector } from 'react-redux';
import moment from 'moment';

const LessonPage = () => {
    const { subjectId, lessonId } = useParams();
    const {userInfo} = useSelector(state=>state.auth)
    const [readLesson, { isLoading: loadingRead }] = useReadLessonMutation();
    const {data:lesson,isLoading,refetch,error} = useGetLessonDetailsQuery({subjectId, lessonId})


    const readHandler = async (subjectId,lessonId) => {
        await readLesson({subjectId,lessonId});
        refetch();
      };
    
  return (
    <>
    {loadingRead && <Loader/>}
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
        <>

<Link className='btn btn-light my-3' to={`/subjects/${subjectId}`}>Go Back</Link> 
     <h2>{lesson.title}</h2>
     <Row>
        <Col md={6}>

                <ListGroup.Item>
                    <p>{lesson.description}</p>
                </ListGroup.Item>
                
           
        </Col>
        <Col md={6}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                <Image src={lesson.image} alt={lesson.title} fluid/>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='flex justify-center items-center'>
                        <div className='w-1/3'><Button variant='info' disabled={lesson.lessonProgress.some(progress => progress.readBy === userInfo._id)}
                         onClick={()=>{readHandler(subjectId,lesson._id)}}>Mark as Read</Button>{' '}</div>
                        <div className='w-2/3'> {lesson.lessonProgress.some(progress => progress.readBy === userInfo._id) ? (
                        <>Read at: {moment(lesson.lessonProgress.find(progress => progress.readBy === userInfo._id).readAt).format("DD/MM/YYYY hh:mm A")}</>
                          ) :(<>Not Read</>) }</div>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Col>
     </Row>

        </>
    )}
     
    </>
  )
}

export default LessonPage