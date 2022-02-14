import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Footer from './components/footer'
import Frontpage from './components/frontpage'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ukjent Kilde</title>
        <meta name="description" content="Gjett nyhetskilden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Frontpage />

      <Footer />
    </div>
  )
}
