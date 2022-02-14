import Image from 'next/image'
import styles from '../../styles/Home.module.css'

function Footer() {
    return <footer className={styles.footer}>
        <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
        >
            Kildekode{' '}
            <span className={styles.logo}>
                <Image src="/github.png" alt="Vercel Logo" width={72} height={16} />
            </span>
        </a>

        <a
            href="mailto:@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
        >
            Kontakt{' '}
            <span className={styles.logo}>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
        </a>
    </footer>
}

export default Footer
