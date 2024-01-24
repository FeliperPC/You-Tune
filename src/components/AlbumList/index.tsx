import { AlbumType } from "../../types"
import Loading from '../Loading';
import { PiSmileySadFill } from "react-icons/pi";
import './style.css'
import { useNavigate } from "react-router-dom";

type AlbumListProps ={
  loading : boolean,
  message :boolean,
  albums : AlbumType[]
}

function AlbumList({loading, message,albums} : AlbumListProps) {
  const navigate = useNavigate()
  if(loading){
    return(
      <Loading/>
    )
  }
  if(message){
    return(
      <h2>Nenhum álbum foi encontrado <PiSmileySadFill/></h2>
    )
  }

  function handleClick(idAlbum :number,albumImg:string){
    const id = idAlbum.toString();
    navigate(`/album/${id}`,{state:{albumImg:albumImg}})
  }
  return(
      <div className='albums-container'>
        {albums.length>0 && 
        <div className="result-container">
          <h1>Resultados de {albums[0].artistName}</h1>
          <div className="albums-list">
            {albums.map((item,index)=>(
              <div className="album" key={index} onClick={()=>handleClick(item.collectionId,item.artworkUrl100)}>
                <img src={item.artworkUrl100} alt={item.collectionName}/>
                <div className='album-info'>
                  <p className='album-name'>{item.collectionName}</p>
                  <p className='artist-name'>{item.artistName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        }
      </div>
  )
}

export default AlbumList