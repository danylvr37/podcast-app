import { Outlet, Link } from 'react-router-dom'
import './navigation.styles.css'

export const Navigation = () => {
  return (
    <>
      <header className='header'>
        <div className='navigation'>
          <Link className='nav-link' to='/'>
            <h3>Inditex Podcaster</h3>
          </Link>
        </div>
      </header>
      <Outlet />
    </>
  )
}
