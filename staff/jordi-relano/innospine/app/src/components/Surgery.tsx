//@ts-nocheck

import { logger } from '../utils'

import { Link } from 'react-router-dom'

import logic from '../logic'

import Confirm from './Confirm'

import { useContext } from '../context'

function Surgery({ item: surgery, onEditClick, onDeleted, surgeryShow }) {
    const { showFeedback, showConfirm } = useContext()
    // && Date.now() > surgery.surgeryDate
    const handleDeleteClick = surgeryId =>
        showConfirm('Are you sure to delete the surgery?', (confirmed) => {
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

    const countProducts = (products) => {
        const productCounts = {}

        products.forEach(product => {
            if (productCounts[product]) {
                productCounts[product]++
            } else {
                productCounts[product] = 1
            }
        })

        return productCounts
    }

    const productCounts = countProducts(surgery.products)

    logger.debug('Surgery -> render')

    return <article className="p-4 border rounded-lg shadow-md bg-white mb-4 grid grid-cols-2">
        <div className="col-span-1 pr-4">
            <h2 className="text-lg font-semibold mb-2"><span className="font-normal">{surgery.name}</span></h2>
            <p><span className="font-normal">Date:</span> <span className="font-semibold">{surgery.surgeryDate}h</span></p>
            <p><span className="font-normal">Product:</span></p>
            <ul>
                {Object.entries(productCounts).map(([product, count]) => (
                    <li className='font-semibold' key={product}><span className="font-normal">{product}</span> ({count})</li>
                ))}
            </ul>
            <p><span className="font-normal">Hospital:</span> <span className="font-semibold">{surgery.hospital}</span></p>
            <p><span className="font-normal">Type:</span> <span className="font-semibold">{surgery.type}</span></p>
            <p><span className="font-normal">Creation date:</span> <span className="font-semibold">{surgery.creationDate}h</span></p>
        </div>
        <div className="col-span-1 pl-4 border-l-2 border-blue-200 flex flex-col">
            <div className="mb-2">
                <span className="font-normal">Note:</span> <span className="font-semibold">{surgery.note}</span>
            </div>
        </div>
        <div className="col-span-2 flex flex-col justify-center mt-2">
            <button className="bg-[#bad8fd] mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(surgery)}>Edit</button>
            <button className="bg-[#ffffff] hover:bg-red-700 text-red-600 font-bold py-2 px-4 rounded" onClick={() => handleDeleteClick(surgery.id)}>Delete</button>
        </div>
    </article>
}

export default Surgery