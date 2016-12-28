import { completedMessageBuilder } from '../util/messageUtil'
import { User, Message } from './models'

export function serializeUser(dbUser) {
    // pass
}

export async function serializeMessage(dbMessage) {
    console.log("Finding user..")
    let user = await User.findOne({
        where: {
            id: dbMessage.userId
        }
    })
    console.log("Building message")
    return completedMessageBuilder(user, dbMessage)
}

export async function serializeMessages(dbMessages) {
    // 1. Locally cache found users
    // 2. If not in found users, hit real cache
    // 3. If not in cache, hit DB for user
    // 4. Return list of serialized messages
    //TODO probably move most of the code from serializeMessage to completedMessageBuilder(user, dbMessage) and use here

    //TODO THIS CODE DOESNT FOLLOW THOSE STEPS ^
    let userPromises = dbMessages.map(message => {
        return User.findOne({
            where: {
                id: message.userId
            }
        })
    })
    // Resolve all promises
    let users = await Promise.all(userPromises)
    // Return serialized messages
    return users.map((user, index) => {
        // Ehh
        let message = dbMessages[index]
        return completedMessageBuilder(user, message)
    })
}
