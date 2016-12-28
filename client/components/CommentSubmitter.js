import { React, Component } from 'react'

import { createLoadingMessage } from '../actions/ChatMessageActionCreators'
import { socketCreateMessage } from '../managers/WebSocketManager'
import { loadingMessageBuilder } from '../../util/messageUtil'

export default class CommentSubmitter extends Component {

    submitComment(event) {
        event.preventDefault()
        let textBox = this.refs.commentInput
        let text = textBox.value
        textBox.value = ''

        let message = loadingMessageBuilder("fakeUsername", text)

        //TODO decouple this? Does it need to know it uses sockets?
        createLoadingMessage(message)
        socketCreateMessage(message)
    }

    render() {
        return (
            <form onSubmit={this.submitComment.bind(this)}>
                <input type="text" ref="commentInput"/>
                <button type="submit">Submit</button>
            </form>
        )
    }
}
