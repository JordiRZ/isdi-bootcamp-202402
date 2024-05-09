//@ts-nocheck
import { useContext } from '../context'
import BurguerButton from './library/BurguerButton'

import logic from '../logic'

import { useState, useEffect } from 'react'

import Logo from '../../../doc/images/Innospine.png'



function Navbar({ onUserLoggedOut,  handleReturnToSurgeriesClick, handleProductsListClick, handleCreateSurgeryClick }) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)

  const { showFeedback } = useContext()

  const handleToggleMenu = () => {
    setMenuOpen(!isOpen)
  }

  useEffect(() => {
    try {
      logic.retrieveUser()
        .then(setUser)
        .catch(error => showFeedback(error, 'error'))
    } catch (error) {
      showFeedback(error)
    }
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
    <header className="bg-sky-200 flex flex-col justify-between  px-5 py-3">

      <div className="flex items-center justify-between p-2">
        <img
          className="w-[120px]"
          src={Logo}
          alt="logo"
        />
        {user && <h1 className="text-3xl font-sans font-bold ml-30 mt-4">Hola Dr.{user.name}</h1>}

        <div className="sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)} type="button" className="block text-gray-500 hover:text-white focus:text-white focus:outline-none">
            {/* <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg> */}
          </button>
        </div>
      </div>

      <nav className={isOpen ? 'block' : 'hidden'} className="px-2 pt-2 pb-4 sm:flex sm:p-0">

        <button className="w-full h-[50px] flex justify-center items-center p-[10px] box-border  text-blue-700 font-semibold hover:bg-blue-100 rounded-md shadow-md mb-2" onClick={handleCreateSurgeryClick}>Create Surgery</button>
        <button className="w-full h-[50px] flex justify-center items-center p-[10px] box-border  text-blue-700 font-semibold hover:bg-blue-100 rounded-md shadow-md mb-2" onClick={handleProductsListClick}>Products List</button>
        <button className="w-full h-[50px] flex justify-center items-center p-[10px] box-border  text-blue-700 font-semibold hover:bg-blue-100 rounded-md shadow-md mb-2" onClick={handleReturnToSurgeriesClick}>Surgeries</button>

        <button className="w-full h-[50px] flex justify-center items-center p-[10px] box-border  text-blue-700 font-semibold hover:bg-blue-100 rounded-md shadow-md" onClick={handleLogoutClick}>Logout</button>
        {/* <a href="#" className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2">Messages</a> */}
      </nav>
    </header>
  )


}

export default Navbar