//@ts-nocheck

import { logger } from '../utils'
import CancelButton from './library/CancelButton'
import logic from '../logic'
import SubmitButton from './library/SubmitButton'
import { useEffect, useState } from 'react'
import { useContext } from '../context'

function EditSurgery({ surgery, onSurgeryEdited, onCancelClick }) {
    const { showFeedback } = useContext()
    const [products, setProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    const [formData, setFormData] = useState({
        surgeryDate: surgery.surgeryDate || '',
        name: surgery.name || '',
        type: surgery.type || '',
        hospital: surgery.hospital || '',
        note: surgery.note || ''
    })


    useEffect(() => {
        logic.retrieveProducts()
            .then(products => setProducts(products))
            .catch(error => console.error(error))
    }, [])

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        // const surgeryId = 

        const products = selectedProducts.map(product => product._id)

        const { surgeryDate, name, type, hospital, note } = formData



        try {
            logic.updateSurgery(surgery.id, surgeryDate, name, products, type, hospital, note)
                .then(() => {
                    setFormData({
                        surgeryDate: '',
                        name: '',
                        type: '',
                        hospital: '',
                        note: ''
                    })
                    // form.reset()
                    setSelectedProducts([])
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

    const handleInputChange = event => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleCancelClick = () => onCancelClick()

    logger.debug('EditSurgery -> render')

    return (
        <section className="edit-surgery">
            <div className="p-4 border rounded-lg shadow-md bg-white mb-4">
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
            </div>

            <form onSubmit={handleSubmit}>
                <label className="text-lg font-semibold" htmlFor="surgeryDate">Surgery Date</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="datetime-local"
                    id="surgeryDate"
                    min={Date.now()}
                    value={formData.surgeryDate}
                    onChange={handleInputChange}
                />

                <label className="text-lg font-semibold" htmlFor="name">Surgery Name</label>
                <input
                    className="border  border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />

                <label className="text-lg font-semibold" htmlFor="products">Products</label>
                <select id="products" onChange={handleProductChange}>
                    {products.map(product => (
                        <option key={product._id} value={product._id}>{product.name}-€{product.price} {product.description}</option>
                    ))}
                </select>

                <label className="text-lg font-semibold" htmlFor="type">Type</label>
                <input
                    className="border  border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="type"
                    value={formData.type}
                    onChange={handleInputChange}
                />

                <label className="text-lg font-semibold" htmlFor="hospital">Hospital</label>
                <input
                    className="border  border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                />

                <label className="text-lg font-semibold" htmlFor="note">Note</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="note"
                    value={formData.note}
                    onChange={handleInputChange}
                />

                <SubmitButton>Save</SubmitButton>
            </form>

            <CancelButton onClick={handleCancelClick} />
        </section>
    )
}

export default EditSurgery