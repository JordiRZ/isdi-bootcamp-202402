// // describe("logout", () => {
// //   it("does logout properly", (done) => {
// //      db.users.deleteAll((error) => {
// //       if (error) {
// //          done(error);

// //         return;
// //       }

// //     db.users.insertOne(
// //       {
// //         name: "Pakito",
// //         birthdate: "2000-01-01",
// //         email: "pakito@roni.com",
// //         username: "pakito",
// //         password: "123qwe123",
// //         status: "online",
// //       },
// //       (error, insertedUserId) => {
// //         if (error) {
// //           done(error);

// //           return;
// //         }

// //         logic.logoutUser(insertedUserId, (error, user) => {
// //           if (error) {
// //             done(error);
// //             return;
// //           }

// //           expect(user.id).to.equal(insertedUserId);
// //           expect(user.status).to.equal("offline");

// //           done();
// //         });
// //       }
// //     );
// //   });
// // });
// // });