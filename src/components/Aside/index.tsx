// import { NavLink } from 'react-router-dom'
import './style.css'
import { IoIosSearch } from "react-icons/io";
import { FaRegStar,FaRegUser,FaUserCircle } from "react-icons/fa";
import logo from '../../images/you-tune-logo.png';
import { useNavigate } from 'react-router-dom';

function Aside (){
  
  const userString= localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  const navigate = useNavigate()  

  return(
    <div className='aside'>
      <img className='aside-logo' src={logo} alt="" />
      <ul className='menu-list'>
        <li onClick={()=>navigate('/search')}><IoIosSearch style={{marginRight:'8px'}}/>Pesquisar</li>
        <li onClick={()=>navigate('/favorites')}><FaRegStar style={{marginRight:'8px'}}/>Favoritas</li>
        <li><FaRegUser style={{marginRight:'8px'}}/>Perfil</li>
      </ul>
      <div className='aside-profile'>
        <img src="" alt="" />
        <FaUserCircle style={{marginRight:'8px'}}/>
        <span>{user.name}</span>
      </div>
    </div>
  )
}

export default Aside