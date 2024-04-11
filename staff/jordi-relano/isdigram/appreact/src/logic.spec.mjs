// import db from './data/index.mjs'
// import logic from './logic.mjs'

// describe('logic', () => {
//     describe('registerUser', () => {
//         it('succeeds a new user', () => {
//             data.users.deleteOne( (user) => {
//                 return user.username === 'peperoni'
//             })

//             logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123')

//             const user = data.users.findOne((user) => {
//                 return user.username === 'peperoni'
//             })

//             expect(!!user).toBe(true)
//             expect(user.name).toBe('Pepe Roni')
//             expect(user.birthdate).toBe('2000-01-01')
//             expect(user.email).toBe('pepe@roni.com')
//             expect(user.username).toBe('peperoni')
//             expect(user.password).toBe('123qwe123')
//         })

//         it('fails on existing users', () => {
//             data.users.deleteOne(function (user) {
//                 return user.username === 'peperoni'
//             })

//             data.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })

//             let errorThrown

//             try {
//                 logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123')
//             } catch (error) {
//                 errorThrown = error
//             }

//             expect(errorThrown).toBeInstanceOf(Error)
//             expect(errorThrown.message).toBe('user already exists')
//         })
//     })

//     // TODO test all methods
// })