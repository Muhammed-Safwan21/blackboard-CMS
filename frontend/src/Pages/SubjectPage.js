import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import LessonModal from "./Admin/Subject/LessonModal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDeleteLessonMutation } from "../slices/lessonApiSlice";
import { useGetSubjectDetailsQuery } from "../slices/subjectApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const SubjectPage = () => {
  const { subjectId } = useParams();

  const {
    data: subject,
    isLoading,
    refetch,
    error,
  } = useGetSubjectDetailsQuery(subjectId);
  const [deleteLesson, { isLoading: loadingDelete }] =
    useDeleteLessonMutation();
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);

  const handleShowCreateModal = () => {
    setShowModal(true);
    setEditingLesson(null);
  };

  const handleShowEditModal = (lesson) => {
    setShowModal(true);
    setEditingLesson(lesson);
  };

  const deleteHandler = async (subjectId, lessonId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteLesson({ subjectId, lessonId });
        refetch();
        toast.success("Lesson Deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <div>
          <Link className='btn btn-light my-3' to='/subjects'>Go Back</Link> 
          <h1>
            {subject?.name}-{subject?.code}
          </h1>
          <h6>{subject?.description}</h6>
          <div className="flex justify-between items-center">
            <h3>Available Lessons</h3>
            {(userInfo?.role === "admin" || userInfo?.role === "teacher") && (
              <Button className="m-3" onClick={handleShowCreateModal}>
                Create Lesson
              </Button>
            )}
          </div>

          <Row>
            {subject?.lessons && subject?.lessons?.length > 0 ? (
              subject?.lessons.map((lesson, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <Card className="my-3 p-3 rounded">
                    <Link to={`/subjects/${subjectId}/lesson/${lesson._id}`}>
                      <Card.Img
                        src={lesson.image}
                        alt={lesson.title}
                        variant="top"
                        style={{ width: "222px", height: "195px" }}
                      />
                    </Link>
                    <Card.Body>
                      <Link
                        to={`/subjects/${subjectId}/lesson/${lesson._id}`}
                        className="no-underline"
                      >
                        <Card.Text as="div" className="font-semibold">
                          {lesson.title}
                        </Card.Text>
                      </Link>
                    </Card.Body>
                    {(userInfo?.role === "admin" ||
                      userInfo?.role === "teacher") && (
                      <Card.Footer>
                        <Button onClick={() => handleShowEditModal(lesson)}>
                          Edit
                        </Button>{" "}
                        <Button
                          onClick={() => deleteHandler(subjectId, lesson._id)}
                        >
                          Delete
                        </Button>
                      </Card.Footer>
                    )}
                  </Card>
                </Col>
              ))
            ) : (
              <p className="m-1">No lessons available.</p>
            )}
          <LessonModal
            show={showModal}
            handleClose={() => {
              setShowModal(false)
              refetch()}}
            subjectId={subjectId}
            initialData={editingLesson}
          />
          </Row>
        </div>
      )}
    </>
  );
};

export default SubjectPage;
