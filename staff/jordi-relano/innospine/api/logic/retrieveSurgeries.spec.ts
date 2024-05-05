//@ts-nocheck

import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Surgery, User, Product } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'

const { Types: { ObjectId } } = mongoose
dotenv.config()

describe('retrieveSurgeries', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you get all your surgeries from your DB', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then(user =>
                                        Promise.all([
                                            Surgery.create({ author: user.id,creationDate: '4/2/2024, 1:00:00' , surgeryDate: '5/2/2024, 1:00:00', name: 'kilombo', products: ['66278dec16f309b63752bc30'], type: 'lumbar', hospital: 'quiron', note: 'kilombo does not works at all' }),
                                            Surgery.create({ author: user.id, creationDate: '4/3/2024,1:00:00', surgeryDate: '5/3/2024, 2:00:00', name: 'kilombo2', products: ['66278dec16f309b63752bc30'], type: 'cervical', hospital: 'safa', note: 'kilombo is working properly' })
                                        ])
                                            .then(([surgery1, surgery2]) =>
                                                logic.retrieveSurgeries(user.id)
                                                    .then(surgeries => {
                                                        
                                                        expect(surgeries).to.have.lengthOf(2)

                                                        const surgery1b = surgeries.find(surgery => surgery.name === surgery1.name)

                                                        console.log(surgery1b.author)

                                                        expect(surgery1b.author).to.equal(user.id)
                                                        expect(surgery1b.creationDate).to.equal('2/4/2024, 1:00:00')
                                                        expect(surgery1b.surgeryDate).to.equal('2/5/2024, 1:00:00')
                                                        expect(surgery1b.name).to.equal('kilombo')
                                                        expect(surgery1b.type).to.equal('lumbar')
                                                        expect(surgery1b.hospital).to.equal('quiron')
                                                        expect(surgery1b.note).to.equal('kilombo does not works at all')

                                                        const surgery2b = surgeries.find(surgery => surgery.name === surgery2.name)

                                                        expect(surgery2b.author).to.equal(user.id)
                                                        expect(surgery1b.creationDate).to.equal('3/4/2024, 1:00:00')
                                                        expect(surgery2b.surgeryDate).to.equal('3/5/2024, 2:00:00')
                                                        expect(surgery2b.name).to.equal('kilombo2')
                                                        expect(surgery2b.type).to.equal('cervical')
                                                        expect(surgery2b.hospital).to.equal('safa')
                                                        expect(surgery2b.note).to.equal('kilombo is working properly')
                                                    })
                                            )
                                    )
                            )
                    )
            )
    )
    after(() => mongoose.disconnect())
})

