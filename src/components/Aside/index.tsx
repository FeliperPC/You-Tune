// import { NavLink } from 'react-router-dom'
import './style.css'
import { IoIosSearch } from "react-icons/io";
import logo from '../../images/you-tune-logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaRegStar,FaRegUser } from 'react-icons/fa';

function Aside (){
  const userString= localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const [isImgValid,setIsImgValid] = useState(true)
  
  const navigate = useNavigate()  
  const location = useLocation()

  function handleError(){
    setIsImgValid(false)
  }

  return(
    <div className='aside'>
      <img 
        className='aside-logo' 
        src={logo} 
        alt="you-tune-logo" 
        onClick={()=>navigate('/search')}
      />
      <ul className='menu-list'>
        <li onClick={()=>navigate('/search')} 
        className={location.pathname==='/search' ? 'on-page':''}><IoIosSearch style={{marginRight:'8px' }}/>Pesquisar</li>       
        <li onClick={()=>navigate('/favorites')}
        className={location.pathname==='/favorites' ? 'on-page':''}><FaRegStar style={{marginRight:'8px'}}/>Favoritas</li>
        <li onClick={()=>navigate('/profile')} 
        className={location.pathname==='/profile' ? 'on-page':''}><FaRegUser style={{marginRight:'8px'}}/>Perfil</li>
      </ul>
      <div className='aside-profile'>
        {isImgValid ?
          <img src={user.image} className='user-img-aside' onError={handleError}/>
          :
          <img className='user-img-aside' 
            src='https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1'
            />
        }
        <span>{user.name}</span>
      </div>
    </div>
  )
}

export default Aside