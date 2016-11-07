import AppDispatcher from '../dispatcher/AppDispatcher'
import { ActionTypes } from '../../util/Constants'


export const createLoadingMessage = message => {

    AppDispatcher.dispatch({
        type: ActionTypes.CREATE_LOADING_MESSAGE,
        message
    })
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