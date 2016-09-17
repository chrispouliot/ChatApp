const express = require('express')
const io = require('socket.io')(3030)
const path = require('path')
const app = express()

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/index.html'))
})

// Not used yet
io.on('connection', function(socket){
    socket.on('message', function(msg){
        console.log('message: ' + msg)
    })
})

app.listen(3000, () => {
    console.log('chat-app up on 3000!')
})