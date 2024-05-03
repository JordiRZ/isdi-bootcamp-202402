//@ts-nocheck

import { validate, errors } from 'com'

function updateSurgery(surgeryId: string, surgeryDate: Date, name: string, products: string[], type: string, hospital: string, note: string) {
    validate.token(sessionStorage.token)

    const surgery = { surgeryDate, name, products, type, hospital, note }

    const json = JSON.stringify(surgery)

    return fetch(`${import.meta.env.VITE_API_URL}/surgeries/${surgeryId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
            ,
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default updateSurgery