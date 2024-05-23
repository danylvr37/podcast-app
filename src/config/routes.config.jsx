import { createBrowserRouter } from 'react-router-dom'
import { Navigation } from '../routes/navigation/navigation.component'
import ErrorPage from '../routes/error-page/error-page.component'
import { Home } from '../routes/home/home.component'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: '/',
        element: <Home />
      }
    ]
  }
])
