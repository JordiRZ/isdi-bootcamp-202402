//@ts-nocheck

import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'

import CreateSurgery from '../components/CreateSurgery'
import SurgeryList from '../components/SurgeryList'
import Surgery from '../components/Surgery'
import EditSurgery from '../components/EditSurgery'

import Header from '../components/Header'



import { Routes, Route } from 'react-router-dom'
import Profile from '../components/Profile'

import { useContext } from '../context'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [surgery, setSurgery] = useState(null)
    const [surgeryShow, setSurgeryShow] = useState(false)

    const { showFeedback } = useContext()

    const onLogout = () => onUserLoggedOut()

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









    const handleEditSurgeryClick = surgery => {
        setView('edit-surgery')
        setSurgery(surgery)
    }

    const handleSurgeryEdited = () => {
        clearView()
        setStamp(Date.now())
        setSurgery(null)
    }

    const handleEditSurgeryCancelClick = () => clearView()

    const handleCreateSurgeryCancelClick = () => clearView()

    const handleSurgeryCreated = () => {
        clearView()
        setStamp(Date.now())
    }

    const toogleSurgeryForm = () => {
        setSurgeryShow(!surgeryShow)
    }





    logger.debug('Home -> render')

    return <>
        <div className="bg-[#13c4e3] flex flex-col h-screen">
            <div className="">
                {user && <h1 className="text-2xl text-center font-sans font-extrabold text-blue-700 mt-4">INNOSPINE</h1>}
                <Header showCreateSurgery={toogleSurgeryForm} onUserLoggedOut={onLogout} />
            </div>
            <main className="flex flex-col items-center my-[50px] px-[5vw] bg-gray-100 rounded-sm">
                <div className="">

                    {surgeryShow && <CreateSurgery onCancelClick={handleCreateSurgeryCancelClick} onSurgeryCreated={handleSurgeryCreated} />}

                    <SurgeryList stamp={stamp} onEditSurgeryClick={handleEditSurgeryClick} />

                    {view === 'edit-surgery' && <EditSurgery surgery={surgery} onCancelClick={handleEditSurgeryCancelClick} onSurgeryEdited={handleSurgeryEdited} />}

                </div>


                <footer >

                </footer>
            </main>
        </div>
    </>
}

export default Home