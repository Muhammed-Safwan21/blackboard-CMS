import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router,Route, Routes, Navigate } from 'react-router-dom'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import StudentDashboard from './Pages/Student/StudentDashboard'
import TeacherDashboard from './Pages/Teacher/TeacherDashboard'
import LoginPage from './Pages/AuthPages/LoginPage'
import RegisterPage from './Pages/AuthPages/RegisterPage'
import LandingPage from './Pages/LandingPage'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'
import FaqPage from './Pages/FaqPage'

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="font-poppins">
      <Router>
        <div className='sticky top-0 w-full z-1'>
        <Header />
        </div>

        <main >
          {userInfo === null && (
            <>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
            </>
          )}

          {userInfo?.role === 'admin' && <AdminDashboard />}

          {userInfo?.role === 'student' && <StudentDashboard />}

          {userInfo?.role === 'teacher' && <TeacherDashboard />}
        </main>
        <ToastContainer />
      </Router>
    </div>
  );
};


export default App;
