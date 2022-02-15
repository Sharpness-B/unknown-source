import styles from '../../styles/Game.module.css'
import homeStyles from '../../styles/Home.module.css'
import { useState, useEffect, createRef } from 'react'

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

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

    const [score, SetScore] = useState(0)
    const [round, SetRound] = useState(0)

    const [alternatives, SetAlternatives] = useState([])
    const [question, SetQuestion] = useState("")

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
        fetchQuestion().then(question => {
            SetQuestion(question.title)
            SetAlternatives(question.alternatives)
        })
    }, [round])

    function handleClick(guess) {
        if (gameState !== "game") return
        SetGameState("validating")

        let correctRef
        checkAnswer(question, guess)
            .then(result => {
                correctRef = elRefs[ alternatives.indexOf(result.correct) ]
                
                // update score
                if (result.correct === guess) {
                    SetScore(s => s+1)
                }

                // hilight correct
                correctRef.current.style.color       = "#00b500"
                correctRef.current.style.borderColor = "#00b500"
                
                delay(1000).then(() => {
                    // remove hilighting
                    correctRef.current.style.color       = null
                    correctRef.current.style.borderColor = null
                    
                    // game logic
                    if (result.correct === guess) {
                        SetRound(s => s+1)
                        SetGameState("game")
                    }
                    else {
                        SetGameState("finished")
                    }

                })
            })
    }

    return <article id={"spill"} className={styles.article}> 
        <code className={styles.score}>Score: {score}</code>
        
        {gameState !== "finished" ?
            <>
                <div>
                    <h2>{question}</h2>
                    <code className={homeStyles.code}>{question ? "Hvem har publisert denne overskriften?" : null}</code>
                    <div className={styles.sources}>
                        { alternatives.map((source, index) => 
                            <div 
                                key={index} 
                                ref={elRefs[index]} 
                                className={homeStyles.card} 
                                onClick={()=>handleClick(source)}>{source}
                            </div>) }
                    </div>
                </div>
            </>
        : 
            null
        }
        
    </article>
}

export default Game
