import styles from '../../styles/Home.module.css'

function Frontpage({language}) {
  const content = {
    title: {
      no: "Ukjent Kilde",
      en: "Unknown Source"  
    },
    description1: {
      no: "Les aktuelle overskrifter fra nyhetene og gjett avisen!",
      en: "Guess the publisher of the latest top headlines!" 
    },
    description2: {
      no: "Hvor uavhengige er egentlig de norske mediene?",
      en: "How biased is the news?" 
    },

    play: {
      no: "Spill",
      en: "Play"
    },
    challenge: {
      no: "Tar du utfordringen?",
      en: "Do you take the challenge?"
    },

    leaderboard: {
      no: "Se topplisten",
      en: "Leaderboard"
    },
    howmany: {
      no: "Hvor mange klarte du å gjette riktig?",
      en: "How many did you manage to guess correctly?"
    },

    sourcecode: {
      no: "Kildekode",
      en: "Source Code"
    },
    opensource: {
      no: "Ukjent Kilde har åpen kildekode.",
      en: "Unknown Source is open source."
    },
  }

  return <main className={styles.main}>
    <h1 className={styles.title}>
      {content.title[language]}
    </h1>

    <p className={styles.description}>
      {content.description1[language]} <br></br>
      {content.description2[language]}
    </p>

    <div className={styles.grid}>
      <a href="#spill" className={styles.card}>
        <h2>{content.play[language]} &rarr;</h2>
        <p>{content.challenge[language]}<br></br><br></br></p>
      </a>

      <a href="#toppliste" className={styles.card}>
        <h2>{content.leaderboard[language]} &rarr;</h2>
        <p>{content.howmany[language]}</p>
      </a>

      <a
        href="https://github.com/Sharpness-B/unknown-source/"
        className={styles.card}
        target="_blank"
        rel="noreferrer"
      >
        <h2>{content.sourcecode[language]} &rarr;</h2>
        <p>{content.opensource[language]}</p>
      </a>

      {/* <a
        href="mailto:@gmail.com"
        className={styles.card}
      >
        <h2>Kontakt &rarr;</h2>
        <p>
          Instantly deploy your Next.js site to a public URL with Vercel.
        </p>
      </a> */}
    </div>
  </main>
}

export default Frontpage
