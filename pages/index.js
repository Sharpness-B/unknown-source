import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Frontpage from './components/_Frontpage'
import Game from './components/_game'
import Scoreboard from './components/_scoreboard'
import Footer from './components/_Footer'

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
