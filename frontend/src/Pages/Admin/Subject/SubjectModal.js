import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {toast} from 'react-toastify'
import Loader from '../../../components/Loader';
import Message from '../../../components/Message'
import { useCreateSubjectMutation, useUpdateSubjectMutation, useUploadSubjectImageMutation } from '../../../slices/subjectApiSlice';


const SubjectModal = ({ show, handleClose , initialData}) => {

  
  const [name ,setName]= useState('');
  const [code,setCode] = useState('');
  const [image , setImage] = useState('');
  const [description , setDescription] = useState('')
  
  const [createSubject, { isLoading, refetch,error }] =
    useCreateSubjectMutation();

  const [updateSubject,{isLoading:loadingUpdate}] = useUpdateSubjectMutation()

  const [uploadSubjectImage] = useUploadSubjectImageMutation()


  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCode(initialData.code);
      setImage(initialData.image);
      setDescription(initialData.description);
    }
  }, [initialData]);
  

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
          if (initialData) {
            const updatedSubject = { id:initialData._id, name, code, image, description };
            const result = await updateSubject(updatedSubject);
             if(result.error){
            toast.error(result.error)
            }else{
              toast.success("Subject Updated");
              handleClose()
             }
          } else {
            await createSubject({ name, code, image, description });
            toast.success("Subject Created");
            handleClose();
            refetch();
          }
         
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    

  const uploadFileHandler = async (e) =>{

    const formData = new FormData();
    formData.append('image',e.target.files[0]);
    try {
         const res = await uploadSubjectImage(formData).unwrap();
      
        toast.success(res.message);
        setImage(res.image);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
}

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>{initialData ? 'Edit Subject' : 'Create Subject'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
              {loadingUpdate && <Loader/>}
            {isLoading ? <Loader/> : error? (<Message variant='danger'>{error.data.message}</Message>):(
                <Form onSubmit={submitHandler} className="text-black">
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={initialData ? name : null}placeholder='Enter name' onChange={(e)=>setName(e.target.value)}></Form.Control>
                    </Form.Group>
    
                    <Form.Group controlId='code' className='my-2'>
                        <Form.Label>Code</Form.Label>
                        <Form.Control type='text' value={initialData ? code : null} placeholder='Enter code' onChange={(e)=>setCode(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image' className='my-2'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' value={initialData ? image : null} placeholder='Enter image url' onChange={(e)=>setImage(e.target.value)}></Form.Control> 
                        <Form.Control type='file' label='choose files' multiple onChange={uploadFileHandler} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' value={initialData ? description : null} placeholder='Enter description' onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' className='my-3' variant='primary'>{initialData ? 'Update' : 'Create'}</Button>
                </Form>
            )}
       
      </Modal.Body>
    </Modal>
  );
};

export default SubjectModal;
