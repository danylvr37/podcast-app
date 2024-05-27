import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from '../routes/navigation/navigation.component'
import ErrorPage from '../routes/error-page/error-page.component'
import { Home } from '../routes/home/home.component'
import { PodcastDetail } from '../routes/podcast-detail/podcast-detail.component'
import { EpisodeDetail } from '../routes/episode-detail/episode-detail.component'

export const AppRouter = () => (
  <Router baseName={import.meta.env.BASE_URL}>
    <Routes>
      <Route
        path='/'
        element={<Navigation />}
        errorElement={<ErrorPage />}
      >
        <Route index element={<Home />} />
        <Route
          path='podcast/:podcastId'
          element={<PodcastDetail />}
        />
        <Route
          path='podcast/:podcastId/episode/:episodeId'
          element={<EpisodeDetail />}
        />
      </Route>
    </Routes>
  </Router>
)
