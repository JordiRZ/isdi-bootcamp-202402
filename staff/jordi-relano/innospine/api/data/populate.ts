import mongoose from 'mongoose'
import { User, Hospital, Implant, Instrument, Supplier, Surgery } from '.'

mongoose.connect('mongodb://localhost:27017/innospine')
    .then(() => Promise.all([
        User.deleteMany(),
        Hospital.deleteMany(),
        Implant.deleteMany(),
        Instrument.deleteMany(),
        Supplier.deleteMany(),
        Surgery.deleteMany()
    ]))
    .then(() => Promise.all([
        User.create([
            { name: 'equipo clavel', email: 'equipo@clavel.com', username: 'clavel', password: '1Z', specialization: 'trauma' }
        ]),
        Hospital.create([
            { name: 'Hospital Quiron', address: 'Plaça Alfonso Comín, 7, Gràcia, 08023 Barcelona' },
            { name: 'Hospital General Cataluña', address: 'Hospital General, Carrer de Pedro i Pons, 1, 08195 Barcelona' }
        ]),
        Implant.create([
            { name: 'lumbar cage', typology: 'trauma', image: 'Image URL 1', description: 'Description 1', price: 200 },
            { name: 'cervical cage', typology: 'neuro', image: 'Image URL 2', description: 'Description 2', price: 100 }
        ]),
        Instrument.create([
            { name: 'Instrument 1', typology: 'Type 1', image: 'Image URL 1', description: 'Description 1', lendPrice: 50 },
            { name: 'Instrument 2', typology: 'Type 2', image: 'Image URL 2', description: 'Description 2', lendPrice: 70 }
        ]),
        Supplier.create([
            { name: 'Supplier 1', email: 'supplier1@example.com', typology: 'cervical' },
            { name: 'Supplier 2', email: 'supplier2@example.com', typology: 'trauma' }
        ])
    ]))
    .then(([users, hospitals, implants, instruments]) => {
        return Surgery.create([
            {
                userId: users[0]._id,
                date: new Date(),
                surgeryId: 1,
                surgeryName: 'Surgery 1',
                implantRequested: [implants[0]._id],
                instrumentRequested: [instruments[0]._id],
                surgeryTypology: 'Type 1',
                hospital: 'hospital',
                status: 'created'
            }
        ])
    })
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error);