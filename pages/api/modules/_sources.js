export const sources = {
    USA: {
        language: "en",
        sources: {
            CNN: {
                rssEndpoint: "http://rss.cnn.com/rss/edition.rss"
            },
            "Fox News": {
                rssEndpoint: "https://moxie.foxnews.com/feedburner/latest.xml"
            }
        }
    },

    Norge: {
        language: "no",
        sources: {
            NRK: {
                rssEndpoint: "https://www.nrk.no/toppsaker.rss"
            },
            VG: {
                rssEndpoint: "https://www.vg.no/rss/feed"
            },
            Aftenposten: {
                rssEndpoint: "https://www.aftenposten.no/rss"
            }
        }
    }
};

// https://loop24.no/loopsign/rss-feeds/