//@ts-nocheck

import { validate, errors } from 'com'
import { User, Product, Surgery } from '../data/index.ts'
import mongoose from 'mongoose'

const { SystemError, NotFoundError } = errors

function updateSurgery(surgeryId: string, userId: string, products: string[], surgeryDate: string, name: string, type: string, hospital: string, note: string): Promise<void> {

    validate.text(surgeryId, 'surgeryId')
    validate.text(userId, 'userId', true)
    validate.text(name, 'name')
    validate.text(type, 'type')
    validate.text(hospital, 'hospital')
    validate.text(surgeryDate, 'surgeryDate')

    if (note)
        validate.text(note, 'note')

    const productIds = products.map(productId => new mongoose.Types.ObjectId(productId))

    return Product.find({ _id: { $in: productIds } })
        .catch(error => { throw new SystemError(error.message) })
        .then(selectedProducts => {
            if (selectedProducts.length !== products.length) {
                throw new NotFoundError('products not found')
            }

            return Surgery.updateOne({ _id: surgeryId, author: userId }, {
                $set: {
                    name,
                    type,
                    hospital,
                    note,
                    surgeryDate: new Date(surgeryDate),
                    products: selectedProducts
                }
            })
                .catch(error => { throw new SystemError(error.message) })




        })
        .then(() => { })

}

export default updateSurgery