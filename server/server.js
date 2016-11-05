import express from 'express'
import path from 'path'
const io = require('socket.io')(3030) // How do ES6?
// My imports
import { SocketEvents } from '../util/Constants'
import addMessage from './database'

const app = express()

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/index.html'))
})


io.on('connection', socket => {
    // Move constants out of Client and use the chat_message client here and in the React app
    socket.on(SocketEvents.NEW_CHAT_MESSAGE, async msg => {
        console.log('new message: ' + `status: ${msg.status}, username: ${msg.username} , text: ${msg.text}`)
        // DO SOME DB STUFF AND GET A NEW STATUS THEN SEND TO EVERYBODY.
        // We will have to broadcast a diff event to everybody else later
        // new vs update status

        //TODO REMOVE ME
        let message = await addMessage("name", "this is some text")
        console.log(message)

        setTimeout(() => {
            // once again re do where we store constants
            msg.status = "success"
            // prevId is what the client generated for it's own loadingMessage state
            msg.prevId = msg.id
            // this new ID will be from the DB and will be given to all clients
            msg.id = Math.floor(Math.random() * 10)

            // Broadcast new message to everyone except original emitter
            socket.broadcast.emit(SocketEvents.NEW_CHAT_MESSAGE, msg)
            // Send to original emitter
            socket.emit(SocketEvents.UPDATE_CHAT_MESSAGE, msg)
        }, 2000)
    })
})

app.listen(3000, () => {
    console.log('chat-app up on 3000!')
})