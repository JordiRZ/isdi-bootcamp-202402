import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Surgery, User, Product } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { Types: { ObjectId } } = mongoose

dotenv.config()

const { CredentialsError } = errors

describe('retrieveProducts', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you get an array of objects destructured', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then(user =>
                                        Promise.all([
                                            Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 }),
                                            Product.create(
                                                { name: 'cervical cage', type: 'implant', surgeryType: 'cervical anterior', image: 'Image URL 2', description: 'Description', price: 100 }),
                                            Product.create(
                                                { name: 'Screwdriver', type: 'Instrument', surgeryType: 'cervical anterior', image: 'Image URL 3', description: 'Description', price: 50 }),
                                            Product.create(
                                                { name: 'Cobb', type: 'Instrument', surgeryType: 'lumbar posterior', image: 'Image URL 4', description: 'Description', price: 70 })

                                        ])

                                            .then(([product1, product2, product3, product4]) =>
                                                logic.retrieveProducts(user.id)
                                                    .then(products => {
                                                        expect(products).to.have.lengthOf(4)

                                                        const product1b = products.find(product => product.name === product1.name)


                                                        expect(product1b.name).to.deep.equal('lumbar cage')
                                                        expect(product1b.price).to.equal(product1.price)
                                                        expect(product1b.description).to.equal(product1.description)


                                                        const product2b = products.find(product => product.name === product2.name)

                                                        expect(product2b.name).to.equal('cervical cage')
                                                        expect(product2b.price).to.equal(product2.price)
                                                        expect(product2b.description).to.equal(product2.description)

                                                        const product3b = products.find(product => product.name === product3.name)

                                                        expect(product3b.name).to.equal('Screwdriver')
                                                        expect(product3b.price).to.equal(product3.price)
                                                        expect(product3b.description).to.deep.equal(product3.description)


                                                        const product4b = products.find(product => product.name === product4.name)

                                                        expect(product4b.name).to.equal('Cobb')
                                                        expect(product4b.description).to.deep.equal(product4.description)
                                                        expect(product4b.price).to.equal(product4.price)

                                                    })

                                            )
                                    )
                            )

                    )
            )
    )

    it('throws an error if user is not found', () =>
        logic.retrieveProducts('nonexistentUserId')
            .catch(error => {
                expect(error.name).to.equal('SystemError')

            })
    )
    it('throws an error if user ID is invalid', () =>
        logic.retrieveProducts('invalidUserId')
            .catch(error => {
                expect(error.name).to.equal('SystemError')

            })
    )


    after(() => mongoose.disconnect())
})
