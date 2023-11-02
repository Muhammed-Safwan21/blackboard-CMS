import React, { useState } from 'react'
import { Button,} from 'react-bootstrap';
import NoticeModal from './Admin/Notice/NoticeModal';
import { toast } from 'react-toastify';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { useDeleteNoticeMutation, useGetAllNoticesQuery } from '../slices/noticeApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const NoticePage = () => {
  const {data:notices,isLoading,refetch,error} = useGetAllNoticesQuery()
  const [deleteNotice, { isLoading: loadingDelete}] = useDeleteNoticeMutation();
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

  const {userInfo} = useSelector(state=>state.auth)

  const handleShowCreateModal = () => {
    setShowModal(true);
    setEditingNotice(null);
  };

  const handleShowEditModal = (notice) => {
    setShowModal(true);
    setEditingNotice(notice);
  };


const deleteHandler = async (id) => {
  if (window.confirm("Are you sure?")) {
    try {
      await deleteNotice(id);
      toast.success("Notice Deleted");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
};
  return (
    <>
    {loadingDelete && <Loader/>}
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
      <>
      <div className='flex justify-between items-center m-2'>
    <h1>Notices</h1>
    {(userInfo?.role === 'admin' || userInfo?.role === 'teacher') && 
        <Button className="m-3" onClick={handleShowCreateModal}>
          Create Notice
        </Button>}
    </div>
    {notices?.length > 0 ? (
      <>
      {notices.map((notice)=>(
       <div className='bg-gray-100 rounded border border-gray-300 m-2'>
       <div className='flex p-2 justify-around items-center bg-blue-100 text-black-900 font-medium text-center border border-gray-300'>
           <h3 className='mb-0'>{notice.title}</h3>
           <h3 className='mb-0'>{moment(notice.createdAt).format("DD/MM/YYYY hh:mm A")}</h3>
           {(userInfo?.role === 'admin' || userInfo?.role === 'teacher') && (
           <div>
           <Button className="px-3" onClick={() => handleShowEditModal(notice)}>Edit</Button>
           <Button className="ml-2" onClick={() => deleteHandler(notice._id)}>Delete</Button>
           </div>)}
       </div>
       <div className='p-3'>{notice.description}</div>
       </div>

    ))}
   
      </>

    ) : (<p className='m-2'>No notices</p>)
}
    <NoticeModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        initialData={editingNotice}
        />
    </>
      
    )}
    </>
    
  )
}

export default NoticePage;