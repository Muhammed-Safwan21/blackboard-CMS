import { useState,useEffect } from "react"
import {Form,Button , Row ,Col, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../slices/authSlice";
import Loader from "../../components/Loader";
import { useUpdateUserProfileMutation } from "../../slices/usersApiSlice";
import {BiUserCircle} from 'react-icons/bi'
import { useGetSubjectByCreatorQuery } from "../../slices/subjectApiSlice";
import Message from "../../components/Message";
import { useGetQuizByCreatorQuery } from "../../slices/quizApiSlice";


const AdminProfile = () => {
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [role , setRole] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPasword] = useState('');

    const dispatch = useDispatch();
    const {userInfo} = useSelector((state)=>state.auth);
    const userId = userInfo._id;
    const [updateUser , {isLoading : loadingUpdate}] = useUpdateUserProfileMutation()
    const {data:subjects,isLoading,error} = useGetSubjectByCreatorQuery(userId)
    const {data:quiz,isLoading:loadingQuiz} = useGetQuizByCreatorQuery(userId)

    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email)
            setRole(userInfo.role)
        }
    },[userInfo, userInfo.name , userInfo.email,userInfo.role]);

    const submithandler = async (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("Password do not match");
        }else{
            try {
                const res = await updateUser({_id:userInfo._id, name,email,role,password}).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile updated successfully')
            } catch (err) {
                toast.error(err?.data?.message || err.error) 

            }
        }
    }

  return (
  <>
   
    <Row  className="border border-gray-300 p-4 m-4">
       <Col md={6} >
       <h2>Profile Details</h2>
           <div className="w-4/5 bg-blue-100 p-4 flex flex-column items-center border border-gray-300 rounded">
            <div className="mb-4"><BiUserCircle size={64}/></div>
            <div>
              <h4>Name : {userInfo.name}</h4>
              <h4>Email : {userInfo.email}</h4>
              <h4>Role : {userInfo.role}</h4>
            </div>
             
           </div>
        </Col>
        <Col md={6} className="text-primary">
            
            <Form onSubmit={submithandler}>
                <FormGroup controlId="name" className="my-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup controlId="email" className="my-2">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}></FormControl>
                </FormGroup>
                
        {userInfo.role === 'admin' && (
          <>
          <Form.Group controlId="role" className="my-3">
      <Form.Label>Role</Form.Label>
      <Col>
        <div className="form-check form-check-inline">
          <Form.Check
            type="radio"
            id="student-radio"
            label="Student"
            value="student"
            name="role"
            checked={role === 'student'}
            onChange={() => setRole('student')}
          />
        </div>
        <div className="form-check form-check-inline">
          <Form.Check
            type="radio"
            id="teacher-radio"
            label="Teacher"
            value="teacher"
            name="role"
            checked={role === 'teacher'}
            onChange={() => setRole('teacher')}
          />
        </div>
          <div className="form-check form-check-inline">
          <Form.Check
            type="radio"
            id="admin-radio"
            label="Admin"
            value="admin"
            name="role"
            checked={role === 'admin'}
            onChange={() => setRole('admin')}
          />
        </div>
        </Col>
      </Form.Group>
        </>
        )}
     
                <FormGroup controlId="password" className="my-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup controlId="confirmPassword" className="my-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPasword(e.target.value)}></FormControl>
                </FormGroup>
                <Button type="submit" variant="primary" className="my-2">Update</Button>
                {loadingUpdate && <Loader/>}
            </Form>
        </Col>
        
    </Row>
    <Row className="mt-3 border border-gray-300 p-4 m-4">
      <h2>Activities</h2>
      {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error.data?.message}</Message>) : (
        <>
         <Col>

<h4 className="mt-3">Subject Related-Lessons</h4>
{subjects.length === 0 && (<p className='ml-3'>No Subjects/Lessons</p>)}
{subjects?.map((sub)=>(
  <div  className="bg-gray-100 w-3/4 rounded border border-gray-300 mb-3 ">
  <h4 className="bg-blue-100 p-2 text-black-900 font-medium text-center border border-gray-300">{sub.name}</h4>
    {sub?.lessons?.map((lesson,i)=>(
      <h6 className=" p-2 bg-white m-1 font-medium border-y border-gray-300 rounded">{i+1} - {lesson.title}</h6>
    ))}
  
  </div>
))}

</Col>
<Col>
<h4 className="mt-3">Quiz Related</h4>
{loadingQuiz && <Loader/>}
  <div  className="bg-gray-100 w-3/4 rounded border border-gray-300 mb-3 ">
  <h4 className="bg-blue-100 p-2 text-black-900 font-medium text-center border border-gray-300">Createtd Quizzes</h4>
  {quiz?.length === 0 ? (<p className='ml-3'>No quiz</p>) : (quiz?.map((q,i)=>(
      <h6 className=" p-2 bg-white m-1 font-medium border-y border-gray-300 rounded">{i+1} - {q.title}</h6>
    )))}
  </div>

</Col>
        </>
      ) }
        
          
    </Row>
    </>
  )
}

export default AdminProfile