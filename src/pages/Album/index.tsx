import { useParams } from "react-router-dom"
import Aside from "../../components/Aside"
import './style.css'
import { useEffect, useState } from "react"
import getMusics from "../../services/musicsAPI"
import { AlbumType, SongType } from "../../types"

function Album(){
  const [songs,setSongs] = useState<[AlbumType, ...SongType[]]>()
  const params = useParams()

  useEffect(()=>{
    async function getSong () {
      try{
        if(params.id){ 
          const result = await getMusics(params.id)
          setSongs(result)
        }
      } catch(error){
          console.error(error)
      }
    }
    getSong()
  },[params])

  console.log(songs);
  
  return(
    <div className="album-page">
      <Aside />
    </div>
  )
}

export default Album