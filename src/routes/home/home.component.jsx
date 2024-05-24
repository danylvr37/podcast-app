import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SearchBox } from '../../components/search-box.component'
import { PodcastCard } from '../../components/podcast-card.component'
import { getFromLocalStorage, saveToLocalStorage } from '../../hooks/useLocalStorage'
import './home.styles.css'

const PODCAST_END_POINT = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'

export const Home = () => {
  const [podcasts, setPodcasts] = useState(getFromLocalStorage('podcasts'))
  const [filteredPodcasts, setFilteredPodcasts] = useState(getFromLocalStorage('podcasts'))

  useEffect(() => {
    async function getPodcasts () {
      const recoveredPodcasts = await fetch(PODCAST_END_POINT)
        .then(res => res.json())
        .catch(function (error) {
          console.log('There was a problem with the Fetch request: ' + error.message)
          return error
        })
        .then(data => data.feed.entry)

      if (recoveredPodcasts?.length > 0) {
        saveToLocalStorage('podcasts', recoveredPodcasts)
        setPodcasts(recoveredPodcasts)
        setFilteredPodcasts(recoveredPodcasts)
      }
    }

    if (!podcasts) {
      getPodcasts()
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
    <>
      <main>
        <section className='search-container'>
          <SearchBox handleChangeSearch={handleChangeSearch} />
        </section>
        <section className='podcasts'>
          <ul>
            {filteredPodcasts?.map(podcast => {
              const id = podcast.id.attributes['im:id']
              const name = podcast['im:name'].label
              const img = podcast['im:image'][2].label
              const artist = podcast['im:artist'].label
              return (
                <li key={id}>
                  <Link to={`podcast/${id}`}>
                    <PodcastCard name={name} img={img} artist={artist} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
    </>
  )
}
