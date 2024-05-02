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

    let userId
    let surgeryId
    let productId

    beforeEach(() => {
        return User.deleteMany()
            .then(() => Product.deleteMany())
            .then(() => Surgery.deleteMany())
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user => {
                userId = user.id
                return Product.create({ name: 'Test Product', type: 'test', surgeryType: 'test', image: 'test.jpg', description: 'Test description', price: 10 })
            })
            .then(product => {
                productId = product.id
                return Surgery.create({ author: userId, surgeryDate: new Date(), name: 'Test Surgery', products: [productId], type: 'test', hospital: 'Test Hospital', note: 'Test note' })
            })
            .then(surgery => {
                surgeryId = surgery.id
            })
    })

    it('should update surgery with valid data', () => {
        const updatedSurgeryDate = new Date('2024-05-15')
        const updatedName = 'Updated Surgery'
        const updatedType = 'Updated Type'
        const updatedHospital = 'Updated Hospital'
        const updatedNote = 'Updated note'

        return logic.updateSurgery(surgeryId, userId, [productId], updatedSurgeryDate.toISOString(), updatedName, updatedType, updatedHospital, updatedNote)
            .then(() => Surgery.findById(surgeryId))
            .then(updatedSurgery => {
                expect(updatedSurgery).to.exist
                expect(updatedSurgery.surgeryDate).to.eql(updatedSurgeryDate)
                expect(updatedSurgery.name).to.equal(updatedName)
                expect(updatedSurgery.type).to.equal(updatedType)
                expect(updatedSurgery.hospital).to.equal(updatedHospital)
                expect(updatedSurgery.note).to.equal(updatedNote)
                expect(updatedSurgery.products.map(p => p.toString())).to.include(productId)
            })
    })

    it('should throw NotFoundError when surgeryId does not exist', () => {
        const invalidSurgeryId = new mongoose.Types.ObjectId().toString()

        return logic.updateSurgery(invalidSurgeryId, userId, [productId], '2024-05-15', 'Updated Surgery', 'Updated Type', 'Updated Hospital', 'Updated note')
            .catch(error => {
                expect(error).to.be.an.instanceOf(NotFoundError)
            })
    })

    it('should throw NotFoundError when userId does not match surgery author', () => {
        const otherUserId = new mongoose.Types.ObjectId().toString()

        return logic.updateSurgery(surgeryId, otherUserId, [productId], '2024-05-15', 'Updated Surgery', 'Updated Type', 'Updated Hospital', 'Updated note')
            .catch(error => {
                expect(error).to.be.an.instanceOf(NotFoundError)
            })
    })

    after(() => mongoose.disconnect())
})