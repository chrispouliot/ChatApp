import { MongoClient } from 'mongodb'

import { MessageStatuses } from '../util/Constants'

const dbUrl = "mongodb://localhost:27017/chat-app"
let mongoDb = null

//TODO Do I need to ever close this connection? Will a query block other queries?
async function getDb() {
    if (mongoDb === null) {
        mongoDb = await MongoClient.connect(dbUrl)
    }
    return mongoDb
}

async function retrieveMessages(limit, offset, username=null) {
    //TODO use username for filter if passed
    let db = await getDb()
    console.log("I got here")

    let messages = await db.collection("messages")
        .find()
        .sort({timestamp: -1})
        .skip(offset)
        .limit(limit)
        .toArray()
    // Get rid of DB id
    //TODO make a pub id to return
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
    result.status = MessageStatuses.SUCCESS
    delete result._id

    return result
}

export async function listMessages(limit, offset) {
    let messages = await retrieveMessages(limit, offset)
    return messages.map(msg => {
        msg.status = MessageStatuses.SUCCESS
        return msg
    })
}