import express from 'express'
import path from 'path'
const io = require('socket.io')(3030) // How do ES6?
// My imports
import { SocketEvents } from '../util/Constants'
import { addMessage, listMessages } from './database'

const app = express()

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/index.html'))
})


io.on('connection', socket => {
    // Move constants out of Client and use the chat_message client here and in the React app
    socket.on(SocketEvents.NEW_CHAT_MESSAGE, async msg => {
        console.log('new message: ' + `status: ${msg.status}, username: ${msg.username} , text: ${msg.text}`)

        let saved_msg = await addMessage(msg.username, msg.text)
        saved_msg.status = "success"
        //TODO need to make this better
        saved_msg.id = saved_msg.timestamp

        socket.broadcast.emit(SocketEvents.NEW_CHAT_MESSAGE, saved_msg)

        // To remove from the "loading" state
        saved_msg.prevId = msg.id
        console.log("Sending: ", saved_msg)
        socket.emit(SocketEvents.UPDATE_CHAT_MESSAGE, saved_msg)

    })
})

app.listen(3000, () => {
    console.log('chat-app up on 3000!')
})