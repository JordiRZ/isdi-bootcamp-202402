//@ts-nocheck
import { logger } from '../utils'

import logic from '../logic'

import { useContext } from '../context'

import { useState, useEffect } from 'react'

import Logo from '../images/innospine.jpg'


function Header({ onUserLoggedOut, showCreateSurgery }) {
    const [view, setView] = useState(null)
    const [user, setUser] = useState(null)

    const handleCreateSurgeryClick = () => setView('create-surgery')

    useEffect(() => {
        logic.retrieveUser()
            .then(setUser)
            .catch(error => showFeedback(error, 'error'))

    }, [])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUserId()
        } finally {
            onUserLoggedOut()
        }
    }





    return (
        <header className="px-[5vw] pb-[5vh]">
            <div>
                <img
                    className="mx-auto w-20"
                    src={Logo}
                    alt="logo"
                     />
                    
            </div>
            
    
        
        <nav className="fixed top-0 right-0 flex flex-col items-end"> 
            <button className="w-full h-[50px] flex justify-center items-center p-[10px] box-border bg-white text-blue-700 font-semibold hover:bg-blue-100" onClick={showCreateSurgery}>➕</button>
            <button className="w-full h-[10px] flex justify-end items-center p-[20px] box-border bg-white text-blue-700 font-semibold hover:bg-blue-100" onClick={handleLogoutClick}>Logout</button>
        </nav>
    </header>
    )
}

export default Header