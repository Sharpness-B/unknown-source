import styles from '../../styles/Scoreboard.module.css'
import gameStyles from '../../styles/Game.module.css'
import homeStyles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react'

function Scoreboard({quiz, language}) {
    const content = {
        update: {
            no: "Oppdater",
            en: "Update"
        },
        top10: {
            no: "Top 10",
            en: "Top 10"
        },
        top24h: {
            no: "Top 10 siste døgn",
            en: "Top 10 last 24 hours"
        },
        username: {
            no: "Brukernavn",
            en: "Username"
        },
        score: {
            no: "Poeng",
            en: "Score"
        }
    }

    const [top10, setTop10]   = useState([])
    const [top24h, setTop24h] = useState([])

    const [page, setPage] = useState("Top 10")

    const controller = {
        "Top 10":            {data: top10,  text: content.top10[language]},
        "Top 10 siste døgn": {data: top24h, text: content.top24h[language]}
    }



    const [update, setUpdate] = useState(0)
    useEffect(() => {
        fetch("api/get-record-list", {
            method: "POST", 
            body: JSON.stringify( {
                quiz: quiz
            } ),
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then(results => {
                setTop10(results.top10)
                setTop24h(results.top10last24h)
            })
    }, [update, language]) 

    useEffect(() => {
        setInterval( ()=>setUpdate(n=>n+1), 15000)
    }, [])
    

    
    return <article id={"toppliste"} className={homeStyles.main}>
        <div>
            <button className={`${gameStyles.button} ${styles.button} ${styles.orange}`} onClick={()=>setUpdate(n=>n+1)}>{content.update[language]}</button>
            {Object.keys(controller).map((data, index) => <button className={`${gameStyles.button} ${styles.button}`} key={index} onClick={()=>setPage(data)}>{controller[data].text}</button>)}
        </div>

        <table>
            <thead>
                <tr>
                    <th>{content.username[language]}</th>
                    <th>{content.score[language]}</th>
                </tr>
            </thead>

            <tbody>
                { controller[page].data.map((data, index) => 
                    <tr key={index}>
                        <td>{data.username}</td>
                        <td>{data.score}</td>
                    </tr>) }
            </tbody>
        </table>
    </article>
}

export default Scoreboard