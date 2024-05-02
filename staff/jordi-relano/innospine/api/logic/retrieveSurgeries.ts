//@ts-nocheck

import { validate, errors } from 'com'
import { Product, User, Surgery, SurgeryType } from '../data/index.ts'
import { ObjectId, Schema } from 'mongoose'
const { Types: { ObjectId } } = Schema

const { SystemError, NotFoundError } = errors

// interface SurgeryResponse {
//     id: string;
//     author: string;
// }

function retrieveSurgeries(userId): Promise<SurgeryType[]> {
    validate.text(userId, 'userId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {

            if (!user) throw new NotFoundError('user not found')

            return Surgery.find({ author: userId }).populate('products', 'name').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(surgeries => {
                    return surgeries.map<SurgeryType>(({ _id, author, surgeryDate, name, products, type, hospital, note }) => ({
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
                })
        })
}

export default retrieveSurgeries