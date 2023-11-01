import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import {FiLogOut} from 'react-icons/fi'

const Sidebar = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();

  const currentYear = new Date().getFullYear()

  const {userInfo} = useSelector(state=>state.auth)

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
  
    if (confirmLogout) {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
    <div className="bg-gray-200 h-full">
      <p className="text-center bg-white mb-0 p-2 border-r ">Menu</p>
      <div className=" text-xl border-r border-gray-300">
          
          <Link to='/dashboard' className="no-underline">
          <div
            className={` cursor-pointer flex items-center justify-center h-20 border-t border-gray-300 text-center font-medium text-md  
            ${((location.pathname === '/dashboard') || (location.pathname === '/'))  ? 'bg-gray-500 text-white':"hover:bg-gray-300"}`}
          >
           Home
          </div>
          </Link>
          {/* Subject*/}
          <Link to='/subjects' className="no-underline">
          <div
            className={` cursor-pointer flex items-center justify-center h-20 border-t border-gray-300  text-center font-medium text-md 
            ${location.pathname === '/subjects' ? 'bg-gray-500 text-white':"hover:bg-gray-300"}`}
          >
           Subjects
          </div></Link>

           {/* Quiz*/}
           <Link to='/quizzes' className="no-underline">
           <div
            className={` cursor-pointer flex items-center justify-center h-20 border-t border-gray-300  text-center font-medium text-md 
            ${location.pathname === '/quizzes' ? 'bg-gray-500 text-white':"hover:bg-gray-300"}`}
          >Quiz
            
          </div></Link>

          {/* Notices*/}
          <Link to='/notices' className="no-underline">
           <div
            className={` cursor-pointer flex items-center justify-center h-20 border-t border-gray-300  text-center font-medium text-md 
            ${location.pathname === '/notices' ? 'bg-gray-500 text-white':"hover:bg-gray-300"}`}
          >Notices
          </div></Link>


          {  (userInfo?.role === 'teacher' ||  userInfo?.role === 'admin') && (

            //Students
           <Link to='/students' className="no-underline">
           <div
            className={` cursor-pointer flex items-center justify-center h-20 border-t border-gray-300  text-center font-medium text-md 
            ${location.pathname === '/students' ? 'bg-gray-500 text-white':"hover:bg-gray-300"}`}
          >
           Students
          </div>
          </Link>

          ) }
           
           {userInfo?.role === 'admin' && (
            <>
            {/* Teachers */}
            <Link to='/teachers' className="no-underline">
           <div
            className={` cursor-pointer flex items-center justify-center h-20 border-t border-gray-300  text-center font-medium text-md
            ${location.pathname === '/teachers' ? 'bg-gray-500 text-white':"hover:bg-gray-300"}`}
          >Teachers
          </div></Link>

           {/* Admins */}
           <Link to='/admins' className="no-underline">
           <div
            className={` cursor-pointer flex items-center justify-center h-20 border-t border-gray-300  text-center font-medium text-md
            ${location.pathname === '/admins' ? 'bg-gray-500 text-white':"hover:bg-gray-300"}`}
          >Admins
          </div></Link>
          </>
           )}
           {/* Profile*/}
           <Link to='/profile' className="no-underline">
           <div
            className={` cursor-pointer flex items-center justify-center h-20 border-t border-gray-300  text-center font-medium text-md 
            ${location.pathname === '/profile' ? 'bg-gray-500 text-white':"hover:bg-gray-300"}`}
          >
           Profile 
          </div></Link>
        {/* Logout*/}
        <div
          className={` cursor-pointer flex items-center text-red-500 justify-center h-20 border-y border-gray-300  text-center font-medium text-md hover:bg-gray-300`}
          onClick={logoutHandler}
        >
          <FiLogOut/><span className="ml-1">Logout</span>
          
        </div>
        <div
          className={` flex items-center justify-center h-10 border-y border-gray-300  text-center font-medium text-sm`}
          
        >
          <span className="ml-1">BlackBoard &copy; {currentYear}</span>
          
        </div>

    </div>
    </div>
    </>
  );
};

export default Sidebar;
