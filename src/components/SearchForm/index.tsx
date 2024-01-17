import { useEffect, useState } from 'react';
import './style.css';
import { IoIosSearch } from "react-icons/io";
import { HtmlElementType } from '../../types';

function SearchForm(){
  const [enableBtn,setEnableBtn] = useState(true);
  const [searchInfo,setSearchInfo] = useState('');
  
  function handleChange(event : HtmlElementType){
    setSearchInfo(event.target.value);
  }

  useEffect(()=>{
    if(searchInfo.length>2){
      setEnableBtn(false)
    } else {
      setEnableBtn(true)
    }
  },[searchInfo])

  return(
  <div className="search-container">
    <div className='search-form'>
      <input 
        type="text" 
        placeholder='Busque por músicas e artistas'
        onChange={handleChange}
        />
      <button
      disabled={enableBtn}
      >
        <IoIosSearch/>
      </button>
    </div>
   </div>
  )
}

export default SearchForm