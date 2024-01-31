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
  async function getDataFromApi(info : string){
    setLoading(true);
    setMessage(false);
    setalbums([])
    try{
      const data = await searchAlbumsAPI(info);
      if(data.length){
        setMessage(false)
        setalbums(data)
        localStorage.setItem('search',info)
      } else {
        setMessage(true)
        setalbums([])
      }
      setLoading(false);
    } catch(error){
      console.error('Erro ao carregar album')
    }
  }

  async function handleClick() {
    await getDataFromApi(searchInfo)
  }

  useEffect(()=>{
    if(searchInfo.length>2){
      setEnableBtn(false)
    } else {
      setEnableBtn(true)
    }
  },[searchInfo])

  useEffect(()=>{
    const search = localStorage.getItem('search')
    search && getDataFromApi(search)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
  <div className='search-container'>
    <div className="top-bar">
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