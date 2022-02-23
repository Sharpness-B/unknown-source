import styles from '../../styles/Game.module.css'
import homeStyles from '../../styles/Home.module.css'
import { useState, useEffect, createRef, useRef } from 'react'
import cryptoJs from 'crypto-js'
import Script from 'next/script'
import ReCAPTCHA from "react-google-recaptcha"

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function fetchQuestion(quiz) {
    const response = await fetch("api/get-question", {
        method: "POST", 
        body: JSON.stringify( {
            quiz: quiz
        } ),
        headers: {'Content-Type': 'application/json'},
    })
    const question = await response.json()
    return question
}

async function checkAnswer(title, quiz) {
    const encryptionSecret = process.env.NEXT_PUBLIC_CRYOTO_SECRET
    const encryptedTitle = cryptoJs.AES.encrypt(title, encryptionSecret).toString()

    const response = await fetch("api/validate-answer", {
        method: "POST", 
        body: JSON.stringify( {
            encryptedTitle: encryptedTitle,
            quiz: quiz
        } ),
        headers: {'Content-Type': 'application/json'},
    })

    const result = await response.json()
    return result
}

async function postScore(username, score, recaptchaToken, quiz) {
    const response = await fetch("api/submit-score", {
        method: "POST", 
        body: JSON.stringify( {
            username: username,
            score: score,
            recaptchaToken: recaptchaToken,
            quiz: quiz
        } ),
        headers: {'Content-Type': 'application/json'},
    })

    const result = await response.json()
    return result
}

function Game({quiz, language}) {
    <Script src="https://www.google.com/recaptcha/api.js" async></Script>
    const recaptchaRef = useRef();
    const [recaptchaToken, SetRecaptchaToken] = useState("")
    const [username, SetUsername] = useState("")

    const [gameState, SetGameState] = useState("game")

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
        fetchQuestion(quiz).then(question => {
            SetQuestion(question.title)
            SetAlternatives(question.alternatives)
        })
    }, [round])

    function handleClick(guess) {
        if (gameState !== "game") return
        SetGameState("validating")

        let correctRef
        checkAnswer(question, quiz)
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

    function resetGame() {
        SetScore(0)
        SetRound(r => r+1)
        SetGameState("game")
        // location.href = "#spill";
    }

    // reset on new quiz choice
    useEffect(resetGame, [quiz])

    async function updateRecaptchaToken() {
        const token = await recaptchaRef.current.getValue();
        SetRecaptchaToken(token)
    }

    function handleSubmit() {
        if (!recaptchaToken) {
            alert("Er du en robot?")
            return
        }
        if (!username) {
            alert("Velg et brukernavn!")
            return
        }

        postScore(username, score, recaptchaToken, quiz)

        location.href = "#toppliste"
    }


    const content = {
        score: {
            no: "Poeng",
            en: "Score"
        },
        who: {
            no: "Hvem har publisert denne overskriften?",
            en: "Who published this headline?"
        },

        youGuessed: {
            no: "Du gjettet",
            en: "You guessed"
        },
        singularcorretinarow: {
            no: "riktig på rad!",
            en: "correct in a row!"
        },
        pluralcorretinarow: {
            no: "riktige på rad!",
            en: "correct in a row!"
        },

        publish: {
            no: "Publiser resultatet eller prøv igjen.",
            en: "Publish the result or try again."
        },

        again: {
            no: "Spill igjen",
            en: "Play again"
        },

        username: {
            no: "brukernavn",
            en: "username"
        },
        submit: {
            no: "Send",
            en: "Submit"
        },
    }

    return <article id={"spill"} className={homeStyles.main}> 
        
        {gameState !== "finished" ?
            <div>
                <code className={homeStyles.code}>{!question ? null : `${content.score[language]}: ${score}`}</code>
                <h2>{question}</h2>
                <code className={homeStyles.code}>{!question ? null : content.who[language]}</code>
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
        : 
            <div>
                <h2>{content.youGuessed[language]} {score} {score !== 1 ? content.pluralcorretinarow[language] : content.singularcorretinarow[language]}</h2> {/*  riktig{score !== 1 ? "e" : null} på rad! */}
                
                <code className={homeStyles.code}>{content.publish[language]}</code>

                <div className={styles.sources}>

                    <div className={homeStyles.card} onClick={()=>resetGame()}>{content.again[language]}</div>
                    
                    <div className={`${homeStyles.card} ${styles.cardSubmit}`}>
                        <input className={styles.input} placeholder={content.username[language]} type={"text"} onChange={(evt)=>SetUsername(evt.target.value)}/> 
                        
                        <ReCAPTCHA
                            size={"compact"}
                            ref={recaptchaRef}
                            onChange={()=>updateRecaptchaToken()}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        />
                        
                        <button className={styles.button} onClick={()=>handleSubmit()}>{content.submit[language]}</button>
                    </div>

                </div>
            </div>
        }
        
    </article>
}

export default Game
