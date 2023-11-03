
const {initializeApp} = require("firebase-admin/app");
initializeApp();

const {getFirestore} = require("firebase-admin/firestore");
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

exports.addreservation = onCall((request) => {
    return new Promise(async (resolve,reject) => {
        console.log("productID:")
        console.log(request.data.productID)
        console.log("Quantity:")
        console.log(request.data.quantity)
        //check that quantity is 3 or less
        if(request.data.quantity >= 3){
            console.log("quantity error")
            resolve({
                state: "error",
                message: "large-quantity"
            })
        }
        //check product exists
        let shopItemRef = getFirestore().collection('shop').doc(request.data.productID).get().then((doc) => {
            if(!doc.exists) {
                console.log("product not found error")
                resolve({
                    state: "error",
                    message: "product-not-found"
                })
                return;
            }
        })
        //check if document exists in shopReservation collection
    
        let db = getFirestore()
        let collectionRef = db.collection('shopReservation')
        await collectionRef.doc('fcyNIjX9zN9Ltpx9J0Vn').get().then((doc) => {
            if (doc.exists) {
                //check that more than 2 reservations dont exist
                if(doc.data().reservations.length >= 2) {
                    console.log("too many reservations error")
                    resolve({
                        state:"error",
                        message: "too-many-reservations"
                    })
                    return;
                }
                console.log("Document data:", doc.data());

            } else {
                console.log("No such document!");

                //create new document


            }
        })
        resolve({
            message: "man did that work"
        })
        //check that document doesn't have more than two entries
    })
})