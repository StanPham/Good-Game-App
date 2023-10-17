
const {initializeApp} = require("firebase-admin/app");
initializeApp();


const functions = require("firebase-functions");
const {onCall} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2")
const {getAuth} = require("firebase-admin/auth")
const cors = require('cors')({ origin: true });
setGlobalOptions({maxInstances: 10})

exports.addadminrole = onCall((request) =>  {
    return new Promise((resolve, reject) => {
        if(request.auth.token.admin){
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
                resolve({
                    message: "User Not Found"
                })
            })
        } else {
            resolve({
                message: "You are not logged in as an admin."
            })
        }
    })
})