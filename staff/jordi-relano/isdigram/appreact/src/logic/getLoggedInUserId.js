function getLoggedInUserId() {
    const [, payloadB64] = sessionStorage.token.split('.')

    // aquí pones , para indicar que se pete el primer elemento devuelto del destructuring, en base a un split por . separando los strings

    const payloadJSON = atob(payloadB64)

    //esto lo descodifica

    const payload = JSON.parse(payloadJSON)

    //lo parseas

    const { sub: userId } = payload

    //le sacas el id jugoso que es el sub del token

    return userId

    //aquí extraemos el apartado payload que es el contenido donde se ubica el user id del token(el sub para ser exactos), lo parseamos y lo retornamos para usarlo



}

export default getLoggedInUserId