import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Frontpage from './components/frontpage'
import Game from './components/game'
import Scoreboard from './components/scoreboard'
import Footer from './components/footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ukjent Kilde</title>
        <meta name="description" content="Gjett nyhetskilden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Frontpage />
      <Game />
      <Scoreboard />
      <Footer />
    </div>
  )
}
