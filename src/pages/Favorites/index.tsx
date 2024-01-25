import './style.css'
import Aside from '../../components/Aside'

function Favorites() {
  return(
    <div className="favorite-page">
      <Aside/>
      <div className="search-top-bar">
        <h1 style={{color:'white'}}>Músicas Favoritas</h1>
      </div>
    </div>
  )
}

export default Favorites