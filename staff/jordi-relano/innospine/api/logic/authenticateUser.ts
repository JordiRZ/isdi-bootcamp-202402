import { validate, errors } from 'com'

import { User } from '../data/index.ts'
import { ContentError } from 'com/errors.ts'

const { SystemError, CredentialsError, NotFoundError } = errors

function authenticateUser(email: string, password: string): Promise<string> {
    validate.email(email)
    validate.password(password)

    return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            if (user.password !== password)
                throw new CredentialsError('wrong password')

            if (user.email !== email)
                throw new CredentialsError('wrong email')

            return user.id
        })

}

export default authenticateUser