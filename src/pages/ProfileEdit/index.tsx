import './style.css'
import Aside from '../../components/Aside'
import ReturnButtom from '../../components/ReturnButtom'
import { UserType } from '../../types'
import { useEffect, useState} from 'react'
import { getUser, updateUser } from '../../services/userAPI'
import { useNavigate } from 'react-router-dom'

function ProfileEdit(){
  const [userInfo,setUserInfo] = useState<UserType>()
  const [isDisabled,setDisable]=useState(true)
  
  const navigate = useNavigate()
  
  useEffect(()=>{
    async function getUserData(){
      const data = await getUser()
      if(data) setUserInfo(data)
    }
    getUserData()
  },[])
  
  function handleChange(value:string, key: keyof UserType){  
    setUserInfo((prev)=>({
      ...prev,[key]:value
    }))    
  }
  async function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault()
    if(userInfo) await updateUser(userInfo)
    navigate('/profile')
  }

  useEffect(()=>{
    if(userInfo){
      if(userInfo.name && userInfo.image && userInfo.description && userInfo.email) {
        setDisable(false)
      } else{
        setDisable(true)
      }
    }
  },[userInfo])
  return(
    <div className="profile-edit-page">
      <Aside/>
      <div className="edit-profile-main">
        <div className="top-bar">
          <ReturnButtom/>
        </div>
          {userInfo?.image ?
            <img className='profile-img' src={userInfo.image} alt="" />
            :
            <img className='profile-img' 
              src='https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1' alt="" 
            />
          }
          <img className='profile-img'/>
          <input 
            type="text" 
            className='edit-form-input' 
            id='img-input' onChange={({target})=>handleChange(target.value,'image')}
            value={userInfo?.image}
          />
          <form className='form-view'>
            <div className='label-container'>
              <h2>Nome</h2>
              <p className='profile-data'>Fique a vontade para usar seu nome social</p>
              <input type="text" 
                className='edit-form-input' 
                onChange={({target})=>handleChange(target.value,'name')}
                value={userInfo?.name}
              />
            </div>
            <div className='label-container'>
              <h2>Email</h2>
              <p className='profile-data'>Escreva aqui seu melhor email</p>
              <input type="text" 
                className='edit-form-input' 
                onChange={({target})=>handleChange(target.value,'email')}
                value={userInfo?.email}
              />
            </div>
            <div className='label-container'>
              <h2>Descrição</h2>
              <p className='profile-data'>Escreva aqui um pouco sobre você</p>
              <input type="text" 
                className='edit-form-input' 
                onChange={({target})=>handleChange(target.value,'description')}
                value={userInfo?.description}
              />
            </div>
            <br />  
            <button
              disabled={isDisabled}
              className='edit-profile-btn'
              onClick={(e)=>handleClick(e)}
              >Enviar
            </button>
          </form>
      </div>
    </div>
  )
}

export default ProfileEdit