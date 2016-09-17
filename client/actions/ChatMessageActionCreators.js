import AppDispatcher from '../dispatcher/AppDispatcher'
import ActionTypes from '../constants/ChatConstants'

let currId = 0
const createMessage = (username, text) => {
    AppDispatcher.dispatch({
        type: ActionTypes.CREATE_MESSAGE,
        message: {
            id: currId,
            username,
            text
        }
    })
    currId++
}
export default createMessage