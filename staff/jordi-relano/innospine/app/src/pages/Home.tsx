//@ts-nocheck

import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'

import CreateSurgery from '../components/CreateSurgery'
import Surgery from '../components/Surgery'


import { Routes, Route } from 'react-router-dom'
import Profile from '../components/Profile'

import { useContext } from '../context'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [surgery, setSurgery] = useState(null)

    const { showFeedback } = useContext()

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(setUser)
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }, [])

    const clearView = () => setView(null)

    const handleSurgeryCreated = () => {
        clearView()
        setStamp(Date.now())
    }

    const handleCreateSurgeryCancelClick = () => clearView()

    const handleCreateSurgeryClick = () => setView('create-surgery')

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUserId()
        } finally {
            onUserLoggedOut()
        }
    }

    // const handleEditSurgeryClick = surgery => {
    //     setView('edit-surgery')
    //     setSurgery(surgery)
    // }

    // const handleSurgeryEdited = () => {
    //     clearView()
    //     setStamp(Date.now())
    //     setSurgery(null)
    // }

    const handleEditSurgeryCancelClick = () => clearView()


    logger.debug('Home -> render')

    return <>
        <header className="px-[5vw] fixed top-0 bg-white w-full">
            {user && <h1 className=' text-4xl text-blue-700  font-sans font-extrabold '>INNOSPINE</h1>}

            <nav classname="position: fixed; top: 0; right: 0; display: flex; flex-direction: column; align-items: flex-end;">
                <button className="w-full h-[50px] flex justify-center items-center p-[10px] box-border bg-white" onClick={handleCreateSurgeryClick}>➕</button>

                <button className="w-full h-[10px] flex justify-end items-center p-[20px] box-border bg-white" onClick={handleLogoutClick}>Exit</button>
            </nav>
        </header>

        <main className="my-[50px] px-[5vw]">

            <Routes>
                <Route path="/" />

                {/* <Route path="/" element={<SurgeryList stamp={stamp} onEditSurgeryClick={handleEditSurgeryClick}/>} /> */}
                <Route path="/profile/:email" element={<Profile />} />
            </Routes>

            {view === 'create-surgery' && <CreateSurgery onCancelClick={handleCreateSurgeryCancelClick} onSurgeryCreated={handleSurgeryCreated} />}

        </main>

        <footer >

        </footer>
    </>
}

export default Home