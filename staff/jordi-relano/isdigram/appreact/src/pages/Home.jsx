

import { logger, showFeedback } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'
import PostList from '../components/PostList'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'

function Home(props) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [post, setPost] = useState(null)

    //objeto de home, y metemos dos propiedades. Una para cuando queramos que se active (si metemos CreatePost se nos activará para mostrarlo, o si ponemos Chat igual), y otra stamp ( como marca) para avisar. Las inicializamos null para dejarlas apagadas de mientras hasta que tengamos que activarlas.

    //stamp: Esta propiedad se utiliza para forzar la actualización de la lista de publicaciones cuando cambia. Cada vez que se actualiza stamp con un nuevo valor (en este caso, usando Date.now()), se vuelve a renderizar el componente PostList, lo que provoca una actualización de las publicaciones mostradas.


    // componentDidMount() {
    //     try {
    //         logic.retrieveUser((error, user) => {
    //             if (error) {
    //                 showFeedback(error)

    //                 return
    //             }

    //             this.setState({ user })
    //         })


    //     } catch (error) {
    //         showFeedback(error);
    //     }
    // }

    // setState(state) {
    //     logger.debug('Home -> setState', JSON.stringify(state));

    //     super.setState(state);
    // };

    useEffect(() => {
        try {
            logic.retrieveUser((error, user) => {
                if (error) {
                    showFeedback(error)

                    return
                }

                setUser(user)
            })
        } catch (error) {
            showFeedback(error)
        }
    }, [])

    const clearView = () => setView(null)

    const handleCreatePostCancelClick = () => clearView()

    const handlePostCreated = () => {
        clearView()
        setStamp(Date.now())
    }

    const handleCreatePostClick = () => setView('create-post')

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUser()
        } finally {
            props.onUserLoggedOut()
        }
    }

    const handleEditPostCancelClick = () => clearView()

    const handleEditPostClick = post => {
        setView('edit-post')
        setPost(post)
    }

    const handlePostEdited = () => {
        clearView()
        setStamp(Date.now())
        setPost(null)
    }

    logger.debug('Home -> render')

    return <main className="main">
        {user && <h1>Hello, {user.name}!</h1>}

        <nav>
            <button>💬</button>
            <button onClick={handleLogoutClick}>🚪</button>
        </nav>

        <PostList stamp={stamp} onEditPostClick={handleEditPostClick} />

        {view === 'create-post' && <CreatePost onCancelClick={handleCreatePostCancelClick} onPostCreated={handlePostCreated} />}

        {view === 'edit-post' && <EditPost post={post} onCancelClick={handleEditPostCancelClick} onPostEdited={handlePostEdited} />}

        <footer className="footer">
            <button onClick={handleCreatePostClick}>➕</button>
        </footer>
    </main>
}

export default Home