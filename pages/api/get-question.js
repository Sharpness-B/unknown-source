import { sources } from "./modules/_sources"
import Parser from "rss-parser"
let parser = new Parser()

export default async function getQuestions(req, res) {
    const quiz = (req.query.quiz || (req.body && req.body.quiz))

    const keys = Object.keys(sources[quiz].sources)
    const randomSource = sources[quiz].sources[ keys[ keys.length * Math.random() << 0] ]

    const feed = await parser.parseURL(randomSource.rssEndpoint)
    const randomArticle = feed.items[ feed.items.length * Math.random() << 0 ]

    // res.status(200).json(randomArticle)
    res.status(200).json(
        {
            alternatives: keys,
            title: randomArticle.title
        }
    )
}