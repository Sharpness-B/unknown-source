import styles from '../../styles/QuizSwitch.module.css'
import homeStyles from '../../styles/Home.module.css'
import { sources } from '../api/modules/_sources'

function QuizSwitch({quiz, setQuiz, language, setLanguage}) {
    const alternatives = Object.keys(sources)

    const content = {
        description: {
            no: "Endre kategori",
            en: "Change category"
        }
    }

    console.log(quiz)

    return <div className={styles.container}>
        <ul className={styles.quizswitch}>

            {alternatives.map((source, index) => 
                <li className={`${homeStyles.card} ${styles.card}`}
                    key={index} 
                    onClick={()=>{
                        setQuiz(source)
                        setLanguage(sources[source].language)}
                }>{source}</li>
            )}    

        </ul>
        <p className={styles.p}>{content.description[language]}</p>
    </div>
}

export default QuizSwitch
