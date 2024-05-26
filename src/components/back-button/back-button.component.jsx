import './back-button.styles.css'
import { useNavigate } from 'react-router-dom'

export const BackButton = ({ path, state }) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(path, { state })
  }

  return (
    <button className='back-button' onClick={() => goBack()}>BACK</button>
  )
}
