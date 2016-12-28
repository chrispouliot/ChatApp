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
    let rawData =  await Message.findAll({
        offset,
        limit
    })
    // This might be unnecessary, seems like the Instance you get back has additional values but
    // can still access expected fields using regular dot notation (can just ignore dataValues?)
    return rawData.map(item => {
        return item.dataValues
    })
}
