//@ts-nocheck

import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'

import CreateSurgery from '../components/CreateSurgery'
import SurgeryList from '../components/SurgeryList'
import Surgery from '../components/Surgery'
import EditSurgery from '../components/EditSurgery'
import Products from '../components/Products'
import ProductsList from '../components/ProductsList'

// import Header from '../components/Header'

import { Routes, Route } from 'react-router-dom'
import Profile from '../components/Profile'

import { useContext } from '../context'
import Navbar from '../components/NavBar'

function Home({ onUserLoggedOut, onCancelClick }) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [surgery, setSurgery] = useState(null)
    const [surgeryShow, setSurgeryShow] = useState(false)
    const [surgeryListShow, setSurgeryListShow] = useState(false)
    const [productsListShow, setProductsListShow] = useState(false)
    

    const { showFeedback } = useContext()

    const onLogout = () => onUserLoggedOut()

    //const onCancelSurgeryClick = () => clearView()

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
        setSurgeryShow(false)
    }

    const toogleSurgeryForm = () => {
        setSurgeryShow(!surgeryShow)
    }

    const toogleProductsForm = () => {
        setProductsListShow(!productsListShow)
    }

    const toogleSurgeryList = () => {
        setSurgeryListShow(!surgeryListShow)
    }

    const onCancelSurgeryClick = () => {
        setSurgeryShow(false)
    }

    const handleEditSurgeryClick = surgery => {
        setView('edit-surgery')
        setSurgery(surgery)
    }

    const handleSurgeryEdited = () => {
        clearView()
        setStamp(Date.now())
        setSurgeryShow(false)
        setView(null)
    }
    const handleReturnToSurgeriesClick = () => {
        setSurgeryShow(false)
        setProductsListShow(false)
    }

    const handleProductsListClick = () => {
        setSurgeryShow(false)
        setProductsListShow(true)
    }

    
    const handleCreateSurgeryClick = () => {
        setSurgeryShow(true)
        setProductsListShow(false)
    }


    const handleEditSurgeryCancelClick = () => clearView()

    logger.debug('Home -> render')

    return <>

        <div className="bg-[#D1EFFA] flex flex-col h-screen">
            <div className="">

                <Navbar showCreateSurgery={toogleSurgeryForm} onUserLoggedOut={onLogout} showProductsList={toogleProductsForm} showSurgeriesList={toogleSurgeryList} handleProductsListClick={handleProductsListClick}handleReturnToSurgeriesClick={handleReturnToSurgeriesClick}handleCreateSurgeryClick={handleCreateSurgeryClick} />
            </div>
            <main className="flex flex-col items-center my-[40px] px-[5vw] bg-[#D1EFFA] rounded-sm">

                <div className="">

                    {surgeryShow && <CreateSurgery onCancelClick={onCancelSurgeryClick} onSurgeryCreated={handleSurgeryCreated} />} 

                    {!surgeryShow && view !== 'edit-surgery' && !productsListShow && <SurgeryList stamp={stamp} onEditSurgeryClick={handleEditSurgeryClick} />}

                    {productsListShow  && view !== 'edit-surgery' && <ProductsList stamp={stamp} />}

                    {view === 'edit-surgery' && !surgeryShow && !productsListShow && <EditSurgery surgery={surgery} onCancelClick={handleEditSurgeryCancelClick} onSurgeryEdited={handleSurgeryEdited} />}

                </div>


                <footer >


                </footer>
            </main>
        </div>
    </>
}

export default Home