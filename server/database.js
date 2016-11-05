const MongoClient = require('mongodb').MongoClient

const dbUrl = "mongodb://localhost:27017/chat-app"
let mongoDb = null

async function getDb() {
    if (mongoDb === null) {
        mongoDb = await MongoClient.connect(dbUrl)
    }
    return mongoDb
}


async function insertMessage(message) {
    let db = await getDb()
    let messages = db.collection("messages")

    return await messages.insertOne(message)
}

async function addMessage(username, text) {
    let message = {
        timestamp: new Date(),
        username,
        text
    }
    let result = await insertMessage(message)
    return result.ops[0]
}

// It was too gross having "export default async AddMessage"
export default addMessage