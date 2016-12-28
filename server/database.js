import { User, Message } from './models'

async function createTables() {
    await Message.sync({force: true})
    await User.sync({force: true})
}

// EXPORTS

export async function addMessage(user, text) {
    return await Message.create({userId: user.id, text})
}

export async function listMessages(limit, offset) {
    return await Message.findAll({
        offset,
        limit
    })
}
