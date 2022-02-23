import styles from '../../styles/QuizSwitch.module.css'
import homeStyles from '../../styles/Home.module.css'
import { sources } from '../api/modules/_sources'
import { createRef, useState, useEffect } from 'react'

function QuizSwitch({quiz, setQuiz, language, setLanguage}) {    
    const content = {
        description: {
            no: "Endre kategori",
            en: "Change category"
        }
    }

    const alternatives = Object.keys(sources)

    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        // add or remove refs
        setElRefs((elRefs) =>
          Array(alternatives.length)
            .fill()
            .map((_, i) => elRefs[i] || createRef()),
        );
    }, [alternatives.length]);


    useEffect(() => {
        elRefs.forEach(langRef => {
            if (!langRef) return;

            langRef.current.style.color       = null
            langRef.current.style.borderColor = null    
        })

        const currentLangRef = elRefs[ alternatives.indexOf(quiz) ]
        
        if (!currentLangRef) return;

        currentLangRef.current.style.color       = "#00b500"
        currentLangRef.current.style.borderColor = "#00b500"    
    }, [quiz, alternatives])

    return <div className={styles.container}>
        <ul className={styles.quizswitch}>

            {alternatives.map((source, index) => 
                <li className={`${homeStyles.card} ${styles.card}`}
                    key={index} 
                    ref={elRefs[index]} 
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
