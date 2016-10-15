const express = require('express')
const io = require('socket.io')(3030)
const path = require('path')
const app = express()

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/index.html'))
})

// Not used yet
io.on('connection', socket => {
    // Move constants out of Client and use the chat_message client here and in the React app
    socket.on('chat_message', msg => {
        console.log('chat_message: ' + `status: ${msg.status}, username: ${msg.username} , text: ${msg.text}`)
        // DO SOME DB STUFF AND GET A NEW STATUS THEN SEND TO EVERYBODY.
        // We will have to broadcast a diff event to everybody else later
        // new vs update status
        setTimeout(() => {
            // once again re do where we store constants
            msg.status = "success"
            io.emit('chat_message', msg)
        }, 2000)
    })
})

app.listen(3000, () => {
    console.log('chat-app up on 3000!')
})