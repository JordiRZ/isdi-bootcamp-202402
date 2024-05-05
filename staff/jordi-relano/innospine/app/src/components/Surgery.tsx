//@ts-nocheck

import { logger } from '../utils'

import { Link } from 'react-router-dom'

import logic from '../logic'

import Confirm from './Confirm'


import { useContext } from '../context'

function Surgery({ item: surgery, onEditClick, onDeleted, surgeryShow }) {
    const { showFeedback, showConfirm } = useContext()

    const handleDeleteClick = surgeryId =>
        showConfirm('', (confirmed) => {
            if (confirmed) {
                try {
                    logic.removeSurgery(surgeryId)
                        .then(() => onDeleted())
                        .catch(error => showFeedback(error, 'error'))
                } catch (error) {
                    showFeedback(error)
                }
            }
        })

    const handleEditClick = surgery => onEditClick(surgery)

    logger.debug('Surgery -> render')

    return <article className="p-4 border rounded-lg shadow-md bg-white mb-4 grid grid-cols-2">
    <div className="col-span-1 pr-4">
        <h2 className="text-lg font-semibold mb-2">{surgery.name}</h2>
        <p><span className="font-semibold">Date:</span> {surgery.surgeryDate}</p>
        <p><span className="font-semibold">Product:</span> {surgery.products}</p>
        <p><span className="font-semibold">Hospital:</span> {surgery.hospital}</p>
        <p><span className="font-semibold">Type:</span> {surgery.type}</p>
    </div>
    <div className="col-span-1 pl-4 border-l-2 border-blue-200 flex flex-col">
        <div className="mb-2">
            <span className="font-semibold">Note:</span> {surgery.note}
        </div>
    </div>
    <div className="col-span-2 flex flex-col justify-center mt-2">
        <button className="bg-[#bad8fd] mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(surgery)}>Edit</button>
        <button className="bg-[#ffffff] hover:bg-red-700 text-red-600 font-bold py-2 px-4 rounded" onClick={() => handleDeleteClick(surgery.id)}>Delete</button>
    </div>
</article>
}

export default Surgery