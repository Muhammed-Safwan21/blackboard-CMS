import  { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../../components/Loader'
import { setCredentials } from '../../slices/authSlice';
import { useLoginMutation } from '../../slices/usersApiSlice';
import {toast} from 'react-toastify'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password , setPassword]= useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector((state)=>state.auth)

    const [login , {isLoading}] = useLoginMutation()

    useEffect(() => {
    
        if(userInfo){
            navigate('/')
        }
      
    }, [userInfo,navigate])

    const submitHandler = async (e) =>{
        e.preventDefault()
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/')
        } catch (err) {
            console.log(err)
            toast.error(err?.data?.message || err.error)
        }
       
    }
  return (
    <Row className='m-0 h-[79vh] p-4'>
        <Col md={6} className='flex flex-column justify-center items-center text-center'>
            <div>
            <h1 className="text-primary mb-4">Welcome back to  Blackboard..!</h1>
            <p>
             Sign in to access a world of knowledge and collaboration.
            </p>
            <p>
                Key Features:
            </p>
            <ul>
                <li>Easy access to courses and resources</li>
                <li>Seamless communication with instructors and peers</li>
                <li>Efficient management of your educational journey</li>
            </ul>
            </div>
        </Col>
       
        <Col md={6}  className='flex justify-center items-center'>
        <div className='border-1 w-2/3  shadow-lg rounded-[30px] px-16 py-2 '>
        <h1 className="text-center mb-4 mt-2 text-primary">SIGN IN</h1>
        <Form onSubmit={submitHandler} className='text-primary' >
            <Form.Group controlId="email" className="my-3 ">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" required value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>

            </Form.Group>

            <Form.Group controlId="password" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" required value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>

            </Form.Group>
            <Button type='submit' variant="primary" className="mt-3" >Sign In</Button>

            <Row className="py-3">
                <Col>
                New User? <Link to='/register'>Register</Link>
                </Col>
            </Row>
            
            {isLoading && <Loader/>}

        </Form>
        </div>
        </Col>
 
    </Row>
  )
}

export default LoginPage
