import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Surgery, User, Product } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { Types: { ObjectId } } = mongoose

dotenv.config()

const { NotFoundError } = errors

describe('createSurgery', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when a surgery is created while authorId matches with the surgery author, also productsId from frontend matches with products from your DB, and every field is filled properly (note not necessary) ', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then((user) =>
                                        Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 })
                                            .then((product) => {
                                                // const currentDate = new Date();
                                                // const formattedDate = currentDate.toISOString().slice(0, 10)
                                                // formattedDate.toString()
                                                logic.createSurgery(user.id, product.id, '24/05/12', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 'we need more implants')
                                                    .then(() =>
                                                        Surgery.findOne({})
                                                            .then(surgery => {
                                                                expect(surgery.author.toString()).to.equal(user.id)
                                                                expect(surgery.creationDate).to.be.instanceOf(Date)
                                                                expect(surgery.surgeryDate).to.be.instanceOf(Date)
                                                                expect(surgery.surgeryDate).to.equal('24/05/12')
                                                                expect(surgery.name).to.equal('Lumbar Posterior Artrodesis')
                                                                expect(surgery.author.toString()).to.equal(product.id)
                                                                expect(surgery.type).to.equal('Lumbar Posterior')
                                                                expect(surgery.hospital).to.equal('hospital')
                                                                expect(surgery.note).to.equal('we need more implants')
                                                            })
                                                    )
                                            })
                                    )
                            )
                    )
            )
    )
    it('fails the userId is not matching with the authorId', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then((user) =>
                                        Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 })
                                            .then((product) => {
                                                expect(logic.createSurgery(new ObjectId().toString(), product.id, '24/05/12', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 'we need more implants'))
                                            })
                                    )
                            )
                    )
            )
    )
    it('fails when the productId is not matching with the products in your DB', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then((user) =>
                                        Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 })
                                            .then((product) => {
                                                expect(logic.createSurgery(user.id, [new ObjectId().toString()], '24/05/12', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 'we need more implants'))
                                            })
                                    )
                            )
                    )
            )
    )
    it('fails when doctors create a surgery the productId is not matching with the products in your DB', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then((user) =>
                                        Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 })
                                            .then((product) => {
                                                expect(logic.createSurgery(user.id, [new ObjectId().toString()], '24/05/12', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 'we need more implants'))
                                            })
                                    )
                            )
                    )
            )
    )
    after(() => mongoose.disconnect())
})
