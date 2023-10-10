/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const {initializeApp} = require("firebase-admin/app");
initializeApp();


const functions = require("firebase-functions");
const {onCall} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2")
const {getAuth} = require("firebase-admin/auth")
const cors = require('cors')({ origin: true });
setGlobalOptions({maxInstances: 10})
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// exports.addAdminRole = functions.auth.user().onCall((data, context) =>{
//     return admin.auth().getUserByEmail(data.email).then(user => {
//         return admin.auth().setCustomUserClaims(user.uid, {
//           admin: true
//         })
//       }).then(() => {
//         return {
//           message: `Success! ${data.email} has been made an admin.`
//         }
//       }).catch(err => {
//         return err;
//       });
// })

exports.addAdminRole = onCall((request) =>  {
    return new Promise((resolve, reject) => {
        getAuth().getUserByEmail(request.data.userEmail).then(user => {
            getAuth().setCustomUserClaims(user.uid, {
                admin: true
            }).then(() => {
                resolve({
                    message: `Sucessfully made ${request.data.userEmail} an admin`
                })
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err)
        })
    })
})