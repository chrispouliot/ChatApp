import AppDispatcher from '../dispatcher/AppDispatcher'
import { ActionTypes, MessageStatuses } from '../../util/Constants'
import { socketCreateMessage } from '../managers/WebSocketManager'

let currId = 0

export const createLoadingMessage = (username, text) => {

    const message = {
        id: currId,
        status: MessageStatuses.LOADING,
        timestamp: new Date(),
        username,
        text
    }

    AppDispatcher.dispatch({
        type: ActionTypes.CREATE_LOADING_MESSAGE,
        message
    })
    // Create it in DB and send to other clients
    socketCreateMessage(message)

    //TODO make this based on username hash or something
    currId++
}

export const createNewMessage = (message) => {
    AppDispatcher.dispatch({
        type: ActionTypes.CREATE_NEW_MESSAGE,
        message
    })
}

export const updateMessage = (message) => {
    AppDispatcher.dispatch({
        type: ActionTypes.UPDATE_MESSAGE,
        message
    })
}