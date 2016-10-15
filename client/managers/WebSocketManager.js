import io from 'socket.io-client'

import { SocketEvents } from '../constants/ChatConstants'
import { updateMessageStatus } from '../actions/ChatMessageActionCreators'

const socket = io('http://localhost:3030')

const dispatchSocket = (message, type) => {
    socket.emit(type, message)
}

const receiveSocket = message => {
    console.log("I GOT A SOCKET")
    updateMessageStatus(message.id, message.status)
}

socket.on(SocketEvents.CHAT_MESSAGE, receiveSocket)

export const socketCreateMessage = message => {
    dispatchSocket(message, SocketEvents.CHAT_MESSAGE)
}
// MORE EXPORTED CRUD HERE