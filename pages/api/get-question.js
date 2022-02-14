import { sources } from "./modules/sources"
import Parser from "rss-parser"
let parser = new Parser()

export default async function getQuestions(req, res) {
    const keys = Object.keys(sources)
    const randomSource = sources[ keys[ keys.length * Math.random() << 0] ]

    const feed = await parser.parseURL(randomSource.rssEndpoint)
    const randomArticle = feed.items[ feed.items.length * Math.random() << 0 ]

    res.status(200).json(
        {
            title: randomArticle.title
        }
    )
}