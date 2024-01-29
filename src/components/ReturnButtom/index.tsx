import { FaStepBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './style.css'

function ReturnButtom () {
  const navigate = useNavigate()
  return(
    <div className="return-container">
      <span className="return-btn" onClick={()=>navigate(-1)}>
        <FaStepBackward/>Voltar
      </span>
    </div>
  )
}

export default ReturnButtom