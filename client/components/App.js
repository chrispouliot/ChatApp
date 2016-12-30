import React from 'react'

import CommentList from './CommentList'
import CommentSubmitter from './CommentSubmitter'

class App extends React.Component {
    render() {
        return (
            <div>
                <CommentList />
                <CommentSubmitter />
            </div>
        )
    }
}

export default App
