import { useState } from "react"
import { Form, FormControl } from "react-bootstrap"
import { useParams,useNavigate } from "react-router-dom"
import {CiSearch} from 'react-icons/ci'

const SearchBox = () => {

    const navigate = useNavigate();
    const {keyword:urlKeyword} = useParams();
    const [keyword , setKeyword] = useState(urlKeyword || '')

    const submitHandler = (e) =>{
        e.preventDefault()

        if (keyword) {
            navigate(`/search/${keyword.trim()}`);
            setKeyword('');
        }else{
            navigate('/')
        }
    }

  return (
    <Form  className="flex items-center justify-center rounded-md p-2">
        
        <FormControl
        type="text"
        name="q"
        onChange={(e)=>setKeyword(e.target.value)}
        value={keyword}
        placeholder="search here..."
        className="mr-sm-2 ml-sm-5 h-10 border focus:outline-none"></FormControl>
        <div className="border w-10 rounded-md mb-0 flex items-center ml-2 px-1 h-10">
        <CiSearch color="" size={24}  onClick={submitHandler}/>
        </div>
    </Form>
  )
}

export default SearchBox