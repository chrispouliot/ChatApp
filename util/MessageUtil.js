import { MessageStatuses } from './Constants'

let currLoadingId = 0

export function loadingMessageBuilder(username, text) {
    const message = {
        id: currLoadingId,
        status: MessageStatuses.LOADING,
        timestamp: new Date(),
        username,
        text
    }
    currLoadingId++
    return message
}

export function completedMessageBuilder(savedMessage, loadingMessage) {
    //TODO redo this with cool ES6 destructuring. the default with rename wasnt working
    let prevId= null
    if (loadingMessage !== undefined) {
        prevId = loadingMessage.id
    }
    let { timestamp, username, text, status} = savedMessage
    //TODO make a real pub id instead of using just timestamp
    return {
        id: timestamp,
        prevId,
        timestamp,
        status,
        text,
        username
    }

}