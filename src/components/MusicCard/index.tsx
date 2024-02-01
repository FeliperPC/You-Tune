import './style.css'
import { HtmlElementType, SongType } from '../../types'
import { useEffect, useState } from 'react'
import {addSong,removeSong,getFavoriteSongs} from '../../services/favoriteSongsAPI'

type MusicCardProps ={
  songs : SongType[]
}

function MusicCard({songs}:MusicCardProps){  
  const [song,setSong] = useState<SongType>()
  const [favSongList,setFavSong] = useState<SongType[]>([])
  
  
  async function handleChange(e:HtmlElementType){
    setSong(songs.find((item)=>item.trackName === e.target.name));
    await getFavoritList()
  }

  async function getFavoritList(){
    const updatedSongs = await getFavoriteSongs()
    setFavSong(updatedSongs)
  }

  useEffect(()=>{
    getFavoritList()
  },[])  

  useEffect(()=>{
    async function handleSongChange() {
      if(song){
        if(favSongList.some((item)=>item.trackId===song.trackId)){
          await removeSong(song)
        } else{
          await addSong(song)
        }
      }
      getFavoritList()
    }
    handleSongChange()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[song])

  return(
    <div className="song-list">
      {songs && 
        songs.map((item)=>(
          <div className="song-box" key={item.trackId}>
          <div className='song-info'>
            <p style={{marginBottom:'5px'}}>{item.trackName}</p>
            <label>
              <input className='checkbox' type="checkbox" name={item.trackName} onChange={handleChange}/>
              {favSongList.some((song)=>item.trackId===song.trackId) ?
                <img src="../src/images/checked_heart.png" alt="favorito" />
                :
                <img src="../src/images/empty_heart.png" alt="favorito" />
              }
            </label>
          </div>
          <audio className='song-card' src={item.previewUrl} controls>
            <track kind="audio/mp3" />
            O seu navegador não suporta o elemento{" "} <code>audio</code>.
          </audio>
          </div>
        ))
      }
    </div>
  )
}

export default MusicCard