import Head from 'next/head'
import styles from '../styles/Home.module.css'

import QuizSwitch from './components/_QuizSwitch'
import Frontpage from './components/_Frontpage'
import Game from './components/_game'
import Scoreboard from './components/_scoreboard'
import Footer from './components/_Footer'

import { useState } from 'react'

export default function Home() {
  const [quiz, setQuiz] = useState("USA")
  const [language, setLanguage] = useState("no")

  return (
    <div className={styles.container}>
      <Head>
        <title>Ukjent Kilde</title>
        <meta name="description" content="Gjett nyhetskilden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QuizSwitch quiz={quiz} setQuiz={setQuiz} language={language} setLanguage={setLanguage} />
      <Frontpage />
      <Game quiz={quiz} />
      <Scoreboard quiz={quiz} />
      <Footer />
    </div>
  )
}
