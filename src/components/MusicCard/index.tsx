import './style.css'
import { HtmlElementType, SongType } from '../../types'
import { useEffect, useState } from 'react'

type MusicCardProps ={
  songs : SongType[]
}

function MusicCard({songs}:MusicCardProps){  
  const[favoriteList,setFavoriteList]=useState<SongType[]>([])
  
  function handleChange(e:HtmlElementType){
    const song = songs.find((item)=>item.trackName === e.target.name);
    if(song){
      if(!favoriteList.includes(song)) {
        setFavoriteList([...favoriteList,song]) 
      } else{
        const updatedSongs = favoriteList.filter((item)=>item.trackName !== song.trackName)
        setFavoriteList(updatedSongs)
      }
    }
  }

  useEffect(()=>{
    console.log(favoriteList);
  },[favoriteList])

  return(
    <section>
    <h1 className='title'>Músicas</h1>
    <div className="song-list">
      {songs && 
        songs.map((item)=>(
          <div className="song-box" key={item.trackId}>
          <div className='song-info'>
            <p style={{marginBottom:'5px'}}>{item.trackName}</p>
            <label>
              <input className='checkbox' type="checkbox" name={item.trackName} onChange={handleChange}/>
              {favoriteList.includes(item) ?
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
    </section>
  )
}

export default MusicCard