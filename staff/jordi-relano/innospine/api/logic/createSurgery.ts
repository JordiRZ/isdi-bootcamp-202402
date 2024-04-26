import { validate, errors } from 'com'


import { User, Product, Surgery } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

import { ObjectId } from 'mongoose'



function createSurgery(userId: string, productsId: [ObjectId], surgeryDate: string, name: string, type: string, hospital: string, note: string): Promise<void> {

    validate.text(name, 'name')
    validate.text(type, 'type')
    validate.text(hospital, 'hospital')
    validate.text(userId, 'userId', true)
    // validate.text(productsId, 'productsId', true) TO DO
    if (note)
        validate.text(note, 'note')
    validate.text(surgeryDate, 'surgeryDate')


    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Product.find()
                .catch(error => { throw new SystemError(error.message) })
                .then(products => {
                    const allProductsIds = products.map(product => product._id.toString())
                for (let i = 0; i < productsId.length; i++) {
                    const doesProductExist = allProductsIds.includes(productsId[i].toString())
                    if(!doesProductExist) {
                        throw new NotFoundError('product not found')
                    }

                }



                    
                    const fechaFormateada = new Date(surgeryDate)


                    return Surgery.create({ author: user._id, products: productsId ,surgeryDate: fechaFormateada, name,  type, hospital, note })
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then(surgery => { })

        })
    }


export default createSurgery











