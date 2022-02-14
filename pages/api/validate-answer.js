import { sources } from "./modules/sources"
import Parser from "rss-parser"
let parser = new Parser()

export default async function validateAnswer(req, res) {
    const guess = (req.query.guess || (req.body && req.body.guess))
    const title = (req.query.title || (req.body && req.body.title))

    const feed = await parser.parseURL(sources[ guess ].rssEndpoint)
    const article = feed.items.find(e => e.title === title)

    const isCorrect = typeof article !== "undefined"

    res.status(200).json(
        {
            guess: guess,
            title: title,
            isCorrect: isCorrect
        }
    )
}