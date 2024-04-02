import { Component } from 'react'
import { showFeedback, logger } from '../utils'
import logic from '../logic.mjs'
import App from '../App'
import Home from '../pages/Home'




class Chat extends Component {
    constructor() {
        logger.debug('chat')
        super()
        try {
            const userList = logic.retrieveUsersWithStatus()

            this.state = { userList }
        } catch {
            showFeedback(error)
        }
    }

    handleHomeButtonClick = () => this.props.onHomeClick()


    render() {
        logger.debug('chat -> chat')
        return <section ClassName="chat">
            <h3>Chat</h3>
            <nav>
                <button onClick={this.handleHomeButtonClick}>🏠</button>
            </nav>
            <ul>
                {this.state.userList.map((user) => <li key={user.id}>{user.username}</li>)}
            </ul>
        </section>
    }
}


export default Chat



