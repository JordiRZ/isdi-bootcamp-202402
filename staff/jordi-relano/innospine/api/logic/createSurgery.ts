

import { validate, errors } from 'com'


import { User, Product, Surgery } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

import mongoose from 'mongoose'

import { ObjectId } from 'mongoose'

function createSurgery(userId: string, doctorProducts: string[],creationDate:string, surgeryDate: string, name: string, type: string, hospital: string, note: string): Promise<void> {

    validate.text(name, 'name')
    validate.text(type, 'type')
    validate.text(hospital, 'hospital')
    validate.text(userId, 'userId', true)
    // validate.text(productsId, 'productsId', true)
    //  TO DO
    if (note)
        validate.text(note, 'note')
    validate.text(surgeryDate, 'surgeryDate')
    validate.text(creationDate, 'creationDate')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            const productIds = doctorProducts.map(productId => new mongoose.Types.ObjectId(productId))

            // return Product.find()
            //     .catch(error => { throw new SystemError(error.message) })
            //     .then(products => {
            //         const allProductsIds = products.map(product => product._id.toString())

            //         const productsResult = allProductsIds.includes(doctorProducts)

            return Product.find({ _id: { $in: productIds } })
            .catch(error => { throw new SystemError(error.message) })
            .then(selectedProducts => {
                if (selectedProducts.length !== doctorProducts.length) {
                    throw new NotFoundError('products not found')
                }
                    const fechaFormateada = new Date(surgeryDate)
                    

                    return Surgery.create({ author: user._id, products: selectedProducts,creationDate: new Date(), surgeryDate: fechaFormateada, name, type, hospital, note })
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then(surgery => { })

        })
}


export default createSurgery











