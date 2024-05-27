import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { PodcastCard } from '../../components/podcast-card/podcast-card.component'
import { PodcastList } from '../../components/podcast-list/podcast-list.component'
import { loadingSubject } from '../../services/loadingSubject'
import { getFromLocalStorage, saveToLocalStorage } from '../../hooks/useLocalStorage'

export const PodcastDetail = () => {
  const { podcastId } = useParams()
  const [podcast, setPodcast] = useState(getFromLocalStorage(podcastId))
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(false)
  const { state: { description } } = useLocation()

  const PODCAST_END_POINT = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
  const ALL_ORIGIN = 'https://api.allorigins.win/get?url=' + encodeURIComponent(PODCAST_END_POINT)

  useEffect(() => {
    async function getPodcastUrl () {
      setLoading(true)
      loadingSubject.next(true)
      try {
        const response = await fetch(ALL_ORIGIN)
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText)
        }
        const data = await response.json()
        const jsonData = JSON.parse(data.contents)

        if (jsonData?.results?.length > 0) {
          saveToLocalStorage(podcastId, jsonData.results[0])
          setPodcast(jsonData.results[0])
          setEpisodes(jsonData.results.slice(1))
        }
      } catch (error) {
        console.log('There was a problem with the Fetch request: ' + error.message)
      } finally {
        setLoading(false)
        loadingSubject.next(false)
      }
    }

    if (!podcast) {
      getPodcastUrl()
    } else {
      loadingSubject.next(false)
    }

    const intervalId = setInterval(() => {
      const storedPodcasts = getFromLocalStorage('podcasts')
      if (!storedPodcasts) {
        getPodcastUrl()
      }
    }, 86400000)

    return () => clearInterval(intervalId)
  }, [ALL_ORIGIN, podcast, podcastId])

  return (
    loading
      ? <div />
      : <main className='podcast-detail'>
        <section>
          <PodcastCard name={podcast?.trackName} img={podcast?.artworkUrl600} artist={podcast?.artistName} description={description} type='details' />
        </section>
        <section>
          <PodcastList podcastId={podcastId} description={description} episodesNumber={podcast?.trackCount} episodes={episodes} podcast={podcast} />
        </section>
      </main>
  )
}
