import React from 'react'

import MessageStore from '../stores/MessageStore'
import Comment from './Comment'


const getStateFromStore= () => {
    return {
        messages: MessageStore.getAll()
    }
}

export default class CommentList extends React.Component {
    constructor() {
        super()
        this.state = getStateFromStore()
    }

    componentDidMount() {
        MessageStore.addChangeListener(this._onChange.bind(this))
    }

    componentWillUnmount() {
        MessageStore.removeChangeListener(this._onChange.bind(this))
    }

    renderComment(commentId) {
        return <Comment key={commentId} comment={this.state.messages[commentId]}/>
    }

    _onChange() {
        this.setState(getStateFromStore())
    }

    render() {
        return (
            <div>
                {Object.keys(this.state.messages).map(this.renderComment.bind(this))}
            </div>
        )
    }
}