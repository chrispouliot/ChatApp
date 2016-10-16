import AppDispatcher from '../dispatcher/AppDispatcher'
import { ActionTypes, MessageStatuses } from '../constants/ChatConstants'
import { socketCreateMessage } from '../managers/WebSocketManager'

let currId = 0
//TODO I think this will have to be re done so we can accept new messages from other clients
// Probably will have to only let the WebSocketManager use the action creators here
// And when you make a new one we append a "loading" one, and it is only really made using this
// action when the WebSocketManager receives a reply from the server
export const createLoadingMessage = (username, text) => {

    const message = {
        id: currId,
        status: MessageStatuses.LOADING,
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
    // receive new message
}

export const updateMessage = (message) => {
    AppDispatcher.dispatch({
        type: ActionTypes.UPDATE_MESSAGE,
        message
    })
}