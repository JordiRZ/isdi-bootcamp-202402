//@ts-nocheck

import { logger } from '../utils'

import CancelButton from './library/CancelButton'

import logic from '../logic'
import SubmitButton from './library/SubmitButton'


import { useContext } from '../context'

function EditSurgery(props) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const text = form.text.value

        logger.debug('EditSugery -> handleSubmit', text)

        try {
            logic.modifySurgery(props.surgery.id, text)
                .then(() => {
                    form.reset()

                    props.onSurgeryEdited()
                })
                .catch(error => showFeedback(error), 'error')
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('EditSurgery -> render')

    return <section className="edit-surgery">
        <form onSubmit={handleSubmit}>
            <label>Text</label>
            <input id="text" type="text" defaultValue={props.surgery.text} />

            <SubmitButton>Save</SubmitButton>
        </form>

        <CancelButton onClick={handleCancelClick} />
    </section>
}

export default EditSurgery