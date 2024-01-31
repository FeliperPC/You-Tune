import './style.css'
import Aside from '../../components/Aside'
import Loading from '../../components/Loading'
import { useEffect, useState } from 'react'
import { SongType } from '../../types'
import { getFavoriteSongs } from '../../services/favoriteSongsAPI'
import MusicCard from '../../components/MusicCard'
import ReturnButtom from '../../components/ReturnButtom'

function Favorites() {
  const [loading,setLoading] = useState(false)
  const [songs,setSongs] = useState<SongType[]>([])

  async function getSongsFromAPI(){
    const APISongs = await getFavoriteSongs()
    setSongs(APISongs)
  }

  useEffect(()=>{
    async function onLoadPage(){
      setLoading(true)
      await getSongsFromAPI()
      setLoading(false)
    }
    onLoadPage()
  },[])

  useEffect(()=>{
    getSongsFromAPI()
  },[songs])

  return(
    <div className="favorite-page">
      <Aside/>
      <div className="fav-page-main">
        <div className="top-bar">
          <ReturnButtom/>
          <h1 style={{color:'white'}}>Músicas Favoritas</h1>
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

export default Favorites