import { useEffect, useState } from "react"
import { HtmlElementType } from "../../types"
import { createUser } from "../../services/userAPI"
import Loading from "../Loading"
import './style.css'
import { useNavigate } from "react-router-dom"
import Logo from '../../images/you-tune-logo.png'

function Login() {
  const [username, setUsername] = useState<string>('')
  const [enable,setEnable]= useState(true)
  const [loading,setLoading] = useState(false)
  
  const navigate = useNavigate()

  function handleChange(event : HtmlElementType){
    setUsername(event.target.value)
  }
  
  const saveUser = async ()=>{
    setLoading(true)
    await createUser({name:username})
    setLoading(false)
    navigate('/search')
  }

  useEffect(()=>{
    if(username.length>2){
      setEnable(false)
    } else{
      setEnable(true)
    }
  },[username])


  return(
    <div>
      {!loading ? 
      <div className="login">
        <form className="form-login">
          <h3>Qual seu nome ?</h3>
        <input 
          type="text" 
          onChange={handleChange}
          placeholder=". . ."
          />
        <button 
          disabled={enable}
          onClick={saveUser}
        >
          Entrar
        </button>
      </form>
        <img 
          className='login-logo' 
          src={Logo} 
          alt="you-tune-logo" 
        />
      </div>
      :
      <div style={{color:'white'}}>
        <Loading />
      </div>
      }
    </div>
  )
}

export default Login