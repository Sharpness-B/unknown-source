import fetch from "node-fetch"

const { getFirestore, doc, getDoc, setDoc } = require('firebase/firestore')
const { initializeApp }  = require('firebase/app')
const { firebaseConfig } = require('./modules/_db')

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

String.prototype.cleanup = function() {
    // if (this.toLowerCase() === "vårin") return this.toString() // Vårin is the only name allowed containing "å"

    return this.replace(/[^\p{Number}\p{Letter}\p{Mark} ]+/gu, "");
}

export default async function submitScore(req, res) {
    const secret = process.env.RECAPTCHA_SECRET_KEY
    
    const username       = (req.query.username       || (req.body && req.body.username))
    const score          = (req.query.score          || (req.body && req.body.score))
    const recaptchaToken = (req.query.recaptchaToken || (req.body && req.body.recaptchaToken))
    const quiz           = (req.query.quiz           || (req.body && req.body.quiz))

    

    const params = `?secret=${secret}&response=${recaptchaToken}`

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify${params}`, {
        method: "POST"
    })

    const result = await response.json()
    
    // if invalid recaptcha resonse
    if (!result.success) {
        res.status(200).json(
            {error: "invalid auth"}
        )
        return
    }

    // insert score into db
    const id = recaptchaToken.substr( recaptchaToken.length - 20 )
    const body = {
        username: username.cleanup(),
        score: score,
        timestamp: new Date()
    }
    await setDoc( doc(firestore, quiz, id), body );

    res.status(200).json(
        result
    )
}