const cron = require('cron');
const { getAirQuality } = require('./helper');
const { db } = require('./dbConnection');

const PARIS_COORDINATES = {
    lat: '48.856613',
    long: '2.352222'
};
const storeData = async (data,collName) => {
   const {insertedId} = await db.collection(collName).insertOne({...data,date: new Date()});
    console.log('inserted Successfully', new Date());
    return insertedId;
}
const storeMostPolluted = async (data) => {
    const mostPolluted = await db.collection('most_polluted').findOne();
    if(mostPolluted) {
        if(data.current.pollution.aqius >= mostPolluted.current.pollution.aqius) {
            db.collection('most_polluted').updateOne({},{$set:{...data,date:new Date()}})
        }
    } else {
        storeData(data,'most_polluted');
    }
}
const cronJob = new cron.CronJob('* * * * *', async () => {
    const {lat,long} = PARIS_COORDINATES;
    const {data:{data}} = await getAirQuality(lat,long);
    const insertedId = await storeData(data,'paris_air');
    storeMostPolluted({...data,refId:insertedId })
  });
  
  cronJob.start();

  process.on('SIGTERM', () => {
    cronJob.stop();
    process.exit(0);
  });
  
  process.on('SIGINT', () => {
    cronJob.stop();
    process.exit(0);
  });