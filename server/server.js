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

    socket.on(SocketEvents.LOAD_CHAT_MESSAGES, async ({ limit=10, offset=0 }) => {
        console.log(`Socket: load ${limit} messages with an offset of ${offset}`)
        let messages = await listMessages(limit, offset)
        console.log(messages)
        //TODO Stop using status? Argh
        let formattedMessages = messages.map(msg => {
            msg.status = "success"
            msg.id = msg.timestamp
            return msg
        })

        socket.emit(SocketEvents.LOAD_CHAT_MESSAGES, formattedMessages)
    })

    socket.on(SocketEvents.NEW_CHAT_MESSAGE, async msg => {
        console.log('new message: ' + `status: ${msg.status}, username: ${msg.username} , text: ${msg.text}`)

        let saved_msg = await addMessage(msg.username, msg.text)
        saved_msg.status = "success"
        //TODO make this some sort of public id, since timestamp is already a field
        saved_msg.id = saved_msg.timestamp

        socket.broadcast.emit(SocketEvents.NEW_CHAT_MESSAGE, saved_msg)

        // We use prevId to map to the old message when we move it to done
        // I'm sure there's a better way to do this
        saved_msg.prevId = msg.id
        console.log("Sending: ", saved_msg)
        socket.emit(SocketEvents.UPDATE_CHAT_MESSAGE, saved_msg)

    })
})

app.listen(3000, () => {
    console.log('chat-app up on 3000!')
})