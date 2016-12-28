import React, { Component } from 'react'

import { socketLoadMessages } from '../managers/WebSocketManager'
import MessageStore from '../stores/MessageStore'
import Comment from './Comment'


const getStateFromStore = () => {
    return {
        messages: MessageStore.getAll()
    }
}

export default class CommentList extends Component {
    constructor() {
        super()
        this.state = getStateFromStore()
        this.renderComment = this.renderComment.bind(this)
        this.renderCommentList = this.renderCommentList.bind(this)
    }

    componentDidMount() {
        //TODO I don't like this, it knows it's using WebSockets now
        // Way too coupled
        socketLoadMessages(10, 0)

        MessageStore.addChangeListener(this._onChange.bind(this))
    }

    componentWillUnmount() {
        MessageStore.removeChangeListener(this._onChange.bind(this))
    }

    renderComment(message) {
        return <Comment key={message.id} comment={message}/>
    }

    renderCommentList() {
        //TODO this is just for now. Please dont look at this code
        let loadedMessages = []
        for (let key of Object.keys(this.state.messages.loadedMessages)) {
            loadedMessages.push(this.renderComment(this.state.messages.loadedMessages[key]))
        }

        let loadingMessages = []
        for (let key of Object.keys(this.state.messages.loadingMessages)) {
            loadingMessages.push(this.renderComment(this.state.messages.loadingMessages[key]))
        }

        return loadedMessages.concat(loadingMessages)

    }

    _onChange() {
        this.setState(getStateFromStore())
    }

    render() {
        // make betterer
        return (
            <div>
                {this.renderCommentList()}
            </div>
        )
    }
}
