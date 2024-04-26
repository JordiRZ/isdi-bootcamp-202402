import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Surgery, User, Products } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { Types: { ObjectId } } = mongoose

dotenv.config()

const { CredentialsError } = errors

describe('retrieveSurgeries', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds  ', () =>
        User.deleteMany()
            .then(() =>
                Products.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()







                )
            )
        )



})