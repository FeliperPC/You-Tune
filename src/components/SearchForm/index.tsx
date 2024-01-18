import { useEffect, useState } from 'react';
import './style.css';
import { IoIosSearch } from "react-icons/io";
import { AlbumType, HtmlElementType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../Loading';
import { PiSmileySadFill } from "react-icons/pi";

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
    try{
      const data = await searchAlbumsAPI(searchInfo);
      if(data.length){
        setMessage(false)
        setalbums([...albums,...data])
      } else {
        setMessage(true)
        setalbums([])
      }
      setSearchInfo('');
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
      {loading && <Loading/>}
      {message && <h2>Nenhum álbum foi encontrado <PiSmileySadFill/></h2>}
      <div className='albums-container'>
        {albums.length>0 && 
        <div className="result-container">
          <h1>Resultados de {albums[0].artistName}</h1>
          <div className="albums-container">
            {albums.map((item)=>(
              <div className="album">
                <img src={item.artworkUrl100} alt={item.collectionName} />
                <p>{item.collectionName}</p>
                <p><em>{item.artistName}</em></p>
              </div>
            ))}
          </div>
        </div>
        }
      </div>
    </div>
   </div> 
  )
}

export default SearchForm