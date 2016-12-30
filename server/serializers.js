import { completedMessageBuilder } from '../util/messageUtil'
import { User } from './models'

export function serializeUser(dbUser) {
    // pass
}

export async function serializeMessage(dbMessage) {
    console.log("Finding user..")
    const user = await User.findOne({
        where: {
            id: dbMessage.userId,
        },
    })
    console.log("Building message")
    return completedMessageBuilder(user, dbMessage)
}

export async function serializeMessages(dbMessages) {
    // 1. Locally cache found users
    // 2. If not in found users, hit real cache
    // 3. If not in cache, hit DB for user
    // 4. Return list of serialized messages
    // TODO move code from serializeMessage to completedMessageBuilder(user, dbMessage) and use

    // TODO THIS CODE DOESNT FOLLOW THOSE STEPS ^
    const userPromises = dbMessages.map(message => User.findOne({ where: { id: message.userId } }))
    // Resolve all promises
    const users = await Promise.all(userPromises)
    // Return serialized messages
    return users.map((user, index) => completedMessageBuilder(user, dbMessages[index]))
}
