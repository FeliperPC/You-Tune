// import { NavLink } from 'react-router-dom'
import './style.css'
import { IoIosSearch } from "react-icons/io";
import { FaRegStar,FaRegUser } from "react-icons/fa";
function Aside (){
  const user = JSON.parse(localStorage.getItem('user'));
  
  return(
    <div className='aside'>
      <img className='aside-logo' src="src/images/you-tune-logo.png" alt="" />
      <ul className='menu-list'>
        <li><IoIosSearch/>Pesquisar</li>
        <li><FaRegStar/>Favoritas</li>
        <li><FaRegUser/>Perfil</li>
      </ul>
      <div className='aside-profile'>
        <img src="" alt="" />
        <span>{user.name}</span>
      </div>
    </div>
  )
}

export default Aside