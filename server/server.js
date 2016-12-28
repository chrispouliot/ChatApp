import express from 'express'
import path from 'path'
const io = require('socket.io')(3030) // How do ES6?

// My imports
import { SocketEvents } from '../util/constants'
import { serializeMessage, serializeMessages } from './serializers'
import { addMessage, listMessages } from './database'

const app = express()

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/index.html'))
})


io.on('connection', async socket => {

    socket.on(SocketEvents.LOAD_CHAT_MESSAGES, async ({ limit=10, offset=0 }) => {
        let messages = await listMessages(limit, offset)
        let formattedMessages = await serializeMessages(messages)

        socket.emit(SocketEvents.LOAD_CHAT_MESSAGES, formattedMessages)
    })

    socket.on(SocketEvents.NEW_CHAT_MESSAGE, async (loadingMessage) => {
        //TODO middleware to attach User to requests
        let user = {username: "moxuz", id: 1}
        let savedMessage = await addMessage(user, loadingMessage.text)
        let completedMessage = await serializeMessage(savedMessage)

        socket.broadcast.emit(SocketEvents.NEW_CHAT_MESSAGE, completedMessage)
        // Add prevId so we can update it
        // TODO must be a better way to do this
        completedMessage["prevId"] = loadingMessage.id
        socket.emit(SocketEvents.UPDATE_CHAT_MESSAGE, completedMessage)

    })
})

app.listen(3000, () => {
    console.log('chat-app up on 3000!')
})
