
import { showFeedback, logger } from '../utils'
import logic from '../logic.mjs'





function Chat(props) {
    try {
        const userList = logic.retrieveUsersWithStatus()

        state = { userList }
    } catch {
        showFeedback(error)
    }


    const handleHomeButtonClick = () => props.onHomeClick()



    logger.debug('chat -> chat')
    return <section ClassName="chat">
        <h3>Chat</h3>
        <nav>
            <button onClick={handleHomeButtonClick}>🏠</button>
        </nav>
        <ul>
            {state.userList.map((user) => <li key={user.id}>{user.username}</li>)}
        </ul>
    </section>

}


export default Chat



