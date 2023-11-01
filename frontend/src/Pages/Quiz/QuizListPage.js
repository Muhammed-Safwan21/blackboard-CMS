import {Link} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import {FaTrash, FaEdit} from 'react-icons/fa';
import {toast} from 'react-toastify';
import { useGetAllQuizQuery,useDeleteQuizMutation } from '../../slices/quizApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useSelector } from 'react-redux';
 
const QuizListPage = () => {
  const {data:quizzes , isLoading ,refetch, error} = useGetAllQuizQuery();
  const [deleteQuiz , {isLoading:loadingDelete}] = useDeleteQuizMutation();
  const {userInfo} = useSelector(state=>state.auth)

  const deleteHandler = async(id)=>{
    if(window.confirm('Are you sure?')){
        try {
            await deleteQuiz(id);
            refetch()
            toast.success('Quiz Deleted ')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  }

  return (
    <>
    <div className='flex justify-between m-2'>
     <h2 className="text-primary">Available Quizzes</h2>
     {(userInfo.role === 'admin' || userInfo.role === 'teacher') && (
      <Link to='/quizzes/create'><Button>Create Quiz</Button></Link>
     )}
      </div>
    <div className='w-1/2 text-center'>
     {loadingDelete && <Loader/>}
     {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
      <Table  hover responsive className='table-sm text-black'>
        <thead>
          <tr>
            <th>SL No.</th>
            <th>NAME</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {quizzes.length === 0 && (<p className='m-3'>No quizzes</p>)}
          {quizzes.map((quiz,i)=>(
            <tr key={quiz._id}>
              <td>{i+1}</td>
              <td>{quiz.title}</td>
              <td>
               <Link to={`${quiz._id}`}>
                <Button className='btn-sm' variant='light'>View</Button>
                </Link>{' '}
                {(userInfo.role === 'admin' || userInfo.role === 'teacher') && (
                  <>
                  <Link to={`${quiz._id}/edit`}>
                 <Button className='btn-sm' variant='light'><FaEdit size={18}/></Button>
                 </Link>{' '}
                <Button className='btn-sm ' variant='danger' onClick={()=>{deleteHandler(quiz._id)}}>
                    <FaTrash style={{color:'white'}}/>
                </Button>
                  </>
                )}
                
              </td> 
              
            </tr>
          ))}
        </tbody>
      </Table>
     )}
    </div>
    </>
  )
}

export default QuizListPage