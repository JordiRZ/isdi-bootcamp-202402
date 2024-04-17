import { validate, errors } from 'com'

function createPost(image, text) {
    validate.url(image, 'image')
    if (text)
        validate.text(text, 'text')


    const post = { image, text }

    const json = JSON.stringify(post)

    return fetch('http://localhost:8080/posts', {
        method: 'POST', // método https de ruta de datos
        headers: {
            Authoritzation: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
            // llamas los headers que son el id del token, el tipo de contenido que es una aplicación json


        },
        body: json
    })

        .then(res => {
            if (res.status === 201) return

            return res.json()
                .then(body => {
                    // a partir del body construyes el error
                    const { error, message } = body
                    //destructuras lo que necesitas
                    const constructor = errors[error]
                    // construyes en base a los errors que hay en window

                    throw new constructor(message)
                    // lanzas
                })
        })


}

export default createPost