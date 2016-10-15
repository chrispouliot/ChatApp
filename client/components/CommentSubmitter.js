import React from 'react'

import { createMessage } from '../actions/ChatMessageActionCreators'

export default class CommentSubmitter extends React.Component {
    submitComment(event) {
        event.preventDefault()
        let textBox = this.refs.commentInput
        let text = textBox.value
        // this has the side-effect that it also sends a websocket to the server after Flux stuff
        // Maybe ok? it IS "creating" a message
        createMessage("fakeUsername", text)
        textBox.value = ''
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