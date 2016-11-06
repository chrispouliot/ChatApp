const MongoClient = require('mongodb').MongoClient

const dbUrl = "mongodb://localhost:27017/chat-app"
let mongoDb = null

async function getDb() {
    if (mongoDb === null) {
        mongoDb = await MongoClient.connect(dbUrl)
    }
    return mongoDb
}

async function retrieveMessages(username=null) {
    //TODO use username for filter if passed
    let db = await getDb()
    console.log("I got here")

    let messages = await db.collection("messages").find().toArray()
    messages.map(msg => delete msg._id)
    return messages
}

async function insertMessage(message) {
    let db = await getDb()

    let messages = db.collection("messages")
    let result = await messages.insertOne(message)
    return result.ops[0]
}

// EXPORTS

export async function addMessage(username, text) {
    let message = {
        timestamp: new Date(),
        username,
        text
    }

    let result = await insertMessage(message)
    delete result._id
    return result
}

export async function listMessages() {
    return await retrieveMessages()
}