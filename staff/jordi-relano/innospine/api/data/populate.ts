import mongoose from 'mongoose'
import { User, Product, Surgery } from '.'

mongoose.connect('mongodb://localhost:27017/innospine')
    .then(() => Promise.all([
        User.deleteMany(),
        Product.deleteMany(),
        Surgery.deleteMany()
    ]))
    .then(() => Promise.all([
        User.create([
            { name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }
        ]),
        Product.create([
            { name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 },
            { name: 'cervical cage', type: 'implant', surgeryType: 'cervical anterior', image: 'Image URL 2', description: 'Description', price: 100 },
            { name: 'Screwdriver', type: 'Instrument', surgeryType: 'cervical anterior', image: 'Image URL 3', description: 'Description', price: 50 },
            { name: 'Cobb', type: 'Instrument', surgeryType: 'lumbar posterior', image: 'Image URL 4', description: 'Description', price: 70 }
        ])
    ]))
    .then(([users, products]) => {
        return Surgery.create([
            {
                author: users[0]._id,
                surgeryDate: new Date(),
                name: 'Lumbar Posterior Artrodesis',
                products: [products[3]._id],
                type: 'Lumbar posterior',
                hospital: 'hospital',
                note: 'note'
            }
        ])
    })
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error);