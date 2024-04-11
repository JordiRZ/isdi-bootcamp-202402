//PARA IGNORAR TODO EN TYPESCRIPT, HACER
// @ts-nocheck

import { validate, errors } from 'com'

const { DuplicityError, SystemError, CredentialsError, NotFoundError } = errors




function logoutUser(userId, callback) {
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
  
        user.status = "offline";
  
        db.users.updateOne(
          (user2) => user2.id === userId,
          user,
          (error) => {
            if (error) {
              callback(error);
              return;
            }
  
            callback(null, user);
          }
        );
      }
    );
  }

  export default logoutUser