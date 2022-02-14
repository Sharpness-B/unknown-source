import styles from '../../styles/Game.module.css'
import homeStyles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react'

async function fetchQuestion() {
    const response = await fetch("api/get-question")
    const question = await response.json()
    return question
}

async function checkAnswer(title, guess) {
    const response = await fetch("api/validate-answer", {
        method: "POST", 
        body: JSON.stringify( {
            title: title, 
            // guess: guess
        } ),
        headers: {'Content-Type': 'application/json'},
    })

    const result = await response.json()
    return result
}

function Game() {
    const [gameState, SetGameState] = useState("game")
    const [selected, SetSelected] = useState("")

    const [score, SetScore] = useState(1)
    const [alternatives, SetAlternatives] = useState([])
    const [question, SetQuestion] = useState("")

    useEffect(() => {
        fetchQuestion().then(question => {
            SetQuestion(question.title)
            SetAlternatives(question.alternatives)
        })
    }, [])

    function handleClick(guess) {
        checkAnswer(question, guess)
            .then(result => console.log(result))
    }

    return <article id={"spill"} className={styles.article}> 

        <div>
            <h2 className={styles}>{question}</h2>
            <code className={homeStyles.code}>{question ? "Hvem har publisert denne overskriften?" : null}</code>
            <div className={styles.sources}>
                { alternatives.map((source, index) => <div key={index} className={homeStyles.card} onClick={()=>handleClick(source)}>{source}</div>) }
            </div>
        </div>
        
    </article>
}

export default Game
