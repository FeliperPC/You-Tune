import './style.css'
import { SongType } from '../../types'

type MusicCardProps ={
  songs : SongType[]
}

function MusicCard({songs}:MusicCardProps){  
  console.log(songs);
  
  return(
    <section>
    <h1 className='title'>Músicas</h1>
    <div className="song-list">
      {songs && 
        songs.map((item)=>(
          <div className="song-box" key={item.trackId}>
          <p style={{marginBottom:'5px'}}>{item.trackName}</p>
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