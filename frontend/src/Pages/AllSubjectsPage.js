import React, { useState } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import SubjectModal from "./Admin/Subject/SubjectModal";
import { Link, useParams } from "react-router-dom";
import { useDeleteSubjectMutation, useGetAllSubjectsQuery } from "../slices/subjectApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllSubjectsPage = () => {
  const  {keyword}  = useParams();
  console.log(keyword)

  const {data:subjects,isLoading,refetch,error} = useGetAllSubjectsQuery(keyword)
  const [deleteSubject, { isLoading: loadingDelete}] = useDeleteSubjectMutation();
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

 

  const {userInfo} = useSelector(state=>state.auth)

  const handleShowCreateModal = () => {
    setShowModal(true);
    setEditingSubject(null);
  };

  const handleShowEditModal = (subject) => {
    setShowModal(true);
    setEditingSubject(subject);
  };


const deleteHandler = async (id) => {
  if (window.confirm("Are you sure?")) {
    try {
      await deleteSubject(id);
      toast.success("Subject Deleted");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
};
  return (
    
    <>
    {loadingDelete && <Loader/>}
    {(isLoading ) ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
      <>
      <div className="flex justify-between items-center">
        <h1>All Subjects</h1>
        {(userInfo?.role === 'admin' || userInfo?.role === 'teacher') && 
        <Button className="m-3" onClick={handleShowCreateModal}>
          Create Subject
        </Button>}
      </div>

      <Row className="ml-2">
        {subjects.length === 0 && (<p className="m-1">No Subjects</p>) }
        {subjects.map((subject) => (
          <Col key={subject._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <Link to={`/subjects/${subject._id}`}>
                <Card.Img
                  src={subject.image}
                  alt={subject.name}
                  variant="top"
                  style={{ width: "222px", height: "195px" }}
                />
              </Link>
              <Card.Body>
                <Link to={`/subjects/${subject._id}`} className="no-underline">
                   <Card.Text as="div" className="font-medium">{subject.name} - {subject.code}</Card.Text>
                </Link>
              </Card.Body>
              
              {(userInfo?.role === 'admin' || userInfo?.role === 'teacher') && 
              <Card.Footer className="flex items-center justify-center">
              <Button className="px-3" onClick={() => handleShowEditModal(subject)}>Edit</Button>
              <Button className="ml-2" onClick={() => deleteHandler(subject._id)}>Delete</Button>
              </Card.Footer>
              }
              
            </Card>
            
          </Col>
        ))}
      </Row>

      {/* SubjectModal component for creating and editing subjects */}
      <SubjectModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        // handleSubmit={handleFormSubmit}
        initialData={editingSubject}
        />
      </>)}
    </>
  );
};

export default AllSubjectsPage;
