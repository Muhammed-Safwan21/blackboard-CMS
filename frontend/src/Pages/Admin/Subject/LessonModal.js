import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {toast} from 'react-toastify'
import Loader from '../../../components/Loader';
import Message from '../../../components/Message'
import { useCreateLessonMutation, useUpdateLessonMutation, useUploadLessonImageMutation } from '../../../slices/lessonApiSlice';


const LessonModal = ({ show, handleClose , initialData, subjectId}) => {

  
  const [title ,setTitle]= useState('');
  const [image , setImage] = useState('');
  const [description , setDescription] = useState('')
  
  const [createLesson, { isLoading, refetch,error }] = useCreateLessonMutation();
  const [updateLesson,{isLoading:loadingUpdate}] = useUpdateLessonMutation()
  const [uploadLessonImage] = useUploadLessonImageMutation()


  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setImage(initialData.image);
      setDescription(initialData.description);
    }
  }, [initialData]);
  

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
          if (initialData) {
            const updatedLesson = { subjectId,lessonId:initialData._id, title, image, description };
            const result = await updateLesson(updatedLesson);
             if(result.error){
               toast.error(result.error)
              }else{
                toast.success("Lesson Updated");
                handleClose()
               }
          } else {
            await createLesson({ title, image, description,subjectId });
            toast.success("Lesson Created");
            handleClose();
            refetch();
          }
         
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    

  const uploadFileHandler = async (e) =>{

    // console.log(e.target.files[0])
    const formData = new FormData();
    formData.append('image',e.target.files[0]);
    // for (let i = 0; i < e.target.files.length; i++) {
    //     formData.append('images', e.target.files[i]);
    // }
    try {
         const res = await uploadLessonImage(formData).unwrap();
      
        toast.success(res.message);
        setImage(res.image);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
}

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>{initialData ? 'Edit Lesson' : 'Create Lesson'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            {loadingUpdate && <Loader/>}
            {isLoading ? <Loader/> : error? (<Message variant='danger'>{error.data.message}</Message>):(
                <Form onSubmit={submitHandler} className="text-black">
                    <Form.Group controlId='title' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={initialData ? title : null} placeholder='Enter name' onChange={(e)=>setTitle(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image' className='my-2'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' value={initialData ? image : null} placeholder='Enter image url' onChange={(e)=>setImage(e.target.value)}></Form.Control> 
                        <Form.Control type='file' label='choose files' multiple onChange={uploadFileHandler} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' as='textarea' rows={4} value={initialData ? description : null} placeholder='Enter description' onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' className='my-3' variant='primary'>{initialData ? 'Update' : 'Create'}</Button>
                </Form>
            )}
       
      </Modal.Body>
    </Modal>
  );
};

export default LessonModal;
