//PARA IGNORAR TODO EN TYPESCRIPT, HACER
// @ts-nocheck

import { ObjectId } from 'mongodb'
import { validate } from 'com'

import { errors } from 'com'

const { DuplicityError, SystemError, CredentialsError, NotFoundError } = errors




function removePost(postId) {
    validateText(postId, "postId", true);
  
    const post = db.posts.findOne((post) => post.id === postId);
  
    if (!post) throw new NotFoundError("post not found");
  
    if (post.author !== sessionStorage.userId)
      throw new Error("post does not belong to user");
  
    db.posts.deleteOne((post) => post.id === postId);
  }

  export default removePost