import { sources } from "./modules/_sources"
import cryptoJs from 'crypto-js'
import Parser from "rss-parser"
let parser = new Parser()

export default async function validateAnswer(req, res) {
    const encryptedTitle = (req.query.encryptedTitle || (req.body && req.body.encryptedTitle))
    const encryptionSecret = process.env.NEXT_PUBLIC_CRYOTO_SECRET
    
    // decrypt
    const bytes = cryptoJs.AES.decrypt(encryptedTitle, encryptionSecret)
    const title = bytes.toString(cryptoJs.enc.Utf8)

    let correct
    const keys = Object.keys(sources)
    for (const key of keys) {
        const feed = await parser.parseURL(sources[ key ].rssEndpoint)
        const article = feed.items.find(e => e.title === title)

        const isCorrect = typeof article !== "undefined"

        if (isCorrect) {
            correct = key
        }
    }
    

    res.status(200).json(
        {
            // guess: guess,
            title: title,
            correct: correct
        }
    )
}