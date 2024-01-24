import { useLocation, useParams } from "react-router-dom"
import Aside from "../../components/Aside"
import './style.css'
import { useEffect, useState } from "react"
import getMusics from "../../services/musicsAPI"
import { AlbumType, SongType } from "../../types"
import MusicCard from "../../components/MusicCard"

function Album(){
  const [album,setAlbum] = useState<[AlbumType, ...SongType[]]>()
  const [songs,setSongs] = useState<SongType[]>([])

  const params = useParams()
  
  const location = useLocation()
  const {state} = location

  useEffect(()=>{
    async function getSong () {
      try{
        if(params.id){ 
          const result = await getMusics(params.id)
          setAlbum(result)
        }
      } catch(error){
          console.error(error)
      }
    }
    getSong()
  },[params])

  useEffect(()=>{
    const songsList = album?.slice(1)
    if(songsList){
      const prevSongs: SongType[] = songsList.map((song) => ({
        trackId: song.trackId,
        trackName: song.trackName,
        previewUrl: song.previewUrl
      }));
      setSongs(prevSongs)
    }    
  },[album])
  ;
  
  return(
    <div className="album-page">
      <Aside />
      <div className="album-content">
        <div className="album-header">
        <img className='img-album' src={state.albumImg} alt="" />
        {album && 
          <div className="header-info">
            <h1>{album[0].collectionName}</h1>
            <p>{album[0].artistName}</p>
          </div>
        }
        </div>
        <div className="songs-container">
          {songs && 
            <MusicCard 
              songs ={songs}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default Album