import './style.css'
import { BiLoaderCircle } from "react-icons/bi";
function Loading(){
  return(
    <div className="loading">
      <h1>Carregando <BiLoaderCircle/></h1>
    </div>
  )
}

export default Loading