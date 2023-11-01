import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Col, Row } from 'react-bootstrap'
import TeacherHome from './TeacherHome'
import { Navigate, Route, Routes } from 'react-router-dom'
import TeacherProfile from './TeacherProfile'
import AllSubjectsPage from '../AllSubjectsPage'
import QuizListPage from '../Quiz/QuizListPage'
import SubjectPage from '../SubjectPage'
import LessonPage from '../LessonPage'
import AboutPage from '../AboutPage'
import ContactPage from '../ContactPage'
import FaqPage from '../FaqPage'
import StudentsListPage from '../Admin/Student/StudentsListPage'
import UserEditPage from '../Admin/UserEditPage'
import UserDetailsPage from '../Admin/UserDetailsPage'
import QuizHomePage from '../Quiz/QuizHomePage'
import QuizPage from '../Quiz/QuizPage'
import ResultPage from '../Quiz/ResultPage'
import NoticePage from '../NoticePage'
import CreateQuiz from '../Quiz/CreateQuiz'
import EditQuiz from '../Quiz/EditQuiz'

const TeacherDashboard = () => {
  

  return (
    < >
        <Row className='m-0'>
            <Col md={2} className='p-0 bg-gray-200 h-[89vh] overflow-y-auto scrollbar'>
             <Sidebar />
            </Col>
            <Col md={10} className='p-4 h-[89vh] overflow-y-auto scrollbar'>
            <Routes>
                        <Route path="/" element={<TeacherHome/>} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/dashboard" element={<TeacherHome />} />
                        <Route path="/profile" element={<TeacherProfile />} />

                        <Route path="/subjects" element={<AllSubjectsPage />} />
                        <Route path='/subjects/:subjectId' element={<SubjectPage/>} />
                        <Route path='/subjects/:subjectId/lesson/:lessonId' element={<LessonPage/>} />

                        <Route path="/students" element={<StudentsListPage />} />
                        <Route path="/students/:id" element={<UserDetailsPage />} />
                        <Route path="/students/:id/edit" element={<UserEditPage />} />

                        <Route path="/quizzes" element={<QuizListPage />} />
                        <Route path="/quizzes/create" element={<CreateQuiz />} />
                        <Route path="/quizzes/:id" element={<QuizHomePage />} />
                        <Route path="/quizzes/:id/edit" element={<EditQuiz />} />
                        <Route path="/quizzes/:id/start" element={<QuizPage />} />
                        <Route path="/quizzes/:id/result" element={<ResultPage />} />

                        <Route path="/notices" element={<NoticePage />} />
                        
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/faq" element={<FaqPage />} />
              </Routes>
            </Col>
        </Row>
        
        
    </>
  )
}

export default TeacherDashboard