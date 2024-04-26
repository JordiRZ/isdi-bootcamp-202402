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

    return <article>
        {/* <h3><Link to={`/${surgery.author.username}`}>{surgery.author.username}</Link></h3> */}

        <p>{surgery.name}</p>

        {/* <img src={surgery.image} /> */}

        <p>{surgery.surgeryDate}</p>

        <p>{surgery.productId}</p>

        <p>{surgery.type}</p>

        <p>{surgery.hospital}</p>

        <p>{surgery.note}</p>

        {/* <time>{new Date(surgery.date).toLocaleString('en-CA')}</time> */}

        {logic.getLoggedInUserId() === surgery.author.id && <>
            <button onClick={() => handleDeleteClick(surgery.id)}>🗑️</button>
            <button onClick={() => handleEditClick(surgery)}>📝</button>
        </>}
    </article>
}

export default Surgery