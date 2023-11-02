import {Link} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import {toast} from 'react-toastify';
import Loader from '../../../components/Loader'
import { useDeleteUserMutation, useGetTeachersQuery, } from '../../../slices/usersApiSlice';
import Message from '../../../components/Message';
import { HiOutlineTrash } from 'react-icons/hi';
import { BiEditAlt } from 'react-icons/bi';
 
const TeachersListPage = () => {
  const {data:teachers , isLoading ,refetch, error} = useGetTeachersQuery();
  const [deleteUser , {isLoading:loadingDelete}] = useDeleteUserMutation()

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
     <h2 className="text-primary">Teachers</h2>
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
        {teachers?.length === 0 && (<p className='ml-3'>No Teachers</p>)}
          {teachers.map((teacher)=>(
            <tr key={teacher._id}>
              <td>{teacher._id}</td>
              <td>{teacher.name}</td>
              <td><a className='no-underline' href={`mailto:${teacher.email}`}>{teacher.email}</a></td>
             
              <td>
              <Link to={`/teachers/${teacher._id}`}>
                <Button className='btn-sm' variant='light'>view</Button>
                </Link>{' '}
                <Link to={`/teachers/${teacher._id}/edit`}>
                <Button className='btn-sm' variant='light'><BiEditAlt size={20}/></Button>
                </Link>{' '}
                <Button className='btn-sm ' variant='light' onClick={()=>{deleteHandler(teacher._id)}}>
                <HiOutlineTrash size={20} style={{color:'red'}}/>
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

export default TeachersListPage