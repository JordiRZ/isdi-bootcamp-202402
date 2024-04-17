import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type UserType = {
    name: string
    birthdate: Date
    email: string
    username: string
    password: string
    // ponemos esta validación para que pueda entrar la conexión a servidor a través de mongoose, lo exige así
}

const user = new Schema({
    name: {
        type: String,
        required: true
        // aquí compruebas el tipo somo segiunda capa de comprobación en BBDD, además especificas si es necesario o no con required ( si lo pones lo es)
    },
    birthdate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        // unique le da un indice para que no se duplique el valor, así que, no habrán dos emails iguales porque tendrán un indice diferente _id, le asignaría un 1 al primero y así sucesivamente
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

type PostType = {
    author: ObjectId
    image: string
    text: string
    date: Date
}

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true

    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String

    },
    date: {
        type: Date,
        required: true
    }
})

const User = model<UserType>('User', user)
// aquí construyes la compilación de usuarios typescripeados
const Post = model<PostType>('Post', post)

// debemos especificar en el model los dos typescripts realizados más arriba y exportarlos 
export {
    UserType,
    User,
    PostType,
    Post
}

// Tenemos el schema que define la estructura del documento, con sus validadores, valores predetermindos, etc...
// Y como segundo el model que crea como la interfaz para poder acceder a esos datos y hacer lo que necesites con ellos
