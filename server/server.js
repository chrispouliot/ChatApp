import express from 'express'
import path from 'path'
const io = require('socket.io')(3030) // How do ES6?
// My imports
import { SocketEvents } from '../util/Constants'
import { completedMessageBuilder } from '../util/MessageUtil'
import { addMessage, listMessages } from './database'

const app = express()

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/index.html'))
})


io.on('connection', socket => {

    socket.on(SocketEvents.LOAD_CHAT_MESSAGES, async ({ limit=10, offset=0 }) => {
        let messages = await listMessages(limit, offset)
        let formattedMessages = messages.map(msg => completedMessageBuilder(msg))

        socket.emit(SocketEvents.LOAD_CHAT_MESSAGES, formattedMessages)
    })

    socket.on(SocketEvents.NEW_CHAT_MESSAGE, async (loadingMessage) => {
        let savedMessage = await addMessage(loadingMessage.username, loadingMessage.text)
        let completedMessage = completedMessageBuilder(savedMessage, loadingMessage)

        socket.broadcast.emit(SocketEvents.NEW_CHAT_MESSAGE, completedMessage)
        socket.emit(SocketEvents.UPDATE_CHAT_MESSAGE, completedMessage)

    })
})

app.listen(3000, () => {
    console.log('chat-app up on 3000!')
})