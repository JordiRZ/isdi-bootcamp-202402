//PARA IGNORAR TODO EN TYPESCRIPT, HACER
// @ts-nocheck

import { ObjectId } from 'mongodb'
import { validate } from 'com'

import { errors } from 'com'

const { DuplicityError, SystemError, CredentialsError, NotFoundError } = errors



function modifyPost(postId, text) {
    validateText(postId, "postId", true);
    validateText(text, "text");
  
    const post = db.posts.findOne((post) => post.id === postId);
  
    if (!post) throw new NotFoundError("post not found");
  
    if (post.author !== sessionStorage.userId)
      throw new Error("post does not belong to user");
  
    post.text = text;
  
    db.posts.updateOne(post);
  }

  export default modifyPost