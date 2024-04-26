//@ts-nocheck

import { validate, errors } from 'com'
import { Product, User, Surgery } from '../data/index.ts'
import { ObjectId, Schema } from 'mongoose'
const { Types: { ObjectId } } = Schema

const { SystemError, NotFoundError } = errors

function retrieveSurgeries(userId): Promise<[{ id: string, author: ObjectId, surgeryDate: Date,name: string, products: [ObjectId], type: string, hospital: string, note: string }] | { id: string; author: ObjectId; surgeryDate: Date; name: string; products: [ObjectId]; type: string; hospital: string; note: string; }[]> {
    validate.text(userId, 'userId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Product.find().lean()
        })
        .then(surgeries => {
            if (!surgeries) throw new NotFoundError('surgeries not found')

            return surgeries


        })



}




export default retrieveSurgeries