import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slices/usersApiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserEditPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, role });

      toast.success("User updated successfully");
      refetch();
      if(role === 'student'){
        navigate('/students')
      }else if(role === 'teacher'){
        navigate('/teachers')
      }
      
    } catch (err) {
      toast.error(err?.data?.message || "err.error");
    }
  };

  return (
    <>
      <Link to={user?.role === 'teacher' ?  '/teachers' : user?.role === 'student' ? '/students' : '/admins'
        } className="btn btn-light my-3">
        Go Back
      </Link>
      <Container>
        <Row className='justify-content-md-center '>
        <Col xs={12} md={6}>
        <h1 className="text-primary">Edit 
        {(user?.role === 'teacher') ?  (' Teacher') : (user?.role === 'student') ? (' Student') : (' Admin')
        }</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {" "}
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler} className="text-black">
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
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
                    checked={role === "student"}
                    onChange={() => setRole("student")}
                  />
                </div>
                <div className="form-check form-check-inline">
                  <Form.Check
                    type="radio"
                    id="teacher-radio"
                    label="Teacher"
                    value="teacher"
                    name="role"
                    checked={role === "teacher"}
                    onChange={() => setRole("teacher")}
                  />
                </div>
                {userInfo?.role === "admin" && 
                <div className="form-check form-check-inline">
                <Form.Check
                  type="radio"
                  id="admin-radio"
                  label="Admin"
                  value="admin"
                  name="role"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
              </div>}
                
              </Col>
            </Form.Group>

            <Button type="submit" className="my-3" variant="primary">
              Update
            </Button>
          </Form>
        )}
       </Col>
        </Row>
    </Container>
    </>
  );
};

export default UserEditPage;
