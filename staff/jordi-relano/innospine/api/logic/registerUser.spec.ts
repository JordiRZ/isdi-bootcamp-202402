import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from '../data/index.ts'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'
import { log } from 'console'

dotenv.config()

const { DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds a new user', () =>
        User.deleteMany()
            .then(() => logic.registerUser('equipo clavel', 'equipo@clavel.com', '1Z'))
            .then(() => User.findOne({ email: 'equipo@clavel.com' }))
            .then(user => {
                console.log('User:', user)
                expect(!!user).to.be.true
                expect(user.name).to.equal('equipo clavel')
                expect(user.email).to.equal('equipo@clavel.com')
                expect(user.password).to.equal('1Z')
            })
    )

    it('fails on existing users', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z'}))
            .then(() =>
                logic.registerUser('equipo clavel', 'equipo@clavel.com', '1Z')
                    .catch(error => {
                        expect(error).to.be.instanceOf(DuplicityError)
                        expect(error.message).to.equal('user already exists')
                    })
            )
    )

    it('fails on non string name', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.registerUser(123, 'equipo@clavel.com',  '1Z')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('name 123 is not a string')
    })

    it('fails on empty name', () => {
        let errorThrown

        try {
            logic.registerUser('', 'equipo@clavel.com',  '1Z')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('name >< is empty or blank')
    })

    after(() => mongoose.disconnect())
})