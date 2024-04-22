import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type UserType = {
    name: string
    email: string
    password: string
    specialization: string
}

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    }

})

type HospitalType = {
    name: string
    address: string
}

const hospital = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

type ImplantType = {
    name: string
    typology: string
    image: string
    description: string
    price: number
}

const implant = new Schema({
    name: {
        type: String,
        required: true
    },
    typology: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})


type InstrumentType = {
    name: string
    typology: string
    image: string
    description: string
    lendPrice: number
}

const instrument = new Schema({
    name: {
        type: String,
        required: true
    },
    typology: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

type SupplierType = {
    name: string
    email: string
    typology: number
}

const supplier = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    typology: {
        type: String,
        required: true
    },
})

type SurgeryType = {
    userId: ObjectId
    date: Date
    surgeryId: number
    surgeryName: string
    implantRequested: ObjectId[]
    equipmentRequested: ObjectId[]
    surgeryTypology: string
    hospital: ObjectId
    status: string
}



const surgerySchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    surgeryId: {
        type: Number,
        required: true
    },
    surgeryName: {
        type: String,
        required: true
    },
    implantRequested: [
        {
            type: ObjectId,
            ref: 'Implant'
        }
    ],
    instrumentRequested: [
        {
            type: ObjectId,
            ref: 'Instrument'
        }],
    surgeryTypology: {
        type: String,
        required: true
    },
    hospital: {
        type: ObjectId,
        ref: 'Hospital',
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const User = model<UserType>('User', user)
const Hospital = model<HospitalType>('Hospital', hospital)
const Implant = model<ImplantType>('Implant', implant)
const Instrument = model<InstrumentType>('Instrument', instrument)
const Supplier = model<SupplierType>('Supplier', supplier)
const Surgery = model<SurgeryType>('Surgery', surgerySchema)


export {
    UserType,
    User,
    HospitalType,
    Hospital,
    ImplantType,
    Implant,
    InstrumentType,
    Instrument,
    SupplierType,
    Supplier,
    Surgery,
    SurgeryType
}





