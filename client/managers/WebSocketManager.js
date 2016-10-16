import io from 'socket.io-client'

import { SocketEvents } from '../constants/ChatConstants'
import { updateMessage } from '../actions/ChatMessageActionCreators'

const socket = io('http://localhost:3030')

const dispatchSocket = (message, type) => {
    socket.emit(type, message)
}

const receiveNewMessageSocket = message => {
    console.log('Received new message socket')
}

const receiveUpdatedMessageSocket = message => {
    console.log('Received update socket')
    updateMessage(message)
}

socket.on(SocketEvents.NEW_CHAT_MESSAGE, receiveNewMessageSocket)
socket.on(SocketEvents.UPDATE_CHAT_MESSAGE, receiveUpdatedMessageSocket)

export const socketCreateMessage = message => {
    dispatchSocket(message, SocketEvents.NEW_CHAT_MESSAGE)
}
// MORE EXPORTED CRUD HERE