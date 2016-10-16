import React from 'react'

import { createLoadingMessage } from '../actions/ChatMessageActionCreators'

export default class CommentSubmitter extends React.Component {
    submitComment(event) {
        event.preventDefault()
        let textBox = this.refs.commentInput
        let text = textBox.value

        createLoadingMessage("fakeUsername", text)
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