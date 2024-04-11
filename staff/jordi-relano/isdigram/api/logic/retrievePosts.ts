
//PARA IGNORAR TODO EN TYPESCRIPT, HACER
// @ts-nocheck

import { ObjectId } from 'mongodb'
import { validate } from 'com'

import { errors } from 'com'

const { DuplicityError, SystemError, CredentialsError, NotFoundError } = errors




function retrievePosts(userId, callback) {
    validateText(userId, "userId", true);
    validateCallback(callback);

    db.users.findOne(
        (user) => user.id === userId,
        (error, user) => {
            if (error) {
                callback(error);

                return;
            }

            if (!user) {
                callback(new NotFoundError("user not found"));

                return;
            }

            db.posts.getAll((error, posts) => {
                if (error) {
                    callback(error);

                    return;
                }

                let count = 0;
                let errorDetected = false

                posts.forEach((post) => {
                    db.users.findOne(
                        (user) => user.id === post.author,
                        (error, user) => {

                            if (error) {
                                callback(error);

                                return;
                            }

                            if (!user) {
                                callback(new NotFoundError('post owner not found'))

                                errorDetected = true

                                return
                            }


                            post.author = {
                                id: user.id,
                                username: user.username,
                            };

                            count++;

                            if (!errorDetected && count === posts.length) callback(null, posts.reverse());
                        }
                    );
                });
            });
        }
    );
}

export default retrievePosts