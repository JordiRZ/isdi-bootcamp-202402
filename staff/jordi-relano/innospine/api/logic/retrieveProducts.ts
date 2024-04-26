import { validate, errors } from 'com'
import { Product, User } from '../data/index.ts'
import { Schema } from 'mongoose'
const { Types: { ObjectId } } = Schema

const { SystemError, NotFoundError } = errors

function retrieveProducts(userId: string) {
    validate.text(userId, 'userId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Product.find().select('-_id name description price').lean()
        })
        .then(products => {
            if (!products) throw new NotFoundError('products not found')

            return products


        })



}




export default retrieveProducts