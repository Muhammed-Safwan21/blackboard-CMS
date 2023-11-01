import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState('')
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    
    if(userInfo){
        navigate('/')
    }
  
}, [userInfo,navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return false;
    } else {
      try {
        const res = await register({ name,email,role, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="flex justify-center  p-4">
      <div className="w-3/5 p-4">
      <h2 className="px-4">Welcome to Blackboard..!</h2>
    <p className="px-4">
    Sign up to access a world of educational resources and connect with
    teachers and students in your classroom.
  </p>
  <Image src="/images/classroom.png" alt="Classroom Image" className="w-5/6 ml-5"/>
  </div>
    
    <div className='w-2/5 border-t  shadow-xl rounded-[30px] px-12 py-6'>
      <h2 className="text-primary text-center m-0">SIGN UP</h2>
      <Form onSubmit={submitHandler} className="text-primary">

      <Form.Group controlId="name" className="my-1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="my-1">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="role" className="pt-1">
      <Form.Label>Role :</Form.Label>
      
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
    </Form.Group>

        <Form.Group controlId="password" className="my-1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-1">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Your Password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="flex  justify-between items-center">
        <Button
          type="submit"
          variant="primary"
          className="mt-1"
          disabled={isLoading}
        >
          Sign Up
        </Button>
        <p> Already have an account?{" "} <Link to="/login">Login</Link></p>
       
        </div>

        {isLoading && <Loader />}
      </Form>
      </div>
      </div>
  );
};

export default RegisterPage;
