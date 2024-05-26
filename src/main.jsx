import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRouter } from './config/routes.config'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppRouter />
)
