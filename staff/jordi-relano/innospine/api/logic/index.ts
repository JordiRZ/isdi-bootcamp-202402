import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'
import createSurgery from './createSurgery.ts'
import retrieveProducts from './retrieveProducts.ts'
import retrieveSurgeries from './retrieveSurgeries.ts'



const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    createSurgery,
    retrieveProducts,
    retrieveSurgeries
}

export default logic