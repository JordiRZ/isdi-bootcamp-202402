import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { User } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'
import { ContentError } from 'com/errors.ts'

dotenv.config()

const { CredentialsError } = errors

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds on existing user and correct credentials', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z'}))
            .then(user =>
                logic.authenticateUser('equipo@clavel.com', '1Z')
                    .then(userId => {
                        expect(userId).to.be.a('string')
                        expect(userId).to.equal(user.id)
                    })
            )
    )

    it('fails on existing email and incorrect password', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(() => logic.authenticateUser('equipo@clavel.com', '1ZZ'))
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong password')
            })
    )



    after(() => mongoose.disconnect())


})

