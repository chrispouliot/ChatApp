import AppDispatcher from '../dispatcher/AppDispatcher'
import { ActionTypes, MessageStatuses } from '../constants/ChatConstants'
import { socketCreateMessage } from '../managers/WebSocketManager'

let currId = 0
export const createMessage = (username, text) => {

    const message = {
        id: currId,
            status: MessageStatuses.LOADING,
            username,
            text
    }

    AppDispatcher.dispatch({
        type: ActionTypes.CREATE_MESSAGE,
        message
    })
    // Create it in DB and send to other clients
    socketCreateMessage(message)
    // Increment ID for next messages. This won't work for when there are 1+ clients
    // DB will have to handle what IDs clients get, but the client needs an ID for React
    // when in the "loading" state because at this point the DB hasn't responded yet.
    // Maybe get length of messages + 1? Still has problems. Probably some hash that
    // is determined by the clients username + random thing just so no collisions
    // happen until DB replies with a real ID
    currId++
}

export const updateMessageStatus = (id, status) => {
    AppDispatcher.dispatch({
        type: ActionTypes.UPDATE_MESSAGE_STATUS,
        message: {
            id: id,
            status: status
        }
    })
}