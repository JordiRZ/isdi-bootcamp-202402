//@ts-nocheck

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { errors } from 'com'

import logic from './index.ts'
import { Surgery, User, Product } from '../data/index.ts'

dotenv.config()

const { SystemError, NotFoundError } = errors

describe('updateSurgery', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('should update surgery with valid data', () => {
        User.deleteMany()
            .then(() => Product.deleteMany())
            .then(() => Surgery.deleteMany())
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user => {
                return Product.create({ name: 'Test Product', type: 'test', surgeryType: 'test', image: 'test.jpg', description: 'Test description', price: 10 })
                    .then(product => {
                        return Surgery.create({ author: user.id, surgeryDate: new Date(), name: 'Test Surgery', products: [product.id], type: 'test', hospital: 'Test Hospital', note: 'Test note' })
                            .then(surgery => {
                                const updatedSurgeryDate = '5/2/2024, 1:00:00'
                                const updatedName = 'Updated Surgery'
                                const updatedType = 'Updated Type'
                                const updatedHospital = 'Updated Hospital'
                                const updatedNote = 'Updated note'

                                return logic.updateSurgery(surgery.id, user.id, [product.id], updatedSurgeryDate, updatedName, updatedType, updatedHospital, updatedNote)
                                    .then(() => Surgery.findById(surgery.id))
                                    .then(updatedSurgery => {
                                        expect(updatedSurgery.surgeryDate).to.be.instanceOf(Date)
                                        expect(updatedSurgery.name).to.equal(updatedName)
                                        expect(updatedSurgery.type).to.equal(updatedType)
                                        expect(updatedSurgery.hospital).to.equal(updatedHospital)
                                        expect(updatedSurgery.note).to.equal(updatedNote)
                                        expect(updatedSurgery.products.map(product => product.toString())).to.include(productId)
                                    })
                            })
                    })
            })

    })

    it('should throw NotFoundError when surgeryId does not exist', () => {
        const invalidSurgeryId = new mongoose.Types.ObjectId().toString()
        const userId = new mongoose.Types.ObjectId().toString()
        const productId = new mongoose.Types.ObjectId().toString()

        return logic.updateSurgery(invalidSurgeryId, userId, [productId], '2024-05-15', 'Updated Surgery', 'Updated Type', 'Updated Hospital', 'Updated note')
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
            })
    })

    it('should throw NotFoundError when userId does not match surgery author', () => {
        const surgeryId = new mongoose.Types.ObjectId().toString()
        const otherUserId = new mongoose.Types.ObjectId().toString()
        const productId = new mongoose.Types.ObjectId().toString()

        return logic.updateSurgery(surgeryId, otherUserId, [productId], '2024-05-15', 'Updated Surgery', 'Updated Type', 'Updated Hospital', 'Updated note')
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
            })
    })

    after(() => mongoose.disconnect())
})