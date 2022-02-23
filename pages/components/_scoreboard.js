import styles from '../../styles/Scoreboard.module.css'
import gameStyles from '../../styles/Game.module.css'
import homeStyles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react'

function Scoreboard({quiz, language}) {
    const [top10, setTop10]   = useState([])
    const [top24h, setTop24h] = useState([])

    const [page, setPage] = useState("Top 10")

    const controller = {
        "Top 10": top10,
        "Top 10 siste døgn": top24h
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
            <button className={`${gameStyles.button} ${styles.button} ${styles.orange}`} onClick={()=>setUpdate(n=>n+1)}>Oppdater</button>
            {Object.keys(controller).map((data, index) => <button className={`${gameStyles.button} ${styles.button}`} key={index} onClick={()=>setPage(data)}>{data}</button>)}
        </div>

        <table>
            <thead>
                <tr>
                    <th>Brukernavn</th>
                    <th>Poeng</th>
                </tr>
            </thead>

            <tbody>
                { controller[page].map((data, index) => 
                    <tr key={index}>
                        <td>{data.username}</td>
                        <td>{data.score}</td>
                    </tr>) }
            </tbody>
        </table>
    </article>
}

export default Scoreboard