import { MessageStatuses } from './constants'

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

export function completedMessageBuilder(user, dbMessage) {
    let {createdAt, text} = dbMessage
    return {
        status: MessageStatuses.SUCCESS,
        id: dbMessage.pubId,
        username: user.username,
        createdAt,
        text
    }
}