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
    <Form  className="flex items-center justify-center">
        <div className="border border-white w-10 rounded-md mb-0 flex items-center mr-2 px-1 h-11">
        <CiSearch color="white" size={32}  onClick={submitHandler}/>
        </div>
        <FormControl
        type="text"
        name="q"
        onChange={(e)=>setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search ..."
        className="mr-sm-2 ml-sm-5 border-secondary"></FormControl>
    </Form>
  )
}

export default SearchBox