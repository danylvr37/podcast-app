import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFromLocalStorage, saveToLocalStorage } from '../../hooks/useLocalStorage'
import { SearchBox } from '../../components/search-box/search-box.component'
import { PodcastCard } from '../../components/podcast-card/podcast-card.component'
import { loadingSubject } from '../../services/loadingSubject'

const PODCAST_END_POINT = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'

export const Home = () => {
  const [podcasts, setPodcasts] = useState(getFromLocalStorage('podcasts'))
  const [filteredPodcasts, setFilteredPodcasts] = useState(getFromLocalStorage('podcasts'))

  useEffect(() => {
    async function getPodcasts () {
      try {
        loadingSubject.next(true)
        const response = await fetch(PODCAST_END_POINT)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const recoveredPodcasts = data.feed.entry

        if (recoveredPodcasts?.length > 0) {
          saveToLocalStorage('podcasts', recoveredPodcasts)
          setPodcasts(recoveredPodcasts)
          setFilteredPodcasts(recoveredPodcasts)
        }
      } catch (error) {
        console.log('There was a problem with the Fetch request: ' + error.message)
      } finally {
        loadingSubject.next(false)
      }
    }

    if (!podcasts) {
      getPodcasts()
    } else {
      loadingSubject.next(false)
    }

    const intervalId = setInterval(() => {
      const storedPodcasts = getFromLocalStorage('podcasts')
      if (!storedPodcasts) {
        getPodcasts()
      }
    }, 86400000)

    return () => clearInterval(intervalId) // Limpiar el intervalo al desmontar el componente
  }, [podcasts])

  function handleChangeSearch (event) {
    const search = event.target.value.toLowerCase()
    const filter = podcasts.filter((podcast) => {
      return (
        podcast['im:name'].label.toLowerCase().includes(search) ||
        podcast['im:artist'].label.toLowerCase().includes(search)
      )
    })
    setFilteredPodcasts(filter)
  }

  return (
    !podcasts
      ? <div />
      : <main>
        <section className='search-container'>
          <SearchBox handleChangeSearch={handleChangeSearch} number={filteredPodcasts.length} />
        </section>
        <section className='podcasts'>
          <ul>
            {filteredPodcasts?.map(podcast => {
              const id = podcast.id.attributes['im:id']
              const name = podcast['im:name'].label
              const img = podcast['im:image'][2].label
              const artist = podcast['im:artist'].label
              const description = podcast.summary.label
              return (
                <li key={id}>
                  <Link to={`/podcast/${id}`} state={{ description }}>
                    <PodcastCard name={name} img={img} artist={artist} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
        </main>
  )
}
