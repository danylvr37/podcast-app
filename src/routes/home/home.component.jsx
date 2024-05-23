import { SearchBox } from '../../components/search-box.component'
import { useState, useEffect } from 'react'
import './home.styles.css'
import { Link } from 'react-router-dom'

const PODCAST_END_POINT = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'

export const Home = () => {
  const [podcasts, setPodcasts] = useState([])
  const [filteredPodcasts, setFilteredPodcasts] = useState([])

  useEffect(() => {
    getPodcasts()
  }, [])

  async function getPodcasts () {
    const recoveredPodcasts = await fetch(PODCAST_END_POINT)
      .then(res => res.json())
      .catch(function (error) {
        console.log('There was a problem with the Fetch request: ' + error.message)
        return error
      })
      .then(data => (data.feed.entry))

    if (recoveredPodcasts.length > 0) {
      setPodcasts(recoveredPodcasts)
      setFilteredPodcasts(recoveredPodcasts)
    }
  }

  function handleChangeSearch (event) {
    const search = event.target.value.toLowerCase()
    const filter = podcasts.filter((podcast) => {
      return podcast['im:name'].label.toLowerCase().includes(search)
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
            {
            filteredPodcasts.map(podcast => {
              const id = podcast.id.attributes['im:id']
              const name = podcast['im:name'].label
              const img = podcast['im:image'][2].label
              const artist = podcast['im:artist'].label
              return (
                <li key={id}>
                  <Link to={`podcast/${id}`}>
                    <div className='podcast-container'>
                      <img
                        src={img}
                        alt={name}
                      />
                      <div>
                        <strong>{name}</strong>
                      </div>
                      <div>{artist}</div>
                    </div>
                  </Link>
                </li>
              )
            })
         }
          </ul>
        </section>
      </main>
    </>
  )
}
