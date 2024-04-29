//@ts-nocheck

import { validate, errors } from 'com'
import { Product, User, Surgery } from '../data/index.ts'
import { ObjectId, Schema } from 'mongoose'
const { Types: { ObjectId } } = Schema

const { SystemError, NotFoundError } = errors

function retrieveSurgeries(userId): Promise<[{ id: string, author: ObjectId, surgeryDate: Date, name: string, products: [ObjectId], type: string, hospital: string, note: string }] | { id: string; author: ObjectId; surgeryDate: Date; name: string; products: [ObjectId]; type: string; hospital: string; note: string; }[]> {
    validate.text(userId, 'userId', true)




    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {

            if (!user) throw new NotFoundError('user not found')

            return Surgery.find().populate('products', 'name').lean()
                .catch(error => { throw new SystemError(error.message) })

                .then(surgeries => {


                    return surgeries.map(({ _id, author, surgeryDate, name, products, type, hospital, note }) => ({
                        id: _id.toString(),
                        author: author._id.toString(),
                        surgeryDate: surgeryDate.toLocaleString('gb-GB'),
                        name,
                        products:
                            products.map(product => product.name)
                        ,
                        type,
                        hospital,
                        note
                    })).reverse()
                }





                )



        })



}




export default retrieveSurgeries