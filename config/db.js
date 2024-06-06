const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'node_assessment';

let db;

const connectDB = async () => {
    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
