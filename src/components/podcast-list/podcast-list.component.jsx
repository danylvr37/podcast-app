import { useNavigate } from 'react-router-dom'
import './podcast-list.styles.css'
import { BackButton } from '../../components/back-button/back-button.component'

export const PodcastList = ({ podcastId, description, episodesNumber, episodes, podcast }) => {
  const navigate = useNavigate()

  const handleRowClick = (episode) => {
    navigate(`/podcast/${podcastId}/episode/${episode.trackId}`, { state: { description, podcast, episode } })
  }

  return (
    <>
      <div className='podcast-list-component-container'>
        <div className='podcasts-episodes-number'><strong>Episodes: {episodesNumber}</strong></div>
        <BackButton path='/' /* state={description, podcast, episode} */ />
        <div className='podcasts-episodes'>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {
            (episodes?.length > 0) && episodes.map(episode => {
              const date = new Date(episode.releaseDate).toLocaleDateString('es-ES')
              function duration (milliseconds) {
                let seconds = Math.floor(milliseconds / 1000)
                let minutes = Math.floor(seconds / 60)
                let hours = Math.floor(minutes / 60)

                seconds = seconds % 60
                minutes = minutes % 60
                hours = hours % 24

                seconds = padToTwoDigits(seconds)
                minutes = padToTwoDigits(minutes)
                hours = padToTwoDigits(hours)

                return `${hours}:${minutes}:${seconds}`
              }

              function padToTwoDigits (number) {
                return number.toString().padStart(2, '0')
              }

              return (
                <tr key={episode.trackId} className='tb-details' onClick={() => handleRowClick(episode)} style={{ cursor: 'pointer' }}>
                  <td>{episode.trackName}</td>
                  <td>{date}</td>
                  <td>{duration(episode.trackTimeMillis)}</td>
                </tr>
              )
            })
          }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
