import { useLocation, useParams } from 'react-router-dom'
import { PodcastCard } from '../../components/podcast-card/podcast-card.component'
import { useEffect } from 'react'
import { loadingSubject } from '../../services/loadingSubject'
import { EpisodeTrack } from '../../components/episode-track/episode-track.component'

export const EpisodeDetail = () => {
  const { state: { description, podcast, episode } } = useLocation()
  const { podcastId } = useParams()

  useEffect(() => {
    loadingSubject.next(false)
  }, [])

  return (
    <main className='episode-detail'>
      <section>
        <PodcastCard name={podcast?.trackName} img={podcast?.artworkUrl600} artist={podcast?.artistName} description={description} type='details' />
      </section>
      <section className='episode-track'>
        <EpisodeTrack episode={episode} podcastId={podcastId} description={description} podcast={podcast} />
      </section>
    </main>
  )
}
