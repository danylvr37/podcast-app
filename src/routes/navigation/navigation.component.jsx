import { Outlet, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadingSubject } from '../../services/loadingSubject'
import { Loading } from '../../components/loading/loading.component'

export const Navigation = () => {
  const [loading, setLoading] = useState(true)
  const [subscriptionCreated, setSubscriptionCreated] = useState(false)

  useEffect(() => {
    const subscription = loadingSubject.subscribe(isLoading => {
      setLoading(isLoading)
    })
    setSubscriptionCreated(true)
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      <header className='header'>
        <div className='navigation'>
          <Link className='nav-link' to='/'>
            <h3>Inditex Podcaster</h3>
          </Link>
        </div>
        <div className='loading'>
          {loading && <Loading />}
        </div>
      </header>
      {subscriptionCreated && <Outlet />}
    </>
  )
}
