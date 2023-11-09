import React from 'react'
import AdminHome from './AdminHome'
import Sidebar from '../../components/Sidebar'
import { Col, Row } from 'react-bootstrap'
import {  Navigate, Route, Routes } from 'react-router-dom'
import AdminProfile from './AdminProfile'
import AllSubjectsPage from '../AllSubjectsPage'
import SubjectPage from '../SubjectPage'
import LessonPage from '../LessonPage'
import AboutPage from '../AboutPage'
import ContactPage from '../ContactPage'
import FaqPage from '../FaqPage'
import QuizListPage from '../Quiz/QuizListPage'
import TeachersListPage from './Teacher/TeachersListPage'
import StudentsListPage from './Student/StudentsListPage'
import UserEditPage from './UserEditPage'
import UserDetailsPage from './UserDetailsPage'
import NoticePage from '../NoticePage'
import QuizHomePage from '../Quiz/QuizHomePage'
import QuizPage from '../Quiz/QuizPage'
import ResultPage from '../Quiz/ResultPage'
import CreateQuiz from '../Quiz/CreateQuiz'
import EditQuiz from '../Quiz/EditQuiz'
import AdminListPage from './AdminListPage'

const AdminDashboard = () => {
  
  return (
    <>
        <Row className='m-0'>
            <Col md={2} className='p-0 bg-gray-200 h-[89vh] overflow-y-auto scrollbar'>
             <Sidebar />
            </Col>
            <Col md={10} className='p-4 h-[89vh] overflow-y-auto scrollbar'>
            <Routes>
                        <Route path="/" element={<AdminHome/>} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/dashboard" element={<AdminHome />} />
                        <Route path="/profile" element={<AdminProfile />} />


                        <Route path="/subjects" element={<AllSubjectsPage />} />
                        <Route path="/search/:keyword" element={<AllSubjectsPage />} />
                        <Route path='/subjects/:subjectId' element={<SubjectPage/>} />
                        <Route path='/subjects/:subjectId/lesson/:lessonId' element={<LessonPage/>} />

                        <Route path="/teachers" element={<TeachersListPage />} />
                        <Route path="/teachers/:id" element={<UserDetailsPage />} />
                        <Route path="/teachers/:id/edit" element={<UserEditPage />} />

                        <Route path="/students" element={<StudentsListPage />} />
                        <Route path="/students/:id" element={<UserDetailsPage />} />
                        <Route path="/students/:id/edit" element={<UserEditPage />} />

                        <Route path="/admins" element={<AdminListPage />} />
                        <Route path="/admins/:id" element={<UserDetailsPage />} />
                        <Route path="/admins/:id/edit" element={<UserEditPage />} />
                        
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

export default AdminDashboard