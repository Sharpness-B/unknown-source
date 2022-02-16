const { getFirestore, collection, query, where, orderBy, limit, getDocs } = require('firebase/firestore')
const { initializeApp }  = require('firebase/app')
const { firebaseConfig } = require('./modules/db')

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default async function getRecordList(req, res) {    
    const data = {
        top10: [],
        top10last24h: []
    }    


    
    // top 10 results 
    const qTop10 = query(collection(firestore, "results"), orderBy("score", "desc"), limit(10))
    
    const querySnapshotTop10 = await getDocs(qTop10)

    querySnapshotTop10.forEach((doc) => {
        data.top10.push( doc.data() )
    });



    // top 10 last 24 hours
    const ago24h = new Date( new Date().getTime() - (24*60*60*1000) )
    const qTop10last24h = query(collection(firestore, "results"), where("timestamp", ">", ago24h), limit(10))
    
    const querySnapshotTop10last24h = await getDocs(qTop10last24h)

    querySnapshotTop10last24h.forEach((doc) => {
        data.top10last24h.push( doc.data() )
    });

    // sort as it was not allowed in query // Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field 'timestamp' and so you must also use 'timestamp' as your first argument to orderBy(), but your first orderBy() is on field 'score' instead.
    function compare( a, b ) {
        if ( a.score > b.score ){
          return -1;
        }
        if ( a.score < b.score ){
          return 1;
        }
        return 0;
    }
    data.top10last24h.sort(compare)


    
    res.status(200).json(
        data
    )
}