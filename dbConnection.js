const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URI;
const client = new MongoClient(url, { useUnifiedTopology: true });
const db = client.db('air_quality');
module.exports = {
    client,
    db
}