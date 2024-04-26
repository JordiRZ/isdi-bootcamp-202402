//@ts-nocheck

import { logger } from '../utils'

import CancelButton from './library/CancelButton'

import logic from '../logic'
import SubmitButton from './library/SubmitButton'

import { useState, useEffect } from 'react'

import { useContext } from '../context'


function CreateSurgery(props) {
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

        const surgeryDate = form.surgeryDate.value
        const name = form.name.value
        const products = form.products.value
        const type = form.type.value
        const hospital = form.hospital.value
        const note = form.note.value



        try {
            logic.createSurgery(userId, surgeryDate, name, products, type, hospital, note)
                .then(() => {
                    form.reset()

                    props.onSurgeryCreated()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleProductChange = event => {
        const productId = event.target.value

        setSelectedProducts(prevProducts => [...prevProducts, productId])
        console.log(selectedProducts)

    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('CreateSurgery -> render')

    return <section className="bg-blue-400 py-8 px-4">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="text-lg font-semibold" htmlFor="surgeryDate">SurgeryDate</label>
            <input className="border border-blue-400 rounded px-3 py-2" type="datetime-local" id="surgeryDate" min={Date.now()} />

            <label className="text-lg font-semibold" htmlFor="name">Name</label>
            <input className="border  border-blue-400 rounded px-3 py-2" type="text" id="name" />

            <label htmlFor="products">Productos:</label>
            <select id="products" onChange={handleProductChange}>
                {products.map(product => (
                    <option key={product._id} value={product._id}>{product.name} - ${product.price}</option>
                ))}
            </select>
            <div>
                { }
            </div>

            <label className="text-lg font-semibold" htmlFor="type">Type</label>
            <input className="border  border-blue-400 rounded px-3 py-2" type='text' id="type" />

            <label className="text-lg font-semibold" htmlFor="hospital">Hospital</label>
            <input className="border  border-blue-400 rounded px-3 py-2" type="text" id="hospital" />

            <label className="text-lg font-semibold" htmlFor="note">Note</label>
            <input className="border border-blue-400 rounded px-3 py-2" type="text" id="note" />

            <SubmitButton className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-300">Create Surgery</SubmitButton>
        </form>

        <CancelButton className="mt-4 bg-blue-300 text-blue-800 font-semibold py-2 rounded hover:bg-blue-400 transition duration-300" onClick={handleCancelClick} />
    </section>
}

export default CreateSurgery