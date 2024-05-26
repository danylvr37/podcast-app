import { BackButton } from '../../components/back-button/back-button.component'
import './episode-track.styles.css'

export const EpisodeTrack = ({ episode, podcastId, description, podcast }) => {
  return (
    <>
      <BackButton path={`/podcast/${podcastId}`} state={description, podcast, episode} />
      <h1>{episode?.trackName}</h1>
      <p>{episode?.description}</p>
      <div className='audio-control'>
        <audio controls controlsList='nodownload noplaybackrate' src={episode?.episodeUrl} type={episode?.episodeContentType + '/' + episode?.episodeFileExtension}>
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  )
}
