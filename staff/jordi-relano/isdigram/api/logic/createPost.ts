//PARA IGNORAR TODO EN TYPESCRIPT, HACER
// @ts-nocheck

import { ObjectId } from 'mongodb'
import { validate } from 'com'

import { errors } from 'com'

const { DuplicityError, SystemError, CredentialsError, NotFoundError } = errors


function createPost(userId, image, text, callback) {
    validateUrl(image, "image");
    validateText(userId, "userId", true);

    if (text) validateText(text, "text");
    validateCallback(callback);


    const post = {
        author: userId,
        image: image,
        text: text,
        date: new Date().toLocaleDateString("en-CA"),
    };

    db.posts.insertOne(post, error => {
        if (error) {
            callback(error)

            return
        }

        callback(null)
    })


}

export default createPost