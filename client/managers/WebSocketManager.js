import io from 'socket.io-client'

import { SocketEvents } from '../../util/constants'
import { createNewMessage, updateMessage } from '../actions/ChatMessageActionCreators'

const socket = io('http://localhost:3030')

const dispatchSocket = (message, type) => {
    socket.emit(type, message)
}

const receiveNewMessageSocket = message => {
    console.log('Received new message socket')
    createNewMessage(message)
}

const receiveLoadedMessagesSocket = messages => {
    console.log(`Loaded ${messages}`)
    let sorted = messages.sort((a, b) => {
        return a.timestamp > b.timestamp
    })
    sorted.map(msg => {
        console.log(msg)
        createNewMessage(msg)
    })
}

const receiveUpdatedMessageSocket = message => {
    console.log('Received update socket')
    updateMessage(message)
}

socket.on(SocketEvents.NEW_CHAT_MESSAGE, receiveNewMessageSocket)
socket.on(SocketEvents.LOAD_CHAT_MESSAGES, receiveLoadedMessagesSocket)
socket.on(SocketEvents.UPDATE_CHAT_MESSAGE, receiveUpdatedMessageSocket)

export const socketCreateMessage = message => {
    dispatchSocket(message, SocketEvents.NEW_CHAT_MESSAGE)
}

export const socketLoadMessages = (limit, offset) => {
    dispatchSocket({limit, offset}, SocketEvents.LOAD_CHAT_MESSAGES)
}