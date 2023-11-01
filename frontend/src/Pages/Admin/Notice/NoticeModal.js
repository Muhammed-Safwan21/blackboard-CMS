import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {toast} from 'react-toastify'
import { useCreateNoticeMutation, useUpdateNoticeMutation } from '../../../slices/noticeApiSlice';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';


const NoticeModal = ({ show, handleClose , initialData}) => {

  
  const [title ,setTitle]= useState('');
  const [description , setDescription] = useState('')
  
  const [createNotice, { isLoading, refetch,error }] =
    useCreateNoticeMutation();

  const [updateNotice,{isLoading:loadingUpdate}] = useUpdateNoticeMutation()



  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);
  

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
          if (initialData) {
            const updatedNotice = { id:initialData._id, title, description };
            const result = await updateNotice(updatedNotice);
             if(result.error){
            toast.error(result.error)
            }else{
              toast.success("Notice Updated");
              handleClose()
             }
          } else {
            await createNotice({ title, description });
            toast.success("Notice Created");
            handleClose();
            refetch();
          }
         
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>{initialData ? 'Edit Notice' : 'Create Notice'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
              {loadingUpdate && <Loader/>}
            {isLoading ? <Loader/> : error? (<Message variant='danger'>{error.data.message}</Message>):(
                <Form onSubmit={submitHandler} className="text-black">
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' value={initialData ? title : null}placeholder='Enter title' onChange={(e)=>setTitle(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' as='textarea' row={2} value={initialData ? description : null} placeholder='Enter description' onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' className='my-3' variant='primary'>{initialData ? 'Update' : 'Create'}</Button>
                </Form>
            )}
       
      </Modal.Body>
    </Modal>
  );
};

export default NoticeModal;
