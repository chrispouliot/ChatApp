import React from 'react'
//import io from 'socket.io-client'
//const socket = io('http://localhost:3030')

import CommentList from './CommentList'
import CommentSubmitter from './CommentSubmitter'

class App extends React.Component {
    render() {
        return (
            <div>
                <CommentList />
                <CommentSubmitter/>
            </div>
        )
    }
}

export default App