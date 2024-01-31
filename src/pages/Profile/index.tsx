import './style.css'
import Aside from '../../components/Aside'
import ReturnButtom from '../../components/ReturnButtom'
import { useNavigate } from 'react-router-dom'
import { UserType } from '../../types'
import { useState,useEffect } from 'react'
import { getUser } from '../../services/userAPI'
import Loading from '../../components/Loading'

function Profile(){
  const navigate = useNavigate()
  const [userInfo,setUserInfo] = useState<UserType>()
  const [loading,setLoading] = useState(false)
  const [isImgValid,setIsImgValid] = useState(true)

  useEffect(()=>{
    async function getUserInfo(){
      setLoading(true)
      const info = await getUser()
      setLoading(false)
      setUserInfo(info)
    }
    getUserInfo()
  },[])

  function handleError(){
    setIsImgValid(false)
  }

  return(
    <div className="profile-page">
      <Aside />
      <div className='profile-main'>
        <div className="top-bar">
          <ReturnButtom/>
        </div>
        <div className="profile-main">
          {loading ?
          <div className="loading-center">
            <Loading />
          </div>
            :
          <div>
            {isImgValid ?          
              <img className='profile-img' src={userInfo?.image} onError={handleError} />
              :
              <img className='profile-img' 
                src='https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1' alt="" 
              />
            }
            <div className="form-view">
              <div style={{marginBottom:'20px'}}>
                <h2>Nome</h2>
                {userInfo?.name ?
                  <p className='profile-data'>{userInfo?.name}</p> 
                  :
                  <p className='profile-data'>...</p> 
                }
              </div>
              <div style={{margin:'20px 0'}}>
                <h2>Email</h2>
                {userInfo?.email ?
                  <p className='profile-data'>{userInfo?.email}</p> 
                  :
                  <p className='profile-data'>. . .</p> 
                }
              </div>
              <div style={{margin:'20px 0'}}>
                <h2>Descrição</h2>
                {userInfo?.description ?
                  <p className='profile-data'>{userInfo.description}</p>
                  :
                  <p className='profile-data'>. . .</p>
                }
              </div>
              <button 
                type="button"
                onClick={()=>navigate('/profile/edit')}
                className='edit-profile-btn'
              > Editar Perfil
              </button>
            </div>
          </div>
            }
        </div>
      </div>
    </div>
  )
}

export default Profile