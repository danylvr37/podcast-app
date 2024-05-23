import { useRouteError } from 'react-router-dom'
import './error-page.styles.css'

export default function ErrorPage () {
  const error = useRouteError()

  return (
    <div id='error-page'>
      <div id='error-page-content'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  )
}
