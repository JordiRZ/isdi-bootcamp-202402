//@ts-nocheck

import { validate, errors } from 'com';

function retrieveProducts(userId) {
    validate.token(sessionStorage.token)
    validate.text(userId, 'userId', true)

    const [, payloadB64] = sessionStorage.token.split('.')

    const payloadJSON = atob(payloadB64)

    const payload = JSON.parse(payloadJSON)

    const { sub: userId } = payload

    return fetch(`${import.meta.env.VITE_API_URL}/products${userId}`, { 
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .then(res => {
            if (res.status === 200){
                console.log('APP' > logic, res.status)
                return res.json();
            }

            return res.json()
                .then(body => {
                    const { error, message } = body;

                    const constructor = errors[error];

                    throw new constructor(message);
                });
        });
}

export default retrieveProducts;