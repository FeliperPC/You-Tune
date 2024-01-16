import { useEffect, useState } from "react"
import { HtmlElementType } from "../../types"
import { createUser } from "../../services/userAPI"
import Loading from "./Loading"

function Login() {
  const [username, setUsername] = useState<string>('')
  const [enable,setEnable]= useState(true)
  const [loading,setLoading] = useState(false)
  

  function handleChange(event : HtmlElementType){
    setUsername(event.target.value)
  }
  
  const saveUser = async ()=>{
    setLoading(true)
    await createUser({name:username})
    setLoading(false)
  }

  useEffect(()=>{
    if(username.length>2){
      setEnable(false)
    } else{
      setEnable(true)
    }
  },[username])


  return(
    <div className="login">
      {!loading ? 
      <form>
        <label> Digite seu nome : 
          <input 
            type="text" 
            onChange={handleChange}/>
        </label>
        <button 
          disabled={enable}
          onClick={saveUser}
        >
          Entrar
        </button>
      </form>
      :
      <Loading />
      }
    </div>
  )
}

export default Login