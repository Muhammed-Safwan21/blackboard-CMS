import {Link} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import {toast} from 'react-toastify';
import Loader from '../../../components/Loader'
import { useDeleteUserMutation, useGetStudentsQuery, } from '../../../slices/usersApiSlice';
import Message from '../../../components/Message';
import { HiOutlineTrash } from 'react-icons/hi';
import { BiEditAlt } from 'react-icons/bi';
 
const StudentsListPage = () => {
  const {data:students , isLoading ,refetch, error} = useGetStudentsQuery();
  const [deleteUser , {isLoading:loadingDelete}] = useDeleteUserMutation()

  const deleteHandler = async(id)=>{
    if(window.confirm('Are you sure?')){
        try {
            await deleteUser(id);
            refetch()
            toast.success('User deleted successfully')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  }

  return (
    <>
     <h2 className="text-primary">Students</h2>
     {loadingDelete && <Loader/>}
     {isLoading ? <Loader/> : error ? <Message variant='danger'>{error?.data?.message}</Message>:(
      <Table  hover responsive className='table-sm text-black'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            {/* <th>SUBJECT</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (<p className='ml-3'>No Students</p>)}
          {students.map((student)=>(
            <tr key={student._id}>
              <td>{student._id}</td>
              <td>{student.name}</td>
              <td><a className='no-underline' href={`mailto:${student.email}`}>{student.email}</a></td>
              {/* <td>{student.subject}</td> */}
             
              <td>
               <Link to={`/students/${student._id}`}>
                <Button className='btn-sm' variant='light'>view</Button>
                </Link>{' '}
                <Link to={`/students/${student._id}/edit`}>
                <Button className='btn-sm' variant='light'><BiEditAlt size={20}/></Button>
                </Link>{' '}
                <Button className='btn-sm ' variant='light' onClick={()=>{deleteHandler(student._id)}}>
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

export default StudentsListPage