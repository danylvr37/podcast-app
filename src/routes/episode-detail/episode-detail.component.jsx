import { useLocation } from 'react-router-dom'
import { PodcastCard } from '../../components/podcast-card/podcast-card.component'
import './episode-detail.styles.css'
import { useEffect } from 'react'
import { loadingSubject } from '../../services/loadingSubject'

export const EpisodeDetail = () => {
  const { state: { description, podcast, episode } } = useLocation()

  useEffect(() => {
    loadingSubject.next(false)
  }, [])

  return (
    <main className='episode-detail'>
      <section>
        <PodcastCard name={podcast?.trackName} img={podcast?.artworkUrl600} artist={podcast?.artistName} description={description} type='details' />
      </section>
      <section className='episode-track'>
        <h1>{episode.trackName}</h1>
        <p>{episode.description}</p>
        <audio controls controlsList='nodownload noplaybackrate' src={episode?.episodeUrl} type={episode.episodeContentType + '/' + episode.episodeFileExtension}>
          Your browser does not support the audio element.
        </audio>
      </section>
    </main>
  )
}
