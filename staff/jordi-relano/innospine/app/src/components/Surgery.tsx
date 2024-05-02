//@ts-nocheck

import { logger } from '../utils'

import { Link } from 'react-router-dom'

import logic from '../logic'


import { useContext } from '../context'

function Surgery({ item: surgery, onEditClick, onDeleted }) {
    const { showFeedback, showConfirm } = useContext()

    const handleDeleteClick = surgeryId =>
        showConfirm('delete surgery?', confirmed => {
            if (confirmed)
                try {
                    logic.removeSurgery(surgeryId)
                        .then(() => onDeleted())
                        .catch(error => showFeedback(error, 'error'))
                } catch (error) {
                    showFeedback(error)
                }
        })

    const handleEditClick = surgery => onEditClick(surgery)

    logger.debug('Surgery -> render')

    return <article className="p-4 border rounded-lg shadow-md bg-white mb-4">
        <h2 className="text-lg font-semibold mb-2">{surgery.name}</h2>

        <div className="grid grid-cols-2 gap-4 mb-2">
            <p><span className="font-semibold">Date:</span> {surgery.surgeryDate}</p>
            <p><span className="font-semibold">Product:</span> {surgery.products}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-2">
            <p><span className="font-semibold">Type:</span> {surgery.type}</p>
            <p><span className="font-semibold">Hospital:</span> {surgery.hospital}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-2">
            <p><span className="font-semibold">Note:</span> {surgery.note}</p>
        </div>


        <div className="flex justify-end mt-2">
            <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(surgery)}>📝 Editar</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteClick(surgery.id)}>🗑️ Eliminar</button>
        </div>

    </article>
}

export default Surgery