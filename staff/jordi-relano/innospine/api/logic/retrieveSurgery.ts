import { Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

import { UserType, User, Surgery, SurgeryType } from '../data/index.ts'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

function retrieveSurgery(userId: string, targetSurgeryId: string): Promise<{ name: string, email: string }> {
    validate.text(userId, 'userId', true)
    validate.text(targetSurgeryId, 'targetUserId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Surgery.findById(targetSurgeryId).lean()
        })
        .then(user => {
            if (!user) throw new NotFoundError('target user not found')

            return { name: user.name, email: user.email }
        })
}

export default retrieveSurgery