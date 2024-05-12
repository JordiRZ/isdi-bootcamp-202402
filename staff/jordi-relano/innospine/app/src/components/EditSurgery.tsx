//@ts-nocheck

import { logger } from '../utils'
import CancelButton from './library/CancelButton'
import logic from '../logic'
import SubmitButton from './library/SubmitButton'
import { useEffect, useState } from 'react'
import { useContext } from '../context'

import moment from 'moment'

function EditSurgery({ surgery, onSurgeryEdited, onCancelClick }) {
    const { showFeedback } = useContext()
    const [products, setProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    // const [formData, setFormData] = useState({
    //     surgeryDate: surgery.surgeryDate || '',
    //     name: surgery.name || '',
    //     type: surgery.type || '',
    //     hospital: surgery.hospital || '',
    //     note: surgery.note || ''
    // })


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
        const productIds = selectedProducts.reduce((ids, { product, quantity }) => {
            for (let i = 0; i < quantity; i++) {
                ids.push(product.id);
            }

            return ids
        }, [])

        const type = form.type.value
        const hospital = form.hospital.value
        const note = form.note.value

        try {
            logic.updateSurgery(surgery.id, surgeryDate, name, productIds, type, hospital, note)
                .then(() => {

                    form.reset()
                    setSelectedProducts([])
                    onSurgeryEdited()
                })
                .catch(error => showFeedback(error), 'error')
        } catch (error) {
            showFeedback(error)
        }
    }


    const currentDate = new Date()
    const minDate = currentDate.toISOString().slice(0, 16)

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

    const handleProductChange = (event, product) => {
        const quantity = parseInt(event.target.value)

        if (isNaN(quantity) || quantity < 0) {
            console.error("Invalid quantity input")
            return
        }

        const existingProductIndex = selectedProducts.findIndex(selected => selected.product.id === product.id)
        if (existingProductIndex !== -1) {
            const updatedSelectedProducts = [...selectedProducts]
            updatedSelectedProducts[existingProductIndex].quantity = quantity
            // Se actualiza la cantidad con el nuevo valor en lugar de sumarla
            setSelectedProducts(updatedSelectedProducts)
        } else {
            setSelectedProducts([...selectedProducts, { product, quantity }])
        }
    }

    const handleCancelClick = () => onCancelClick()

    logger.debug('EditSurgery -> render')
    console.log("Surgery Date:", surgery.surgeryDate)

    return (
        <section className="flex justify-center items-center flex-col">
            <div className="p-4 border rounded-lg shadow-md bg-white mb-4 grid grid-cols-2">
                <div className="col-span-1 pr-4">
                    <h2 className="text-lg font-semibold mb-2"><span className="font-normal">{surgery.name}</span></h2>
                    <p><span className="font-normal">Date:</span> <span className="font-semibold">{moment(surgery.date).format('h:mm a, MMMM Do')}</span></p>
                    <p><span className="font-normal">Product:</span></p>
                    <ul>
                        {Object.entries(productCounts).map(([product, count]) => (
                            <li className='font-semibold' key={product}><span className="font-normal">{product}</span> ({count})</li>
                        ))}
                    </ul>
                    <p><span className="font-normal">Hospital:</span> <span className="font-semibold">{surgery.hospital}</span></p>
                    <p><span className="font-normal">Type:</span> <span className="font-semibold">{surgery.type}</span></p>
                    <p><span className="font-normal">Creation date:</span> <span className="font-semibold">{moment(surgery.creationDate).format('Do MMMM YYYY, h:mm a')}</span></p>
                </div>
                <div className="col-span-1 pl-4 border-l-2 border-blue-200 flex flex-col">
                    <div className="mb-2">
                        <span className="font-normal">Note:</span> <span className="font-semibold">{surgery.note}</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="w-[300px] flex flex-col  space-y-2 mb-8">
                <label className="text-lg font-semibold" htmlFor="surgeryDate">Surgery Date</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="datetime-local"
                    id="surgeryDate"
                    min={minDate}
                    defaultValue={surgery.surgeryDate ? moment(surgery.surgeryDate).format('YYYY-MM-DDTHH:mm') : ''}
                // onChange={handleInputChange}
                />

                <label className="text-lg font-semibold" htmlFor="name">Surgery Name</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="name"
                    defaultValue={surgery.name}
                // onChange={handleInputChange}
                />

                <label className="text-lg font-semibold" htmlFor="products">Products</label>
                {products.map(product => {
                    const quantityInDatabase = productCounts[product.name] || 0
                    // Obtener la cantidad del producto en la base de datos
                    return (
                        <div key={product.id} className="flex items-center justify-between">
                            <label htmlFor={`product-${product.id}`} className="uppercase mr-2">{product.name}</label>
                            <input
                                type="number"
                                id={`product-${product.id}`}
                                min="0"
                                defaultValue={quantityInDatabase} // Establecer la cantidad de la base de datos como defaultValue
                                onChange={event => handleProductChange(event, product)}
                                className="border border-blue-400 rounded px-2 py-1 w-16 text-center"
                            />
                        </div>
                    )
                })}
                <div className="border border-blue-400 rounded p-2">
                    <h2 className="text-lg font-semibold mb-2">Selected Products</h2>
                    {selectedProducts.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center justify-between">
                            <span className="mr-2">{product.name}</span>
                            <span className="font-semibold">{quantity}</span>
                        </div>
                    ))}
                </div>

                <label className="text-lg font-semibold" htmlFor="type">Type</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="type"
                    defaultValue={surgery.type}
                // onChange={handleInputChange}
                />

                <label className="text-lg font-semibold" htmlFor="hospital">Hospital</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="hospital"
                    defaultValue={surgery.hospital}
                // onChange={handleInputChange}
                />

                <label className="text-lg font-semibold" htmlFor="note">Note</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="note"
                    defaultValue={surgery.note}
                // onChange={handleInputChange}
                />

                <SubmitButton className="bg-blue-100 text-white font-semibold py-2 rounded hover:bg-blue-200 transition duration-300">Save</SubmitButton>
                <CancelButton onClick={handleCancelClick} />
            </form>


        </section>
    )
}

export default EditSurgery