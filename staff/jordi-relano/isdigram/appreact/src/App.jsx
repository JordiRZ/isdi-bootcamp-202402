import { logger } from './utils'

import logic from './logic'

import { useState } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
//import Chat from './pages/Chat'

function App() {
    //ALTERNATIVA
    // const viewState = useState(logic.isUserLoggedIn() ? 'home' : 'landing')
    // const view = viewState[0]
    // const setView = viewState[1]

    const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : 'landing')

    const goToLogin = () => setView('login')

    const handleLoginClick = () => goToLogin()

    const handleRegisterClick = () => setView('register')

    const handleUserLoggedIn = () => setView('home')

    const handleUserLoggedOut = () => goToLogin()

    //handleChatClick = () => goToChat()

    //goToChat = () => setState({ view: 'chat' })

    //handleHomeClick = () => goToHome()

    //goToHome = () => setState({ view: 'home' })

    logger.debug('App -> render')


    //VERSION ANTIGUA
    // if (view === 'landing')
    //   return <Landing onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
    // else if (view === 'login')
    //   return <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />
    // else if (view === 'register')
    //   return <Register onLoginClick={handleLoginClick} onUserRegistered={handleLoginClick} />
    // else if (view === 'home')
    //   return <Home onUserLoggedOut={handleUserLoggedOut} /> // new Home().render(...)
    // else
    //   return <h1>🤨</h1>

    return <>
        {view === 'landing' && <Landing
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick} />}
        {view === 'login' && <Login
            onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />}
        {view === 'register' && <Register
            onLoginClick={handleLoginClick}
            onUserRegistered={handleLoginClick} />}
        {view === 'home' && <Home
            //onChatClick={handleChatClick}
            onUserLoggedOut={handleUserLoggedOut}
        />}
        {view === 'chat' && <Chat
            onHomeClick={handleHomeClick}
            onUserLoggedOut={handleUserLoggedOut}
        />}
    </>
}
export default App