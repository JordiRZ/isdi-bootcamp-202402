import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Surgery, User, Product } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { Types: { ObjectId } } = mongoose

dotenv.config()

const { CredentialsError } = errors

describe('removeMeeting', () => {
    

    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('removes a meeting from existing user', () =>
        User.deleteMany()
            .then(() =>
                Surgery.deleteMany()
                    .then(() =>
                        Product.deleteMany()

                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then((user) =>
                                        Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 })
                                            .then(product =>
                                                Surgery.create({ author: user.id, surgeryDate: 2 / 5 / 2024, name: 'kilombo', products: [product.id], type: 'lumbar', hospital: 'quiron', note: 'kilombo does not works at all' })
                                                    .then(surgery => {

                                                        return logic.removeSurgery(surgery.id, user.id)
                                                    })
                                                    .then(() => Surgery.find({}))
                                                    .then(surgery => {
                                                        expect(surgery).to.deep.equal([]);
                                                    })
                                            )
                                    ))
                    )
            ))
})