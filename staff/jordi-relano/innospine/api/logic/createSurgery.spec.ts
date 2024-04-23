import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Surgery, User, Product } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { CredentialsError } = errors

describe('createSurgery', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when doctors create a surgery with every field filled ', () =>
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
                                                const currentDate = new Date();
                                                const formattedDate = currentDate.toISOString().slice(0, 10)
                                                logic.createSurgery(user.id, formattedDate, 'Lumbar Posterior Artrodesis', product.id, 'Lumbar posterior', 'hospital', 'we need more implants')
                                                    .then(() =>
                                                        Surgery.findOne({})
                                                            .then(surgery => {
                                                                expect(surgery.author.toString()).to.equal(user.id)
                                                                expect(surgery.date).to.be.instanceOf(Date)
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
    after(() => mongoose.disconnect())
})
