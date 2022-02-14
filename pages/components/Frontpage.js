import styles from '../../styles/Home.module.css'

function Frontpage() {
  return <main className={styles.main}>
    <h1 className={styles.title}>
      Ukjent Kilde
    </h1>

    <p className={styles.description}>
      Les aktuelle overskrifter fra nyhetene og gjett avisen! <br></br>
      Hvor uavhengige er egentlig de norske mediene?
    </p>

    <div className={styles.grid}>
      <a href="#spill" className={styles.card}>
        <h2>Spill &rarr;</h2>
        <p>Tar du utfordringen?<br></br><br></br></p>
      </a>

      <a href="#toppscore" className={styles.card}>
        <h2>Se topplisten &rarr;</h2>
        <p>Hvor mange klarte du å gjette riktig?</p>
      </a>

      <a
        href="https://github.com/vercel/next.js/tree/canary/examples"
        className={styles.card}
      >
        <h2>Kildekode &rarr;</h2>
        <p>Ukjent Kilde har åpen kildekode.</p>
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
