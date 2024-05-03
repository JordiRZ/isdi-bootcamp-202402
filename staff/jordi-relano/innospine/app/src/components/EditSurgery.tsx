//@ts-nocheck

import { logger } from '../utils'
import CancelButton from './library/CancelButton'
import logic from '../logic'
import SubmitButton from './library/SubmitButton'
import { useEffect, useState } from 'react'
import { useContext } from '../context'

function EditSurgery({surgery, onSurgeryEdited, onCancelClick }) {
    const { showFeedback } = useContext()
    const [products, setProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    

    useEffect(() => {
        logic.retrieveProducts()
            .then(products => setProducts(products))
            .catch(error => console.error(error))
    }, [])

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        // const surgeryId = 

        const surgeryDate = form.surgeryDate.value
        const name = form.name.value
        const products = form.products.value = selectedProducts.map(product => product._id)
        const type = form.type.value
        const hospital = form.hospital.value
        const note = form.note.value
        


        try {
            logic.updateSurgery(surgery.id, surgeryDate, name, products, type, hospital, note)
                .then(() => {
                    form.reset()

                    onSurgeryEdited()
                })
                .catch(error => showFeedback(error), 'error')
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleProductChange = event => {
        const selectedProductId = event.target.value
        const selectedProduct = products.find(product => product._id === selectedProductId)

        setSelectedProducts(prevProducts => [...prevProducts, selectedProduct])
    }

    const handleCancelClick = () => onCancelClick()

    logger.debug('EditSurgery -> render')

    return <section className="edit-surgery">
        <form onSubmit={handleSubmit}>

            
            <label className="text-lg font-semibold" htmlFor="surgeryDate">Surgery Date</label>
            <input className="border border-blue-400 rounded px-3 py-2" type="datetime-local" id="surgeryDate" min={Date.now()} />

            <label className="text-lg font-semibold" htmlFor="name">Surgery Name</label>
            <input className="border  border-blue-400 rounded px-3 py-2" type="text" id="name" />

            <label className="text-lg font-semibold" htmlFor="products">Products</label>
            <select id="products" onChange={handleProductChange}>
                {products.map(product => (
                    <option key={product._id} value={product._id}>{product.name}-${product.price}{product.description}</option>
                ))}
            </select>

            <label className="text-lg font-semibold" htmlFor="type">Type</label>
            <input className="border  border-blue-400 rounded px-3 py-2" type='text' id="type" />

            <label className="text-lg font-semibold" htmlFor="hospital">Hospital</label>
            <input className="border  border-blue-400 rounded px-3 py-2" type="text" id="hospital" />

            <label className="text-lg font-semibold" htmlFor="note">Note</label>
            <input className="border border-blue-400 rounded px-3 py-2" type="text" id="note" />

            <SubmitButton>Save</SubmitButton>
        </form>

        <CancelButton onClick={handleCancelClick} />
    </section>
}

export default EditSurgery