//@ts-nocheck

import { validate, errors } from 'com'

function createSurgery(surgeryDate: Date, name: string, products: string[], type: string, hospital: string, note: string) {
    validate.text(name, 'name')
    validate.text(type, 'type')
    validate.text(hospital, 'hospital')

    // validate.text(productId, 'productId')
    if (note)
        validate.text(note, 'note')
    // validate.date(surgeryDate, 'date')

    const surgery = { surgeryDate, name, products, type, hospital, note }

    console.log('Sending surgery data to backend:', surgery)

    const json = JSON.stringify(surgery)

    return fetch(`${import.meta.env.VITE_API_URL}/surgeries`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(res => {
            if (res.status === 201) return

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default createSurgery