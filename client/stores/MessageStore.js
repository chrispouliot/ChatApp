import assign from 'object-assign'
import EventEmitter from 'events'

import AppDispatcher from '../dispatcher/AppDispatcher'
import { ActionTypes } from '../../util/constants'

const CHANGE_EVENT = 'change'

let messageState = {
    loadedMessages: {},
    loadingMessages: {}
}

const addLoadedMessage = message => {
    messageState.loadedMessages[message.id] = message
}

const addLoadingMessage = message => {
    messageState.loadingMessages[message.id] = message
}

const updateMessage = updatedMessage => {
    // for now just assume it's to update status, but we will
    // need to also accept "edits" to message text
    messageState.loadedMessages[updatedMessage.id] = updatedMessage
    delete messageState.loadingMessages[updatedMessage.prevId]
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
        return messageState
    }
})

MessageStore.dispatchToken = AppDispatcher.register(action => {
    switch(action.type) {
        case ActionTypes.CREATE_LOADING_MESSAGE:
            addLoadingMessage(action.message)
            MessageStore.emitChange()
            break
        case ActionTypes.CREATE_NEW_MESSAGE:
            addLoadedMessage(action.message)
            MessageStore.emitChange()
            break
        case ActionTypes.UPDATE_MESSAGE:
            updateMessage(action.message)
            MessageStore.emitChange()
            break
        default:
            console.log(`Received message store action ${action.type} which was not accounted for`)
    }
})

export default MessageStore
