import { useEffect, useState } from 'react';
import './style.css';
import { IoIosSearch } from "react-icons/io";
import { AlbumType, HtmlElementType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import AlbumList from '../AlbumList';

function SearchForm(){
  const [enableBtn,setEnableBtn] = useState(true);
  const [searchInfo,setSearchInfo] = useState('');
  const [loading,setLoading] = useState(false)
  const [albums, setalbums] = useState<AlbumType[]>([])
  const [message,setMessage] = useState(false)
  
  function handleChange(event : HtmlElementType){
    setSearchInfo(event.target.value);
  }

  async function handleClick() {
    setLoading(true);
    setMessage(false);
    setalbums([])
    try{
      const data = await searchAlbumsAPI(searchInfo);
      if(data.length){
        setMessage(false)
        setalbums(data)
      } else {
        setMessage(true)
        setalbums([])
      }
      setLoading(false);
    } catch(error){
      console.error('Erro ao carregar album')
    }
  }

  useEffect(()=>{
    if(searchInfo.length>2){
      setEnableBtn(false)
    } else {
      setEnableBtn(true)
    }
  },[searchInfo])

  return(
  <div className='search-container'>
    <div className="search-top-bar">
      <div className='search-form'>
        <input 
          type="text" 
          placeholder='Busque por músicas e artistas'
          onChange={handleChange}
          value={searchInfo}
          />
        <button
        disabled={enableBtn}
        onClick={handleClick}
        >
          <IoIosSearch/>
        </button>
      </div>
    </div>
    <div className='main-container'>
      <AlbumList 
        loading={loading}
        message={message}
        albums={albums} 
      />
    </div>
   </div> 
  )
}

export default SearchForm