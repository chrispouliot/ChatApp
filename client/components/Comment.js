import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        return (
            <p>
                {this.props.comment.username}: {this.props.comment.text} (status: {this.props.comment.status})
            </p>
        )
    }
}
