import { Link } from "react-router-dom"
import './style.css'
import { GiSoundOff } from "react-icons/gi";

function NotFound(){
  return (
    <div className="not-found-page">
      <GiSoundOff className="not-found-icon"/>
      <h1 className="not-found-title">Ops ...</h1>
      <p>Esta página não existe</p>
      <span>
        Voltar a <Link to={'/search'}>página inicial</Link> ?
      </span>
    </div>
  )
}

export default NotFound