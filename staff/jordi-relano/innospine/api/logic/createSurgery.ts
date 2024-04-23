import { validate, errors } from 'com'

import { User, Product, Surgery } from '../data/index.ts'




const { SystemError, NotFoundError } = errors

function createSurgery(userId: string, surgeryDate: string, name: string, productId: string, type: string, hospital: string, note: string): Promise<void> {

    validate.text(name, 'name')
    validate.text(type, 'type')
    validate.text(hospital, 'hospital')
    validate.text(userId, 'userId', true)
    validate.text(productId, 'productId', true)
    if (note)
        validate.text(note, 'note')
    validate.date(surgeryDate, 'date')


    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Surgery.create({ author: user._id, surgeryDate: new Date(), name, productId, type, hospital, note })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(surgery => { })
}

export default createSurgery











