import mongoose from 'mongoose'

import { User } from '../data/index.ts'

import logic from "./index.ts";
import { expect } from "chai";
import { errors } from 'com'

const { CredentialsError, NotFoundError } = errors


describe('authenticateUser', () => {

    before(() => mongoose.connect('mongodb://localhost:27017/test'))


    it('succeeds on existing user and correct credentials', () =>
        User.deleteMany()
            .then(() =>
                User.create({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }))
            .then(user =>
                //nos llevamos el result que es el objeto donde sacamos los parametros para logear, ahora cambia al user creado
                logic.authenticateUser('peperoni', '123qwe123')
                    .then(userId => {


                        expect(userId).to.be.a('string')
                        //esperamos que sea un string después de convertirlo
                        expect(userId).to.equal(user.id)
                        //aquí la comprobaciónequitativa de strings

                    })
            )
    )
    // users.findOne({ _id: new ObjectId(userId) })
    // buscamos con el parametro id que conseguimos del user (typescript nos tacha ObjectId hasta que validamos)
    // .then(user => {
    //     try {
    //         expect(user.status).to.equal('online')




    it('fails on existing user and incorrect password', () =>
        User.deleteMany()

            .then(() =>
                User.create({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }))
            .then(() =>

                logic.authenticateUser('peperoni', '123qwe123qwe'))
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong password')

            })
    )




    it('fails on existing user and incorrect username', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }))
            .then(() => logic.authenticateUser('peperoni2', '123qwe123'))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    )

    // TODO add other unhappy test cases

    after(() => mongoose.disconnect())
})