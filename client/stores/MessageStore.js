import assign from 'object-assign'
import EventEmitter from 'events'

import AppDispatcher from '../dispatcher/AppDispatcher'
import { ActionTypes } from '../constants/ChatConstants'

const CHANGE_EVENT = 'change'
// This is state. Change to an object {} with key of ID?
let messages = {}

const addMessage = message => {
    messages[message.id] = message
}

const updateMessageStatus = message => {
    messages[message.id].status = message.status
}

let MessageStore = assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener(callback) {
        this.removeListener(callback)
    },

    getAll() {
        return messages
    }
})

MessageStore.dispatchToken = AppDispatcher.register(action => {
    switch(action.type) {
        case ActionTypes.CREATE_MESSAGE:
            addMessage(action.message)
            MessageStore.emitChange()
            break
        case ActionTypes.UPDATE_MESSAGE_STATUS:
            updateMessageStatus(action.message)
            MessageStore.emitChange()
            break
        default:
            // nope
    }
})

export default MessageStore
