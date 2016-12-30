export const ActionTypes = {
    CREATE_LOADING_MESSAGE: 'create_loading_message',
    CREATE_NEW_MESSAGE: 'create_new_message',
    UPDATE_MESSAGE: 'update_message',
}

export const MessageStatuses = {
    FAILED: 'failed',
    LOADING: 'loading',
    SUCCESS: 'success',
}

export const SocketEvents = {
    LOAD_CHAT_MESSAGES: 'load_chat_messages',
    NEW_CHAT_MESSAGE: 'new_chat_message',
    UPDATE_CHAT_MESSAGE: 'update_chat_message',
}
