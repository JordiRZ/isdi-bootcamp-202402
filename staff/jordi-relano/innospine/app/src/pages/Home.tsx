//@ts-nocheck

import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'


import { Routes, Route } from 'react-router-dom'
import Profile from '../components/Profile'

import { useContext } from '../context'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    // const [stamp, setStamp] = useState(null)
    // const [post, setPost] = useState(null)

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

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const date = form.date.value
        const name = form.name.value
        const products = form.products.value
        const type = from.type.value
        const hospital = from.hospital.value 
        const note = from.note.value 


        try {
            logic.createSurgery(surgeryDate)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    

    

   

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUserId()
        } finally {
            onUserLoggedOut()
        }
    }



    logger.debug('Home -> render')

    return <>
        <header className="px-[5vw] fixed top-0 bg-white w-full">
            {user && <h1>Hello, {user.name}!</h1>}

            <nav>
                <button onClick={handleLogoutClick}>Exit</button>
            </nav>
        </header>

        <main className="my-[50px] px-[5vw]">
        <form onSubmit={handleSubmit} className='bg-sky-400 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Name</label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="name" />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">E-mail</label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="email" id="email" />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" id="password" />
                </div>

                <div className='flex items-center justify-center'>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
                </div>
            </form>
            <Routes>
                <Route path="/"/>
                <Route path="/profile/:email" element={<Profile />} />
            </Routes>

        </main>

        <footer className="fixed bottom-0 w-full h-[50px] flex justify-center items-center p-[10px] box-border bg-white">
            <button>➕</button>
        </footer>
    </>
}

export default Home