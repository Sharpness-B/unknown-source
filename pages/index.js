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
  const [language, setLanguage] = useState("en")

  const content = {
    title: {
      no: "Ukjent Kilde",
      en: "Unknown Source"  
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{content.title[language]}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Guess the publisher of the latest top headlines! How biased is the news? Can you differentiate them and make it to the leaderboard?" />
      </Head>

      <QuizSwitch language={language} quiz={quiz} setQuiz={setQuiz} setLanguage={setLanguage} />
      <Frontpage  language={language} />
      <Game       language={language} quiz={quiz} />
      <Scoreboard language={language} quiz={quiz} />
      <Footer />
    </div>
  )
}
