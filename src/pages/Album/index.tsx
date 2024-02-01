import { useLocation, useParams } from "react-router-dom"
import Aside from "../../components/Aside"
import './style.css'
import { useEffect, useState } from "react"
import getMusics from "../../services/musicsAPI"
import { AlbumType, SongType } from "../../types"
import MusicCard from "../../components/MusicCard"
import Loading from "../../components/Loading"
import ReturnButtom from "../../components/ReturnButtom"

function Album(){
  const [album,setAlbum] = useState<[AlbumType, ...SongType[]]>()
  const [songs,setSongs] = useState<SongType[]>([])
  const [loading,setLoading] = useState(false)

  const params = useParams()
  
  const location = useLocation()
  const {state} = location

  useEffect(()=>{
    async function getSong () {
      try{
        if(params.id){ 
          setLoading(true)
          const result = await getMusics(params.id)
          setLoading(false)
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
      const songsArray : SongType[] = songsList.filter((item): item is SongType => 'trackId' in item &&
       'trackName' in item && 'previewUrl' in item).map(song=>({
        trackId: song.trackId,
        trackName: song.trackName,
        previewUrl: song.previewUrl,
       }))
      setSongs(songsArray)
      }    
  },[album]);
  
  return(
    <div className="album-page">
      <Aside />
      <div className="album-content">
        <div className="album-header">
        <ReturnButtom/>
        <img className='img-album' src={state.albumImg} alt="" />
        {album && 
          <div className="header-info">
            <h1>{album[0].collectionName}</h1>
            <p>{album[0].artistName}</p>
          </div>
        }
        </div>
        <div className="songs-container">
        {loading && 
          <div className="loading-center">
            <Loading />
          </div>
        }
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