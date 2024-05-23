import { Navbar } from '../../components/navbar.component'
import { MainView } from '../../components/main-view.component'
import './home.styles.css'

export const Home = () => {
  return (
    <>
      <main>
        <section className='search-container'>
          <Navbar />
        </section>
        <section>
          <MainView />
        </section>
      </main>
    </>
  )
}
