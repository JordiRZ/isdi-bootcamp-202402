import { showFeedback, logger } from '../utils';

import logic from '../logic';

import { Component } from 'react';
import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';
import Chat from '../components/Chat';
import EditPost from '../components/EditPost';


class Home extends Component {
    constructor() {
        logger.debug('Home');
        super();
        try {
            const user = logic.retrieveUser();

            this.user = user;


        } catch (error) {
            showFeedback(error);
        }

        this.state = { view: null, stamp: null, post: null, chat:null };
        //objeto de home, y metemos dos propiedades. Una para cuando queramos que se active (si metemos CreatePost se nos activará para mostrarlo, o si ponemos Chat igual), y otra stamp ( como marca) para avisar. Las inicializamos null para dejarlas apagadas de mientras hasta que tengamos que activarlas.

        //stamp: Esta propiedad se utiliza para forzar la actualización de la lista de publicaciones cuando cambia. Cada vez que se actualiza stamp con un nuevo valor (en este caso, usando Date.now()), se vuelve a renderizar el componente PostList, lo que provoca una actualización de las publicaciones mostradas.
    };

    setState(state) {
        logger.debug('Home -> setState', JSON.stringify(state));

        super.setState(state);
    };

    clearView = () => this.setState({ view: null });

    handleCreatePostCancelClick = () => this.clearView();

    handlePostCreated = () => this.setState({ view: null, stamp: Date.now() });

    handleCreatePostClick = () => this.setState({ view: 'create-post' });

    handleLogoutClick = () => {
        try {
            logic.logoutUser();
        } catch (error) {
            logic.cleanUpLoggedInUser();
        } finally {
            this.props.onUserLoggedOut();
        };
    };

    handleEditPostCancelClick = () => this.clearView();

    handleEditPostClick = post => this.setState({ view: 'edit-post', post });

    handlePostEdited = () => this.setState({ view: null, stamp: Date.now(), post: null });

    handleChatButtonCLick = event => {
        event.preventDefault();

        this.props.onChatClick();
    };



    render() {
        logger.debug('Home -> render')

        return <main className="main">
            <h1>Hello, {this.user.name}😊</h1>

            <nav>
                <button onClick={this.handleChatButtonCLick}>💬</button>
                <button onClick={this.handleLogoutClick}>🚪</button>
            </nav>

            <PostList stamp={this.state.stamp} onEditPostClick={this.handleEditPostClick} />

            {this.state.view === 'create-post' && <CreatePost onCancelClick={this.handleCreatePostCancelClick} onPostCreated={this.handlePostCreated} />}

            {this.state.view === 'edit-post' && <EditPost post={this.state.post} onCancelClick={this.handleEditPostCancelClick} onPostEdited={this.handlePostEdited} />}


            <footer className="footer">
                <button onClick={this.handleCreatePostClick}>➕</button>
            </footer>
        </main >
    }
}


export default Home