import { logger } from './utils'

import logic from './logic'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
//traemos routes y route para printear las páginas, además de Navigate y el hook useNavigate
//import Chat from './pages/Chat'

function App() {
    const navigate = useNavigate()
    // instancaimos navigate para usarlo correctamente

    const goToLogin = () => navigate('/login')
    // cambiamos la propiedad setview y metemos un hook para cambiar el estado de visión de las páginas

    const handleLoginClick = () => goToLogin()

    const handleRegisterClick = () => navigate('/register')

    const handleUserLoggedIn = () => navigate('/')
    // la página raíz es home

    const handleUserLoggedOut = () => goToLogin()

    //handleChatClick = () => goToChat()

    //goToChat = () => setState({ view: 'chat' })

    //handleHomeClick = () => goToHome()

    //goToHome = () => setState({ view: 'home' })

    logger.debug('App -> render')

    return <>
        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />} />
            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onUserRegistered={handleLoginClick} />} />
            <Route path="/*" element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to="/login" />} />
        </Routes>
    </>
}
export default App