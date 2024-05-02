//@ts-nocheck

import { validate, errors } from 'com'
import { User, Product, Surgery } from '../data/index.ts'
import mongoose from 'mongoose'

const { SystemError, NotFoundError } = errors

function updateSurgery(surgeryId: string, userId: string, doctorProducts: string[], surgeryDate: string, name: string, type: string, hospital: string, note: string): Promise<void> {

    validate.text(surgeryId, 'surgeryId')
    validate.text(userId, 'userId', true)
    validate.text(name, 'name')
    validate.text(type, 'type')
    validate.text(hospital, 'hospital')
    validate.text(surgeryDate, 'surgeryDate')

    if (note)
        validate.text(note, 'note')

    const productIds = doctorProducts.map(productId => new mongoose.Types.ObjectId(productId))

    return Product.find({ _id: { $in: productIds } })
        .then(selectedProducts => {
            if (selectedProducts.length !== doctorProducts.length) {
                throw new NotFoundError('One or more products not found')
            }

            const fechaFormateada = new Date(surgeryDate)

            return Surgery.updateOne({ _id: surgeryId, author: userId }, {
                
                
                $set: {
                    
                    name,
                    type,
                    hospital,
                    note,
                    surgeryDate: fechaFormateada,
                    products: selectedProducts
                }
            })
            
            
        })
        .catch(error => { throw new SystemError(error.message) })
}

export default updateSurgery