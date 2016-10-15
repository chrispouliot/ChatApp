import io from 'socket.io-client'

import { SocketEvents } from '../constants/ChatConstants'
import { updateMessageStatus } from '../actions/ChatMessageActionCreators'

const socket = io('http://localhost:3030')

const dispatchSocket = (message, type) => {
    socket.emit(type, message)
}

const receiveSocket = message => {
    console.log("I GOT A SOCKET")
    //TODO All flux stuff for creating messages will be handled here, so will have to have a switch case
    // What about updating a message? Will that hit the server first? I don't like that slowness
    updateMessageStatus(message.id, message.status)
}

socket.on(SocketEvents.CHAT_MESSAGE, receiveSocket)

export const socketCreateMessage = message => {
    dispatchSocket(message, SocketEvents.CHAT_MESSAGE)
}
// MORE EXPORTED CRUD HERE