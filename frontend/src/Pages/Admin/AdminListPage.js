import {Link} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import {FaTrash, FaEdit} from 'react-icons/fa';
import {toast} from 'react-toastify';
import { useGetAdminsQuery,useDeleteUserMutation } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useSelector } from 'react-redux';
 
const AdminListPage = () => {
  const {data:admins , isLoading ,refetch, error} = useGetAdminsQuery();
  const [deleteUser , {isLoading:loadingDelete}] = useDeleteUserMutation()
  const {userInfo} = useSelector(state=>state.auth)

  const deleteHandler = async(id)=>{
    if(window.confirm('Are you sure?')){
        try {
            await deleteUser(id);
            refetch()
            toast.success('User Deleted ')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  }

  return (
    <>
     <h2 className="text-primary">Admins</h2>
     {loadingDelete && <Loader/>}
     {isLoading ? <Loader/> : error ? <Message variant='danger'>{error?.data?.message}</Message>:(
      <Table  hover responsive className='table-sm text-black'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 && (<p className='ml-3'>No admins</p>)}
          {admins.map((admin)=>(
            <tr key={admin._id}>
              <td>{admin._id}</td>
              <td>{admin.name} ({userInfo.name === admin.name ? 'me' : '' })</td>
              <td><a href={`mailto:${admin.email}`}>{admin.email}</a></td>
             
              <td>
              <Link to={`/admins/${admin._id}`}>
                <Button className='btn-sm' variant='light'>view</Button>
                </Link>{' '}
                <Link to={`/admins/${admin._id}/edit`}>
                <Button className='btn-sm' variant='light'><FaEdit/></Button>
                </Link>{' '}
                <Button className='btn-sm ' variant='danger' onClick={()=>{deleteHandler(admin._id)}}>
                    <FaTrash style={{color:'white'}}/>
                </Button>
              </td> 
              
            </tr>
          ))}
        </tbody>
      </Table>
     )}
    </>
  )
}

export default AdminListPage