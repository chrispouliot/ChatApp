import React, { Component } from 'react'

import { createLoadingMessage } from '../actions/ChatMessageActionCreators'
import { socketCreateMessage } from '../managers/WebSocketManager'
import { loadingMessageBuilder } from '../../util/messageUtil'

export default class CommentSubmitter extends Component {

    submitComment(event) {
        event.preventDefault()
        const textBox = this.refs.commentInput
        const text = textBox.value
        textBox.value = ''

        const message = loadingMessageBuilder('fakeUsername', text)

        // TODO decouple this? Does it need to know it uses sockets?
        createLoadingMessage(message)
        socketCreateMessage(message)
    }

    render() {
        return (
            <form onSubmit={this.submitComment}>
                <input type="text" ref="commentInput" />
                <button type="submit">Submit</button>
            </form>
        )
    }
}
